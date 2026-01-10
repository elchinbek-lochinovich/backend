import { NotFoundException } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async listUsers() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
      orderBy: { id: 'asc' },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    role: Role;

    // umumiy (teacher/student ikkalasiga ham kerak)
    fullName: string;
    phone?: string;

    // teacher uchun
    department?: string;

    // student uchun
    course?: number;
    group?: string;
  }) {
    const { email, password, role } = data;

    if (!email || !password || !role) {
      throw new BadRequestException('email, password, role are required');
    }
    if (!data.fullName) {
      throw new BadRequestException('fullName is required');
    }

    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new BadRequestException('Email already exists');

    // Rektor faqat TEACHER yoki STUDENT yarata olsin
    if (role !== Role.TEACHER && role !== Role.STUDENT) {
      throw new BadRequestException('Role must be TEACHER or STUDENT');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: passwordHash,
          role,
        },
      });

      if (role === Role.TEACHER) {
        await tx.teacherProfile.create({
          data: {
            userId: user.id,
            fullName: data.fullName,
            phone: data.phone,
          },
        });
      }

      if (role === Role.STUDENT) {
        await tx.studentProfile.create({
          data: {
            userId: user.id,
            fullName: data.fullName,
            phone: data.phone,
            course: data.course,
          },
        });
      }

      // parolni qaytarmaymiz
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
    });
  }

  // Eski TEACHER/STUDENT userlar uchun profil bo'lmasa yaratib chiqadi
  async backfillProfiles() {
    const users = await this.prisma.user.findMany({
      where: { role: { in: [Role.TEACHER, Role.STUDENT] } },
      select: { id: true, email: true, role: true },
      orderBy: { id: 'asc' },
    });

    const created: Array<{ userId: number; role: Role }> = [];
    const skipped: Array<{ userId: number; role: Role }> = [];

    for (const u of users) {
      if (u.role === Role.TEACHER) {
        const exists = await this.prisma.teacherProfile.findUnique({
          where: { userId: u.id },
        });

        if (exists) {
          skipped.push({ userId: u.id, role: u.role });
          continue;
        }

        await this.prisma.teacherProfile.create({
          data: {
            userId: u.id,
            fullName: u.email.split('@')[0], // vaqtincha
          },
        });

        created.push({ userId: u.id, role: u.role });
      }

      if (u.role === Role.STUDENT) {
        const exists = await this.prisma.studentProfile.findUnique({
          where: { userId: u.id },
        });

        if (exists) {
          skipped.push({ userId: u.id, role: u.role });
          continue;
        }

        await this.prisma.studentProfile.create({
          data: {
            userId: u.id,
            fullName: u.email.split('@')[0], // vaqtincha
          },
        });

        created.push({ userId: u.id, role: u.role });
      }
    }

    return { created, skipped };
  }
  async assignStudentToGroup(userId: number, groupId?: number) {
    const student = await this.prisma.studentProfile.findUnique({
      where: { userId },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    if (groupId !== undefined && groupId !== null) {
      const group = await this.prisma.group.findUnique({
        where: { id: groupId },
      });
      if (!group) throw new NotFoundException('Group not found');
    }

    return this.prisma.studentProfile.update({
      where: { userId },
      data: { groupId: groupId ?? null },
    });
  }

  async assignTeacherToDepartment(userId: number, departmentId?: number) {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: { userId },
    });
    if (!teacher) throw new NotFoundException('Teacher profile not found');

    if (departmentId !== undefined && departmentId !== null) {
      const dep = await this.prisma.department.findUnique({
        where: { id: departmentId },
      });
      if (!dep) throw new NotFoundException('Department not found');
    }

    return this.prisma.teacherProfile.update({
      where: { userId },
      data: { departmentId: departmentId ?? null },
    });
  }
}

