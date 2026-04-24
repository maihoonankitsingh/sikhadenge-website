-- CreateTable
CREATE TABLE "affiliate_lead_captures" (
    "id" TEXT NOT NULL,
    "affiliatePartnerId" TEXT NOT NULL,
    "affiliateCode" VARCHAR(60),
    "fullName" VARCHAR(180),
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "courseInterest" VARCHAR(180),
    "sourcePage" VARCHAR(500),
    "externalLeadId" VARCHAR(120),
    "captureSource" VARCHAR(120),
    "referrerUrl" VARCHAR(1000),
    "utmSource" VARCHAR(120),
    "utmMedium" VARCHAR(120),
    "utmCampaign" VARCHAR(180),
    "utmTerm" VARCHAR(180),
    "utmContent" VARCHAR(180),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_lead_captures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "affiliate_lead_captures_affiliatePartnerId_idx" ON "affiliate_lead_captures"("affiliatePartnerId");

-- CreateIndex
CREATE INDEX "affiliate_lead_captures_affiliateCode_idx" ON "affiliate_lead_captures"("affiliateCode");

-- CreateIndex
CREATE INDEX "affiliate_lead_captures_phone_idx" ON "affiliate_lead_captures"("phone");

-- CreateIndex
CREATE INDEX "affiliate_lead_captures_email_idx" ON "affiliate_lead_captures"("email");

-- CreateIndex
CREATE INDEX "affiliate_lead_captures_createdAt_idx" ON "affiliate_lead_captures"("createdAt");

-- AddForeignKey
ALTER TABLE "affiliate_lead_captures" ADD CONSTRAINT "affiliate_lead_captures_affiliatePartnerId_fkey" FOREIGN KEY ("affiliatePartnerId") REFERENCES "affiliate_partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
