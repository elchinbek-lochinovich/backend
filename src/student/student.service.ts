import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        studentProfile: {
          select: {
            fullName: true,
            phone: true,
            course: true,
            group: true,
            contractSum: true,
            debt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.studentProfile)
      throw new NotFoundException('Student profile not found');

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.studentProfile,
    };
  }
  async myAssignments(userId: number) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
    });
    if (!profile?.groupId) return [];

    return this.prisma.teachingAssignment.findMany({
      where: { groupId: profile.groupId },
      include: { subject: true, teacher: true },
      orderBy: { id: 'asc' },
    });
  }
  async myAttendance(userId: number, from?: string, to?: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    return this.prisma.attendance.findMany({
      where: {
        studentUserId: userId,
        date: {
          gte: fromDate,
          lte: toDate,
        },
      },
      include: {
        schedule: { include: { assignment: { include: { subject: true } } } },
      },
      orderBy: [{ date: 'desc' }],
    });
  }

  async myGrades(userId: number, assignmentId?: number) {
    return this.prisma.grade.findMany({
      where: {
        studentUserId: userId,
        assignmentId: assignmentId ?? undefined,
      },
      include: { assignment: { include: { subject: true } } },
      orderBy: [{ createdAt: 'desc' }],
    });
  }
}
