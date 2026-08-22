-- CreateTable
CREATE TABLE "FunnelEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "eventName" TEXT NOT NULL,
    "visitorId" TEXT,
    "sessionId" TEXT,
    "leadId" TEXT,
    "funnel" TEXT,
    "offerMode" TEXT,
    "entryPrice" INTEGER,
    "batchId" TEXT,
    "pagePath" TEXT,
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "content" TEXT,
    "term" TEXT,
    "campaignId" TEXT,
    "adsetId" TEXT,
    "adId" TEXT,
    "fbclid" TEXT,
    "fbp" TEXT,
    "fbc" TEXT,
    "gclid" TEXT,
    "landingVariant" TEXT,
    "eventValue" INTEGER,
    "currency" TEXT DEFAULT 'INR',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FunnelEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FunnelEvent_eventName_createdAt_idx" ON "FunnelEvent"("eventName", "createdAt");
CREATE INDEX "FunnelEvent_funnel_offerMode_createdAt_idx" ON "FunnelEvent"("funnel", "offerMode", "createdAt");
CREATE INDEX "FunnelEvent_eventId_idx" ON "FunnelEvent"("eventId");
CREATE INDEX "FunnelEvent_visitorId_idx" ON "FunnelEvent"("visitorId");
CREATE INDEX "FunnelEvent_sessionId_idx" ON "FunnelEvent"("sessionId");
CREATE INDEX "FunnelEvent_leadId_idx" ON "FunnelEvent"("leadId");
CREATE INDEX "FunnelEvent_campaignId_idx" ON "FunnelEvent"("campaignId");
CREATE INDEX "FunnelEvent_adId_idx" ON "FunnelEvent"("adId");
