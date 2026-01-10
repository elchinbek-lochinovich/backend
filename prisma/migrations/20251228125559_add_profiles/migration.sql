-- CreateTable
CREATE TABLE "TeacherProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "course" INTEGER,
    "group" TEXT,
    "contractSum" INTEGER,
    "debt" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherProfile_userId_key" ON "TeacherProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- AddForeignKey
ALTER TABLE "TeacherProfile" ADD CONSTRAINT "TeacherProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
