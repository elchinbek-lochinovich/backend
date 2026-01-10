import { PrismaService } from 'src/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFacultyDto) {
    const exists = await this.prisma.faculty.findUnique({
      where: { name: dto.name },
    });
    if (exists) throw new ConflictException('Faculty name already exists');

    return this.prisma.faculty.create({ data: dto });
  }

  async findAll(q?: string) {
    return this.prisma.faculty.findMany({
      where: q ? { name: { contains: q, mode: 'insensitive' } } : undefined,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const faculty = await this.prisma.faculty.findUnique({ where: { id } });
    if (!faculty) throw new NotFoundException('Faculty not found');
    return faculty;
  }

  async update(id: number, dto: UpdateFacultyDto) {
    await this.findOne(id);

    if (dto.name) {
      const exists = await this.prisma.faculty.findUnique({
        where: { name: dto.name },
      });
      if (exists && exists.id !== id)
        throw new ConflictException('Faculty name already exists');
    }

    return this.prisma.faculty.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.faculty.delete({ where: { id } });
    return { ok: true };
  }
}
