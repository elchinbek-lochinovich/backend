import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubjectDto) {
    const exists = await this.prisma.subject.findUnique({
      where: { name: dto.name },
    });
    if (exists) throw new ConflictException('Subject already exists');

    return this.prisma.subject.create({ data: dto });
  }

  async findAll(q?: string) {
    return this.prisma.subject.findMany({
      where: q ? { name: { contains: q, mode: 'insensitive' } } : undefined,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const s = await this.prisma.subject.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Subject not found');
    return s;
  }

  async update(id: number, dto: UpdateSubjectDto) {
    const current = await this.findOne(id);

    if (dto.name && dto.name !== current.name) {
      const exists = await this.prisma.subject.findUnique({
        where: { name: dto.name },
      });
      if (exists) throw new ConflictException('Subject already exists');
    }

    return this.prisma.subject.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.subject.delete({ where: { id } });
    return { ok: true };
  }
}
