import 'dotenv/config';
import { PrismaClient, Role, AttendanceStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


async function main() {
  console.log('🌱 Seeding started...');

  // =====================
  // USERS
  // =====================
  const passwordHash = await bcrypt.hash('Password123!', 10);

  await prisma.user.upsert({
    where: { email: 'rector1@test.com' },
    update: {},
    create: {
      email: 'rector1@test.com',
      password: passwordHash,
      role: Role.RECTOR,
    },
  });

  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher2@test.com' },
    update: {},
    create: {
      email: 'teacher2@test.com',
      password: passwordHash,
      role: Role.TEACHER,
      teacherProfile: {
        create: {
          fullName: 'Elchinbek Lochinovich',
        },
      },
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'student3@test.com' },
    update: {},
    create: {
      email: 'student3@test.com',
      password: passwordHash,
      role: Role.STUDENT,
      studentProfile: {
        create: {
          fullName: 'Student Test',
        },
      },
    },
  });

  // =====================
  // STRUCTURE
  // =====================
  const faculty = await prisma.faculty.upsert({
    where: { name: 'Engineering' },
    update: {},
    create: { name: 'Engineering' },
  });

  const department = await prisma.department.upsert({
    where: {
      facultyId_name: {
        facultyId: faculty.id,
        name: 'Computer Science',
      },
    },
    update: {},
    create: {
      name: 'Computer Science',
      facultyId: faculty.id,
    },
  });

  const group = await prisma.group.upsert({
    where: {
      departmentId_name: {
        departmentId: department.id,
        name: 'CS-101',
      },
    },
    update: {},
    create: {
      name: 'CS-101',
      departmentId: department.id,
      course: 1,
      year: 2025,
    },
  });

  // link profiles
  await prisma.teacherProfile.update({
    where: { userId: teacherUser.id },
    data: { departmentId: department.id },
  });

  await prisma.studentProfile.update({
    where: { userId: studentUser.id },
    data: { groupId: group.id },
  });

  // =====================
  // SUBJECT + ASSIGNMENT
  // =====================
  const subject = await prisma.subject.upsert({
    where: { name: 'Algorithms' },
    update: {},
    create: { name: 'Algorithms' },
  });

  const assignment = await prisma.teachingAssignment.upsert({
    where: {
      subjectId_groupId_teacherUserId: {
        subjectId: subject.id,
        groupId: group.id,
        teacherUserId: teacherUser.id,
      },
    },
    update: {},
    create: {
      subjectId: subject.id,
      groupId: group.id,
      teacherUserId: teacherUser.id,
      academicYear: 2025,
      semester: 1,
    },
  });

  // =====================
  // SCHEDULE
  // =====================
  const schedule = await prisma.schedule.upsert({
    where: {
      assignmentId_dayOfWeek_startTime: {
        assignmentId: assignment.id,
        dayOfWeek: 5,
        startTime: '09:00',
      },
    },
    update: {},
    create: {
      assignmentId: assignment.id,
      dayOfWeek: 5,
      startTime: '09:00',
      endTime: '10:20',
      room: 'A-101',
    },
  });

  // =====================
  // ATTENDANCE  ✅ (fix unique key name)
  // =====================
  const attendanceDate = new Date('2026-01-02T00:00:00.000Z');

  await prisma.attendance.upsert({
    where: {
      // Prisma xabari: scheduleId_date_studentUserId
      scheduleId_date_studentUserId: {
        scheduleId: schedule.id,
        date: attendanceDate,
        studentUserId: studentUser.id,
      },
    },
    update: {
      status: AttendanceStatus.PRESENT,
      note: 'Seed attendance',
    },
    create: {
      scheduleId: schedule.id,
      studentUserId: studentUser.id,
      date: attendanceDate,
      status: AttendanceStatus.PRESENT,
      note: 'Seed attendance',
    },
  });

  // =====================
  // GRADE ✅ (no compound unique in schema -> findFirst + update/create)
  // =====================
  const existingGrade = await prisma.grade.findFirst({
    where: {
      assignmentId: assignment.id,
      studentUserId: studentUser.id,
      kind: 'EXAM',
    },
    select: { id: true },
  });

  if (existingGrade) {
    await prisma.grade.update({
      where: { id: existingGrade.id },
      data: {
        score: 85,
        maxScore: 100,
        note: 'Seed grade',
      },
    });
  } else {
    await prisma.grade.create({
      data: {
        assignmentId: assignment.id,
        studentUserId: studentUser.id,
        kind: 'EXAM',
        score: 85,
        maxScore: 100,
        note: 'Seed grade',
      },
    });
  }

  console.log('✅ Seeding finished successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

