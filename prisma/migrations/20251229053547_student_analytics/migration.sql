-- CreateTable
CREATE TABLE "StudentAnalytics" (
    "id" SERIAL NOT NULL,
    "studentUserId" INTEGER NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "attendanceRate" DOUBLE PRECISION NOT NULL,
    "avgScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "insights" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentAnalytics_studentUserId_idx" ON "StudentAnalytics"("studentUserId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAnalytics_studentUserId_fromDate_toDate_key" ON "StudentAnalytics"("studentUserId", "fromDate", "toDate");

-- AddForeignKey
ALTER TABLE "StudentAnalytics" ADD CONSTRAINT "StudentAnalytics_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "StudentProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
