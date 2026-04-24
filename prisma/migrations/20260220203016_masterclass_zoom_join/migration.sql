-- CreateTable
CREATE TABLE "MasterclassZoomJoin" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT,
    "phone" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_content" TEXT,
    "utm_term" TEXT,
    "referer" TEXT,
    "userAgent" TEXT,
    "ip" TEXT,
    "redirectTo" TEXT NOT NULL,

    CONSTRAINT "MasterclassZoomJoin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MasterclassZoomJoin_createdAt_idx" ON "MasterclassZoomJoin"("createdAt");

-- CreateIndex
CREATE INDEX "MasterclassZoomJoin_leadId_idx" ON "MasterclassZoomJoin"("leadId");

-- AddForeignKey
ALTER TABLE "MasterclassZoomJoin" ADD CONSTRAINT "MasterclassZoomJoin_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "MasterclassLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
