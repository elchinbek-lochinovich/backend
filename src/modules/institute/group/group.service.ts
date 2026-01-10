import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGroupDto) {
    const dep = await this.prisma.department.findUnique({
      where: { id: dto.departmentId },
    });
    if (!dep) throw new NotFoundException('Department not found');

    const exists = await this.prisma.group.findFirst({
      where: { departmentId: dto.departmentId, name: dto.name },
    });
    if (exists)
      throw new ConflictException('Group already exists in this department');

    return this.prisma.group.create({
      data: {
        departmentId: dto.departmentId,
        name: dto.name,
        course: dto.course,
        year: dto.year,
      },
    });
  }

  async findAll(departmentId?: number) {
    return this.prisma.group.findMany({
      where: departmentId ? { departmentId } : undefined,
      include: { department: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const g = await this.prisma.group.findUnique({
      where: { id },
      include: { department: true },
    });
    if (!g) throw new NotFoundException('Group not found');
    return g;
  }

  async update(id: number, dto: UpdateGroupDto) {
    const current = await this.prisma.group.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Group not found');

    if (dto.departmentId && dto.departmentId !== current.departmentId) {
      const dep = await this.prisma.department.findUnique({
        where: { id: dto.departmentId },
      });
      if (!dep) throw new NotFoundException('Department not found');
    }

    // unique check (departmentId+name)
    const nextDepartmentId = dto.departmentId ?? current.departmentId;
    const nextName = dto.name ?? current.name;
    const exists = await this.prisma.group.findFirst({
      where: { departmentId: nextDepartmentId, name: nextName, NOT: { id } },
    });
    if (exists)
      throw new ConflictException('Group already exists in this department');

    return this.prisma.group.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const current = await this.prisma.group.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Group not found');

    await this.prisma.group.delete({ where: { id } });
    return { ok: true };
  }
}
