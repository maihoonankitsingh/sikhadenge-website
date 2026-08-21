import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { getWhatsAppStatusSharedSecret } from "../../../../lib/funnel/whatsappAgent";

const STATUS_TO_EVENT: Record<string, string> = {
  queued: "whatsapp_message_queued",
  sent: "whatsapp_message_sent",
  delivered: "whatsapp_delivered",
  read: "whatsapp_read",
  failed: "whatsapp_failed",
  community_joined: "community_joined",
};

function text(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function authorized(req: NextApiRequest) {
  const expected = getWhatsAppStatusSharedSecret();
  if (!expected) return false;
  const auth = text(req.headers.authorization, 500);
  if (!auth.startsWith("Bearer ")) return false;
  const received = auth.slice(7);
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function statusMetadata(input: {
  provider: string;
  providerMessageId: string;
  status: string;
  occurredAt: string;
  errorCode: string;
  errorMessage: string;
  messageType: string;
  journeyStage: string;
  templateName: string;
  automationId: string;
  scheduledFor: string;
}): Prisma.InputJsonObject {
  const out: Record<string, Prisma.InputJsonValue> = {
    provider: input.provider,
    providerMessageId: input.providerMessageId,
    status: input.status,
  };
  if (input.occurredAt) out.occurredAt = input.occurredAt;
  if (input.errorCode) out.errorCode = input.errorCode;
  if (input.errorMessage) out.errorMessage = input.errorMessage;
  if (input.messageType) out.messageType = input.messageType;
  if (input.journeyStage) out.journeyStage = input.journeyStage;
  if (input.templateName) out.templateName = input.templateName;
  if (input.automationId) out.automationId = input.automationId;
  if (input.scheduledFor) out.scheduledFor = input.scheduledFor;
  return out;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (!authorized(req)) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const status = text(req.body?.status, 40).toLowerCase();
  const eventName = STATUS_TO_EVENT[status];
  const leadId = text(req.body?.leadId, 120);
  const providerMessageId = text(req.body?.providerMessageId ?? req.body?.messageId, 180);
  const provider = text(req.body?.provider, 80) || "sikhadenge-whatsapp";
  const occurredAt = text(req.body?.occurredAt, 80);
  const errorCode = text(req.body?.errorCode, 120);
  const errorMessage = text(req.body?.errorMessage, 500);
  const messageType = text(req.body?.messageType ?? req.body?.message_type ?? req.body?.step, 120).toLowerCase();
  const journeyStage = text(req.body?.journeyStage ?? req.body?.journey_stage, 120).toLowerCase();
  const templateName = text(req.body?.templateName ?? req.body?.template_name, 180);
  const automationId = text(req.body?.automationId ?? req.body?.automation_id, 180);
  const scheduledFor = text(req.body?.scheduledFor ?? req.body?.scheduled_for, 80);

  if (!eventName || !leadId || !providerMessageId) {
    return res.status(400).json({ ok: false, error: "status, leadId and providerMessageId are required" });
  }

  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId }, select: { id: true } });
    if (!lead) return res.status(404).json({ ok: false, error: "Lead not found" });

    const registration = await prisma.funnelEvent.findFirst({
      where: { leadId, eventName: "generate_lead" },
      orderBy: { createdAt: "desc" },
    });

    const eventId = `wa_${status}_${crypto.createHash("sha256").update(providerMessageId).digest("hex").slice(0, 32)}`;
    const metadata = statusMetadata({ provider, providerMessageId, status, occurredAt, errorCode, errorMessage, messageType, journeyStage, templateName, automationId, scheduledFor });

    await prisma.funnelEvent.upsert({
      where: { eventId },
      create: {
        eventId,
        eventName,
        visitorId: registration?.visitorId || null,
        sessionId: registration?.sessionId || null,
        leadId,
        funnel: registration?.funnel || null,
        offerMode: registration?.offerMode || null,
        entryPrice: registration?.entryPrice ?? null,
        batchId: registration?.batchId || null,
        pagePath: registration?.pagePath || null,
        source: registration?.source || null,
        medium: registration?.medium || null,
        campaign: registration?.campaign || null,
        content: registration?.content || null,
        term: registration?.term || null,
        campaignId: registration?.campaignId || null,
        adsetId: registration?.adsetId || null,
        adId: registration?.adId || null,
        fbclid: registration?.fbclid || null,
        fbp: registration?.fbp || null,
        fbc: registration?.fbc || null,
        gclid: registration?.gclid || null,
        landingVariant: registration?.landingVariant || null,
        metadata,
      },
      update: { metadata },
    });

    return res.status(200).json({ ok: true, eventName, eventId, messageType: messageType || null, journeyStage: journeyStage || null });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(200).json({ ok: true, duplicate: true });
    }
    console.error("WhatsApp funnel status ingestion failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to record WhatsApp status" });
  }
}
