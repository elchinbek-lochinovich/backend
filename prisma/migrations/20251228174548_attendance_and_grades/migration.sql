-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attendance_studentUserId_idx" ON "Attendance"("studentUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_scheduleId_date_studentUserId_key" ON "Attendance"("scheduleId", "date", "studentUserId");

-- CreateIndex
CREATE INDEX "Grade_assignmentId_idx" ON "Grade"("assignmentId");

-- CreateIndex
CREATE INDEX "Grade_studentUserId_idx" ON "Grade"("studentUserId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "StudentProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "TeachingAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "StudentProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
