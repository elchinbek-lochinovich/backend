/*
  Warnings:

  - You are about to drop the column `group` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "group",
ADD COLUMN     "groupId" INTEGER;

-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "departmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
