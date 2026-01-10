import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAssignmentDto) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: dto.subjectId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!group) throw new NotFoundException('Group not found');

    const teacher = await this.prisma.teacherProfile.findUnique({
      where: { userId: dto.teacherUserId },
    });
    if (!teacher) throw new NotFoundException('Teacher profile not found');

    const exists = await this.prisma.teachingAssignment.findFirst({
      where: {
        subjectId: dto.subjectId,
        groupId: dto.groupId,
        teacherUserId: dto.teacherUserId,
      },
    });
    if (exists) throw new ConflictException('Assignment already exists');

    return this.prisma.teachingAssignment.create({
      data: dto,
    });
  }

  async list(filter?: {
    groupId?: number;
    teacherUserId?: number;
    subjectId?: number;
  }) {
    return this.prisma.teachingAssignment.findMany({
      where: {
        groupId: filter?.groupId,
        teacherUserId: filter?.teacherUserId,
        subjectId: filter?.subjectId,
      },
      include: {
        subject: true,
        group: true,
        teacher: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async remove(id: number) {
    const a = await this.prisma.teachingAssignment.findUnique({
      where: { id },
    });
    if (!a) throw new NotFoundException('Assignment not found');

    await this.prisma.teachingAssignment.delete({ where: { id } });
    return { ok: true };
  }
}
