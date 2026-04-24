-- AlterTable
ALTER TABLE "SdUser" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "SdEmailOtp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SdEmailOtp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SdEmailOtp_email_idx" ON "SdEmailOtp"("email");

-- CreateIndex
CREATE INDEX "SdEmailOtp_expiresAt_idx" ON "SdEmailOtp"("expiresAt");
