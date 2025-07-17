/*
  Warnings:

  - A unique constraint covering the columns `[patientId,seriesId]` on the table `PatientSeries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PatientSeries_patientId_seriesId_key" ON "PatientSeries"("patientId", "seriesId");
