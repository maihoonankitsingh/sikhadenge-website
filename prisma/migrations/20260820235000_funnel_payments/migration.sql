CREATE TABLE "FunnelPayment" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'razorpay',
    "purpose" TEXT NOT NULL DEFAULT 'masterclass_entry',
    "leadId" TEXT NOT NULL,
    "funnel" TEXT NOT NULL,
    "offerMode" TEXT NOT NULL,
    "batchId" TEXT,
    "amountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'created',
    "receipt" TEXT NOT NULL,
    "providerOrderId" TEXT NOT NULL,
    "providerPaymentId" TEXT,
    "purchaseEventId" TEXT,
    "failureCode" TEXT,
    "failureReason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    CONSTRAINT "FunnelPayment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "FunnelPayment_receipt_key" ON "FunnelPayment"("receipt");
CREATE UNIQUE INDEX "FunnelPayment_providerOrderId_key" ON "FunnelPayment"("providerOrderId");
CREATE UNIQUE INDEX "FunnelPayment_providerPaymentId_key" ON "FunnelPayment"("providerPaymentId");
CREATE UNIQUE INDEX "FunnelPayment_purchaseEventId_key" ON "FunnelPayment"("purchaseEventId");
CREATE INDEX "FunnelPayment_leadId_createdAt_idx" ON "FunnelPayment"("leadId", "createdAt");
CREATE INDEX "FunnelPayment_funnel_offerMode_createdAt_idx" ON "FunnelPayment"("funnel", "offerMode", "createdAt");
CREATE INDEX "FunnelPayment_status_createdAt_idx" ON "FunnelPayment"("status", "createdAt");
CREATE INDEX "FunnelPayment_batchId_idx" ON "FunnelPayment"("batchId");
