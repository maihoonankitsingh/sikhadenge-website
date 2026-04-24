CREATE TABLE IF NOT EXISTS "MasterclassSubmission" (
  "id" TEXT NOT NULL,
  "leadId" TEXT,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "laptop" BOOLEAN,
  "goal" TEXT,
  "source" TEXT,
  "page" TEXT,
  "attribution" JSONB,
  "utm_source" TEXT,
  "utm_medium" TEXT,
  "utm_campaign" TEXT,
  "utm_content" TEXT,
  "utm_term" TEXT,
  "utm_id" TEXT,
  "utm_campaign_id" TEXT,
  "utm_adset_id" TEXT,
  "utm_ad_id" TEXT,
  "fbclid" TEXT,
  "gclid" TEXT,
  "msclkid" TEXT,
  "landing_url" TEXT,
  "referrer" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MasterclassSubmission_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "MasterclassSubmission_createdAt_idx" ON "MasterclassSubmission"("createdAt");
CREATE INDEX IF NOT EXISTS "MasterclassSubmission_phone_idx" ON "MasterclassSubmission"("phone");
CREATE INDEX IF NOT EXISTS "MasterclassSubmission_leadId_idx" ON "MasterclassSubmission"("leadId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'MasterclassSubmission_leadId_fkey'
  ) THEN
    ALTER TABLE "MasterclassSubmission"
    ADD CONSTRAINT "MasterclassSubmission_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "MasterclassLead"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
