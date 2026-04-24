/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `MasterclassLead` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MasterclassLead_phone_key" ON "MasterclassLead"("phone");
