-- CreateTable
CREATE TABLE "AisensyReminderQueue" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "retries" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AisensyReminderQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AisensyReminderQueue_status_sendAt_idx" ON "AisensyReminderQueue"("status", "sendAt");
