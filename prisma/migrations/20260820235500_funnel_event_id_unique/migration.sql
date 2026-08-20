DROP INDEX IF EXISTS "FunnelEvent_eventId_idx";
CREATE UNIQUE INDEX "FunnelEvent_eventId_key" ON "FunnelEvent"("eventId");
