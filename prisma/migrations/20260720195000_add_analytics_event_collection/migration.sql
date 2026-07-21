CREATE TABLE IF NOT EXISTS "AnalyticsEvent" (
  "id" TEXT NOT NULL,
  "eventId" VARCHAR(128) NOT NULL,
  "contractVersion" VARCHAR(16) NOT NULL,
  "eventName" VARCHAR(64) NOT NULL,
  "occurredAt" TIMESTAMP(3) NOT NULL,
  "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "anonymousId" VARCHAR(128) NOT NULL,
  "sessionId" VARCHAR(128) NOT NULL,
  "environment" VARCHAR(32) NOT NULL,
  "source" VARCHAR(32) NOT NULL,
  "pagePath" VARCHAR(2048) NOT NULL,
  "requestId" VARCHAR(128),
  "identity" JSONB NOT NULL,
  "page" JSONB NOT NULL,
  "campaign" JSONB NOT NULL,
  "device" JSONB NOT NULL,
  "geo" JSONB NOT NULL,
  "properties" JSONB NOT NULL,
  "consent" JSONB NOT NULL,
  "context" JSONB NOT NULL,
  "payload" JSONB NOT NULL,

  CONSTRAINT "AnalyticsEvent_pkey"
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS
  "AnalyticsEvent_eventId_key"
  ON "AnalyticsEvent"("eventId");

CREATE INDEX IF NOT EXISTS
  "AnalyticsEvent_eventName_occurredAt_idx"
  ON "AnalyticsEvent"(
    "eventName",
    "occurredAt"
  );

CREATE INDEX IF NOT EXISTS
  "AnalyticsEvent_anonymousId_occurredAt_idx"
  ON "AnalyticsEvent"(
    "anonymousId",
    "occurredAt"
  );

CREATE INDEX IF NOT EXISTS
  "AnalyticsEvent_sessionId_occurredAt_idx"
  ON "AnalyticsEvent"(
    "sessionId",
    "occurredAt"
  );

CREATE INDEX IF NOT EXISTS
  "AnalyticsEvent_occurredAt_idx"
  ON "AnalyticsEvent"("occurredAt");

CREATE INDEX IF NOT EXISTS
  "AnalyticsEvent_receivedAt_idx"
  ON "AnalyticsEvent"("receivedAt");
