require('dotenv').config();

const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in .env');
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding started...');

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // =====================
  // RECTOR
  // =====================
  await prisma.user.upsert({
    where: { email: 'rector1@test.com' },
    update: {},
    create: {
      email: 'rector1@test.com',
      password: passwordHash,
      role: Role.RECTOR,
    },
  });

  // =====================
  // TEACHER
  // =====================
  await prisma.user.upsert({
    where: { email: 'teacher1@test.com' },
    update: {},
    create: {
      email: 'teacher1@test.com',
      password: passwordHash,
      role: Role.TEACHER,
      teacherProfile: {
        create: {
          fullName: 'Test Teacher',
          phone: '900000000',
        },
      },
    },
  });

  // =====================
  // STUDENT
  // =====================
  await prisma.user.upsert({
    where: { email: 'student1@test.com' },
    update: {},
    create: {
      email: 'student1@test.com',
      password: passwordHash,
      role: Role.STUDENT,
      studentProfile: {
        create: {
          fullName: 'Test Student',
        },
      },
    },
  });

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
