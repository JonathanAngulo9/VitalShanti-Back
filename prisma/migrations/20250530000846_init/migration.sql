-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorPatient" (
    "id" SERIAL NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "InstructorPatient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Therapy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Therapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posture" (
    "id" SERIAL NOT NULL,
    "nameEs" TEXT NOT NULL,
    "nameSans" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "modifications" TEXT NOT NULL,
    "warnings" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,

    CONSTRAINT "Posture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapyPosture" (
    "therapyId" INTEGER NOT NULL,
    "postureId" INTEGER NOT NULL,

    CONSTRAINT "TherapyPosture_pkey" PRIMARY KEY ("therapyId","postureId")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "therapyId" INTEGER NOT NULL,
    "recommendedSessions" INTEGER NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesPosture" (
    "seriesId" INTEGER NOT NULL,
    "postureId" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SeriesPosture_pkey" PRIMARY KEY ("seriesId","postureId")
);

-- CreateTable
CREATE TABLE "PatientSeries" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL,
    "sessionsCompleted" INTEGER NOT NULL,

    CONSTRAINT "PatientSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PainLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PainLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "patientSeriesId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "painBeforeId" INTEGER NOT NULL,
    "painAfterId" INTEGER NOT NULL,
    "pauses" INTEGER NOT NULL,
    "effectiveMinutes" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identification_key" ON "User"("identification");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "InstructorPatient" ADD CONSTRAINT "InstructorPatient_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorPatient" ADD CONSTRAINT "InstructorPatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapyPosture" ADD CONSTRAINT "TherapyPosture_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "Therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapyPosture" ADD CONSTRAINT "TherapyPosture_postureId_fkey" FOREIGN KEY ("postureId") REFERENCES "Posture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "Therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesPosture" ADD CONSTRAINT "SeriesPosture_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesPosture" ADD CONSTRAINT "SeriesPosture_postureId_fkey" FOREIGN KEY ("postureId") REFERENCES "Posture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientSeries" ADD CONSTRAINT "PatientSeries_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientSeries" ADD CONSTRAINT "PatientSeries_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_patientSeriesId_fkey" FOREIGN KEY ("patientSeriesId") REFERENCES "PatientSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_painBeforeId_fkey" FOREIGN KEY ("painBeforeId") REFERENCES "PainLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_painAfterId_fkey" FOREIGN KEY ("painAfterId") REFERENCES "PainLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
