import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";

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
  const expected = process.env.WHATSAPP_FUNNEL_STATUS_TOKEN || "";
  if (!expected) return false;
  const auth = text(req.headers.authorization, 500);
  if (!auth.startsWith("Bearer ")) return false;
  const received = auth.slice(7);
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
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
        metadata: {
          provider,
          providerMessageId,
          status,
          occurredAt: occurredAt || null,
          errorCode: errorCode || null,
          errorMessage: errorMessage || null,
        },
      },
      update: {
        metadata: {
          provider,
          providerMessageId,
          status,
          occurredAt: occurredAt || null,
          errorCode: errorCode || null,
          errorMessage: errorMessage || null,
        },
      },
    });

    return res.status(200).json({ ok: true, eventName, eventId });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(200).json({ ok: true, duplicate: true });
    }
    console.error("WhatsApp funnel status ingestion failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to record WhatsApp status" });
  }
}
