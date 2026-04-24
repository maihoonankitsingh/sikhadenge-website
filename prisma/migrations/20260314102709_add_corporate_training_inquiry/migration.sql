-- CreateTable
CREATE TABLE "corporate_training_inquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "workEmail" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "companyName" TEXT,
    "teamSize" TEXT,
    "preferredTrainingMode" TEXT,
    "trainingRequirement" TEXT,
    "source" TEXT NOT NULL DEFAULT 'corporate-training',
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corporate_training_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "corporate_training_inquiries_createdAt_idx" ON "corporate_training_inquiries"("createdAt");

-- CreateIndex
CREATE INDEX "corporate_training_inquiries_phoneNumber_idx" ON "corporate_training_inquiries"("phoneNumber");

-- CreateIndex
CREATE INDEX "corporate_training_inquiries_workEmail_idx" ON "corporate_training_inquiries"("workEmail");

-- CreateIndex
CREATE INDEX "corporate_training_inquiries_status_idx" ON "corporate_training_inquiries"("status");
