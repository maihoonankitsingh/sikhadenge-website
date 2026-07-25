import { prisma } from "../db/prisma";
import { normalizeWhatsAppWebhook } from "../meta/webhook-normalizer";
import {
  processInboundAgentLifecycle,
  type LiveAgentLifecycleResult,
} from "./live-agent-service";

export type WebhookAgentBridgeResult = {
  matched: number;
  analyzed: number;
  queued: number;
  sent: number;
  handoffs: number;
  skipped: number;
  failed: number;
};

export async function processWebhookAgentBridge(
  payload: unknown,
): Promise<WebhookAgentBridgeResult> {
  const events = normalizeWhatsAppWebhook(payload).filter(
    (event) => event.kind === "message",
  );
  const result: WebhookAgentBridgeResult = {
    matched: 0,
    analyzed: 0,
    queued: 0,
    sent: 0,
    handoffs: 0,
    skipped: 0,
    failed: 0,
  };

  for (const event of events) {
    if (event.kind !== "message") continue;
    const stored = await prisma.whatsAppMessage.findUnique({
      where: { metaMessageId: event.message.id },
      select: { id: true },
    });
    if (!stored) {
      result.skipped += 1;
      continue;
    }

    result.matched += 1;
    let lifecycle: LiveAgentLifecycleResult;
    try {
      lifecycle = await processInboundAgentLifecycle({ messageId: stored.id });
    } catch {
      result.failed += 1;
      continue;
    }
    if (lifecycle.analyzed) result.analyzed += 1;
    if (lifecycle.queued) result.queued += 1;
    if (lifecycle.sent) result.sent += 1;
    if (lifecycle.handoff) result.handoffs += 1;
    if (lifecycle.skipped) result.skipped += 1;
    if (lifecycle.failed) result.failed += 1;
  }

  return result;
}
