import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateScheduleDto) {
    const a = await this.prisma.teachingAssignment.findUnique({
      where: { id: dto.assignmentId },
    });
    if (!a) throw new NotFoundException('Assignment not found');

    const exists = await this.prisma.schedule.findFirst({
      where: {
        assignmentId: dto.assignmentId,
        dayOfWeek: dto.dayOfWeek,
        startTime: dto.startTime,
      },
    });
    if (exists) throw new ConflictException('Schedule already exists');

    return this.prisma.schedule.create({ data: dto });
  }

  async list(filter?: {
    groupId?: number;
    teacherUserId?: number;
    dayOfWeek?: number;
  }) {
    return this.prisma.schedule.findMany({
      where: {
        dayOfWeek: filter?.dayOfWeek,
        assignment: {
          is: {
            groupId: filter?.groupId,
            teacherUserId: filter?.teacherUserId,
          },
        },
      },
      include: {
        assignment: { include: { subject: true, group: true, teacher: true } },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async remove(id: number) {
    const s = await this.prisma.schedule.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Schedule not found');

    await this.prisma.schedule.delete({ where: { id } });
    return { ok: true };
  }
}
