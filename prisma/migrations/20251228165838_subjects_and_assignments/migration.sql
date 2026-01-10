-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingAssignment" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "teacherUserId" INTEGER NOT NULL,
    "academicYear" INTEGER,
    "semester" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeachingAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingAssignment_subjectId_groupId_teacherUserId_key" ON "TeachingAssignment"("subjectId", "groupId", "teacherUserId");

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_teacherUserId_fkey" FOREIGN KEY ("teacherUserId") REFERENCES "TeacherProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
