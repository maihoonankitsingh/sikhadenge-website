-- CreateTable
CREATE TABLE "FunnelCrmProfile" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "pipelineStage" TEXT NOT NULL DEFAULT 'new_lead',
    "owner" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "advisorStatus" TEXT NOT NULL DEFAULT 'not_started',
    "qualification" TEXT,
    "lostReason" TEXT,
    "nextFollowUpAt" TIMESTAMP(3),
    "lastContactAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FunnelCrmProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FunnelCrmActivity" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "field" TEXT,
    "oldValue" TEXT,
    "newValue" TEXT,
    "note" TEXT,
    "adminId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FunnelCrmActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FunnelCrmProfile_leadId_key" ON "FunnelCrmProfile"("leadId");

-- CreateIndex
CREATE INDEX "FunnelCrmProfile_pipelineStage_updatedAt_idx" ON "FunnelCrmProfile"("pipelineStage", "updatedAt");

-- CreateIndex
CREATE INDEX "FunnelCrmProfile_owner_nextFollowUpAt_idx" ON "FunnelCrmProfile"("owner", "nextFollowUpAt");

-- CreateIndex
CREATE INDEX "FunnelCrmProfile_advisorStatus_updatedAt_idx" ON "FunnelCrmProfile"("advisorStatus", "updatedAt");

-- CreateIndex
CREATE INDEX "FunnelCrmProfile_priority_updatedAt_idx" ON "FunnelCrmProfile"("priority", "updatedAt");

-- CreateIndex
CREATE INDEX "FunnelCrmProfile_nextFollowUpAt_idx" ON "FunnelCrmProfile"("nextFollowUpAt");

-- CreateIndex
CREATE INDEX "FunnelCrmActivity_leadId_createdAt_idx" ON "FunnelCrmActivity"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "FunnelCrmActivity_activityType_createdAt_idx" ON "FunnelCrmActivity"("activityType", "createdAt");

-- CreateIndex
CREATE INDEX "FunnelCrmActivity_adminId_createdAt_idx" ON "FunnelCrmActivity"("adminId", "createdAt");
