-- CreateEnum
CREATE TYPE "AffiliateStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AffiliateCommissionStatus" AS ENUM ('PENDING', 'APPROVED', 'PAID', 'REVERSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AffiliatePayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AffiliateCommissionType" AS ENUM ('FIXED', 'PERCENT');

-- CreateTable
CREATE TABLE "affiliate_partners" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "city" VARCHAR(120),
    "sourceType" VARCHAR(120),
    "audienceType" VARCHAR(120),
    "instagramUrl" VARCHAR(500),
    "youtubeUrl" VARCHAR(500),
    "telegramUrl" VARCHAR(500),
    "websiteUrl" VARCHAR(500),
    "experience" VARCHAR(500),
    "promotionPlan" TEXT,
    "notes" TEXT,
    "status" "AffiliateStatus" NOT NULL DEFAULT 'PENDING',
    "affiliateCode" VARCHAR(60),
    "referralLink" VARCHAR(500),
    "payoutName" VARCHAR(180),
    "payoutMethod" VARCHAR(60),
    "payoutUpiId" VARCHAR(180),
    "payoutBankName" VARCHAR(180),
    "payoutAccountNo" VARCHAR(60),
    "payoutIfsc" VARCHAR(30),
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "blockedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_clicks" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "affiliateCode" VARCHAR(60),
    "landingPage" VARCHAR(500),
    "referrerUrl" VARCHAR(1000),
    "ipAddress" VARCHAR(120),
    "userAgent" VARCHAR(2000),
    "utmSource" VARCHAR(120),
    "utmMedium" VARCHAR(120),
    "utmCampaign" VARCHAR(180),
    "utmTerm" VARCHAR(180),
    "utmContent" VARCHAR(180),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "affiliate_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_commissions" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "leadId" VARCHAR(100),
    "paymentId" VARCHAR(100),
    "admissionId" VARCHAR(100),
    "commissionType" "AffiliateCommissionType" NOT NULL DEFAULT 'FIXED',
    "commissionRate" DOUBLE PRECISION,
    "baseAmount" DOUBLE PRECISION DEFAULT 0,
    "commissionAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "AffiliateCommissionStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "approvedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "reversedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_payouts" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payoutMethod" VARCHAR(60),
    "payoutReference" VARCHAR(180),
    "payoutNotes" TEXT,
    "status" "AffiliatePayoutStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_payouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_partners_affiliateCode_key" ON "affiliate_partners"("affiliateCode");

-- CreateIndex
CREATE INDEX "affiliate_partners_status_idx" ON "affiliate_partners"("status");

-- CreateIndex
CREATE INDEX "affiliate_partners_phone_idx" ON "affiliate_partners"("phone");

-- CreateIndex
CREATE INDEX "affiliate_partners_email_idx" ON "affiliate_partners"("email");

-- CreateIndex
CREATE INDEX "affiliate_partners_affiliateCode_idx" ON "affiliate_partners"("affiliateCode");

-- CreateIndex
CREATE INDEX "affiliate_clicks_affiliatePartnerId_idx" ON "affiliate_clicks"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "affiliate_clicks_affiliateCode_idx" ON "affiliate_clicks"("affiliateCode");

-- CreateIndex
CREATE INDEX "affiliate_clicks_createdAt_idx" ON "affiliate_clicks"("createdAt");

-- CreateIndex
CREATE INDEX "affiliate_commissions_affiliatePartnerId_idx" ON "affiliate_commissions"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "affiliate_commissions_status_idx" ON "affiliate_commissions"("status");

-- CreateIndex
CREATE INDEX "affiliate_commissions_createdAt_idx" ON "affiliate_commissions"("createdAt");

-- CreateIndex
CREATE INDEX "affiliate_commissions_leadId_idx" ON "affiliate_commissions"("leadId");

-- CreateIndex
CREATE INDEX "affiliate_commissions_paymentId_idx" ON "affiliate_commissions"("paymentId");

-- CreateIndex
CREATE INDEX "affiliate_commissions_admissionId_idx" ON "affiliate_commissions"("admissionId");

-- CreateIndex
CREATE INDEX "affiliate_payouts_affiliatePartnerId_idx" ON "affiliate_payouts"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "affiliate_payouts_status_idx" ON "affiliate_payouts"("status");

-- CreateIndex
CREATE INDEX "affiliate_payouts_createdAt_idx" ON "affiliate_payouts"("createdAt");

-- AddForeignKey
ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_payouts" ADD CONSTRAINT "affiliate_payouts_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
