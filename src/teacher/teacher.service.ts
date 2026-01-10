import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttendanceStatus } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        teacherProfile: {
          select: {
            fullName: true,
            phone: true,
            department: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.teacherProfile)
      throw new NotFoundException('Teacher profile not found');

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.teacherProfile,
    };
  }
  async myAssignments(userId: number) {
    return this.prisma.teachingAssignment.findMany({
      where: { teacherUserId: userId },
      include: { subject: true, group: true },
      orderBy: { id: 'asc' },
    });
  }
  private async ensureScheduleBelongsToTeacher(
    scheduleId: number,
    teacherUserId: number,
  ) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { assignment: true },
    });
    if (!schedule) throw new NotFoundException('Schedule not found');
    if (schedule.assignment.teacherUserId !== teacherUserId) {
      throw new ForbiddenException('This schedule does not belong to you');
    }
    return schedule;
  }

  async markAttendance(
    teacherUserId: number,
    dto: {
      scheduleId: number;
      studentUserId: number;
      date: string;
      status: AttendanceStatus;
      note?: string;
    },
  ) {
    const schedule = await this.ensureScheduleBelongsToTeacher(
      dto.scheduleId,
      teacherUserId,
    );

    // student shu schedule'ning groupida ekanini tekshiramiz
    const student = await this.prisma.studentProfile.findUnique({
      where: { userId: dto.studentUserId },
    });
    if (!student) throw new NotFoundException('Student profile not found');
    if (!student.groupId || student.groupId !== schedule.assignment.groupId) {
      throw new ForbiddenException('Student is not in this group');
    }

    const dateObj = new Date(dto.date);

    return this.prisma.attendance.upsert({
      where: {
        scheduleId_date_studentUserId: {
          scheduleId: dto.scheduleId,
          date: dateObj,
          studentUserId: dto.studentUserId,
        },
      },
      update: { status: dto.status, note: dto.note },
      create: {
        scheduleId: dto.scheduleId,
        studentUserId: dto.studentUserId,
        date: dateObj,
        status: dto.status,
        note: dto.note,
      },
    });
  }

  async attendanceList(
    teacherUserId: number,
    scheduleId: number,
    date?: string,
  ) {
    await this.ensureScheduleBelongsToTeacher(scheduleId, teacherUserId);

    return this.prisma.attendance.findMany({
      where: {
        scheduleId,
        date: date ? new Date(date) : undefined,
      },
      include: { student: { include: { user: true } } },
      orderBy: [{ date: 'asc' }, { studentUserId: 'asc' }],
    });
  }

  async createGrade(
    teacherUserId: number,
    dto: {
      assignmentId: number;
      studentUserId: number;
      kind: string;
      score: number;
      maxScore?: number;
      note?: string;
    },
  ) {
    const assignment = await this.prisma.teachingAssignment.findUnique({
      where: { id: dto.assignmentId },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    if (assignment.teacherUserId !== teacherUserId) {
      throw new ForbiddenException('This assignment does not belong to you');
    }

    const student = await this.prisma.studentProfile.findUnique({
      where: { userId: dto.studentUserId },
    });
    if (!student) throw new NotFoundException('Student profile not found');
    if (!student.groupId || student.groupId !== assignment.groupId) {
      throw new ForbiddenException('Student is not in this group');
    }

    return this.prisma.grade.create({
      data: {
        assignmentId: dto.assignmentId,
        studentUserId: dto.studentUserId,
        kind: dto.kind,
        score: dto.score,
        maxScore: dto.maxScore ?? 100,
        note: dto.note,
      },
    });
  }

  async gradeList(
    teacherUserId: number,
    assignmentId: number,
    studentUserId?: number,
  ) {
    const assignment = await this.prisma.teachingAssignment.findUnique({
      where: { id: assignmentId },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    if (assignment.teacherUserId !== teacherUserId) {
      throw new ForbiddenException('This assignment does not belong to you');
    }

    return this.prisma.grade.findMany({
      where: {
        assignmentId,
        studentUserId: studentUserId ?? undefined,
      },
      include: { student: { include: { user: true } } },
      orderBy: [{ createdAt: 'asc' }],
    });
  }
}
