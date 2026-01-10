import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    const faculty = await this.prisma.faculty.findUnique({
      where: { id: dto.facultyId },
    });
    if (!faculty) throw new NotFoundException('Faculty not found');

    const exists = await this.prisma.department.findFirst({
      where: { facultyId: dto.facultyId, name: dto.name },
    });
    if (exists)
      throw new ConflictException('Department already exists in this faculty');

    return this.prisma.department.create({
      data: {
        facultyId: dto.facultyId,
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async findAll(facultyId?: number) {
    return this.prisma.department.findMany({
      where: facultyId ? { facultyId } : undefined,
      include: { faculty: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const dep = await this.prisma.department.findUnique({
      where: { id },
      include: { faculty: true },
    });
    if (!dep) throw new NotFoundException('Department not found');
    return dep;
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    const current = await this.prisma.department.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Department not found');

    if (dto.facultyId && dto.facultyId !== current.facultyId) {
      const faculty = await this.prisma.faculty.findUnique({
        where: { id: dto.facultyId },
      });
      if (!faculty) throw new NotFoundException('Faculty not found');
    }

    // unique check (facultyId+name)
    const nextFacultyId = dto.facultyId ?? current.facultyId;
    const nextName = dto.name ?? current.name;
    const exists = await this.prisma.department.findFirst({
      where: { facultyId: nextFacultyId, name: nextName, NOT: { id } },
    });
    if (exists)
      throw new ConflictException('Department already exists in this faculty');

    return this.prisma.department.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const current = await this.prisma.department.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Department not found');

    await this.prisma.department.delete({ where: { id } });
    return { ok: true };
  }
}
