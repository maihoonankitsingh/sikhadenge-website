-- Phase 8 migration-history reconciliation.
-- Historical migrations do not contain the current Influencer models/Lead relation.
-- This migration is intentionally forward-only and non-destructive so databases
-- that already received these objects outside Prisma migrations are not dropped/recreated.

-- Current Lead model fields that are missing from the historical migration chain.
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "promoCode" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "influencerId" TEXT;

-- Influencer model.
CREATE TABLE IF NOT EXISTS "Influencer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT NOT NULL,
    "promoCode" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- InfluencerSession model.
CREATE TABLE IF NOT EXISTS "InfluencerSession" (
    "id" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InfluencerSession_pkey" PRIMARY KEY ("id")
);

-- Current unique/index contract. IF NOT EXISTS keeps this safe when the legacy
-- schema was already provisioned by an older manual/db-push workflow.
CREATE UNIQUE INDEX IF NOT EXISTS "Influencer_email_key" ON "Influencer"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Influencer_promoCode_key" ON "Influencer"("promoCode");
CREATE UNIQUE INDEX IF NOT EXISTS "InfluencerSession_tokenHash_key" ON "InfluencerSession"("tokenHash");
CREATE INDEX IF NOT EXISTS "InfluencerSession_influencerId_idx" ON "InfluencerSession"("influencerId");
CREATE INDEX IF NOT EXISTS "InfluencerSession_expiresAt_idx" ON "InfluencerSession"("expiresAt");

-- Add foreign keys only when the expected named constraint is absent.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'Lead_influencerId_fkey'
    ) THEN
        ALTER TABLE "Lead"
        ADD CONSTRAINT "Lead_influencerId_fkey"
        FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'InfluencerSession_influencerId_fkey'
    ) THEN
        ALTER TABLE "InfluencerSession"
        ADD CONSTRAINT "InfluencerSession_influencerId_fkey"
        FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id")
        ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
