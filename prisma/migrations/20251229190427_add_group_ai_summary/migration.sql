-- CreateTable
CREATE TABLE "GroupAiSummary" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupAiSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GroupAiSummary_groupId_toDate_idx" ON "GroupAiSummary"("groupId", "toDate");

-- CreateIndex
CREATE UNIQUE INDEX "GroupAiSummary_groupId_fromDate_toDate_key" ON "GroupAiSummary"("groupId", "fromDate", "toDate");
