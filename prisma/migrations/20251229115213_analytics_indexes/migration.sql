-- CreateIndex
CREATE INDEX "StudentAnalytics_studentUserId_toDate_idx" ON "StudentAnalytics"("studentUserId", "toDate");

-- CreateIndex
CREATE INDEX "StudentAnalytics_studentUserId_createdAt_idx" ON "StudentAnalytics"("studentUserId", "createdAt");
