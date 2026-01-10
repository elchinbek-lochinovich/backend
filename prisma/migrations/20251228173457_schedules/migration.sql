-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "room" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schedule_assignmentId_idx" ON "Schedule"("assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_assignmentId_dayOfWeek_startTime_key" ON "Schedule"("assignmentId", "dayOfWeek", "startTime");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "TeachingAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
