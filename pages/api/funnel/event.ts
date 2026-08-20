import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

const ALLOWED_EVENTS = new Set([
  "view_masterclass_offer",
  "masterclass_cta_click",
  "registration_submit_click",
  "generate_lead",
  "begin_checkout",
  "purchase",
  "whatsapp_cta_click",
  "community_click",
  "join_group",
  "masterclass_joined",
  "masterclass_30m",
  "masterclass_60m",
  "masterclass_offer_seen",
  "workshop_cta_click",
  "workshop_purchase",
  "workshop_attended",
  "qualify_lead",
  "working_lead",
  "core_offer_seen",
  "close_convert_lead",
  "close_unconvert_lead",
  "refund",
]);

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 180;
const ipHits =
  (globalThis as any).__sd_funnel_event_hits ??
  ((globalThis as any).__sd_funnel_event_hits = new Map<
    string,
    { n: number; t: number }
  >());

function getClientIp(req: NextApiRequest) {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();

  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0]?.trim() || "unknown";
  }

  return String(req.socket?.remoteAddress || "unknown");
}

function rateLimited(ip: string) {
  const now = Date.now();
  const current = ipHits.get(ip);

  if (!current || now - current.t > RATE_WINDOW_MS) {
    ipHits.set(ip, { n: 1, t: now });
    return false;
  }

  current.n += 1;
  ipHits.set(ip, current);
  return current.n > RATE_MAX;
}

function short(value: unknown, max = 220): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function positiveInt(value: unknown): number | null {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.round(parsed);
}

function safeMetadata(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const output: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>).slice(0, 25)) {
    if (typeof item === "string") output[key.slice(0, 80)] = item.slice(0, 500);
    else if (typeof item === "number" || typeof item === "boolean" || item === null) {
      output[key.slice(0, 80)] = item;
    }
  }

  return output;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many analytics events" });
  }

  const body = req.body ?? {};
  const eventName = short(body.eventName, 80);

  if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
    return res.status(400).json({ ok: false, error: "Invalid event" });
  }

  const funnel = short(body.funnel, 30);
  const offerMode = short(body.offerMode, 20);
  if (funnel && !["chatgpt", "claude"].includes(funnel)) {
    return res.status(400).json({ ok: false, error: "Invalid funnel" });
  }
  if (offerMode && !["free", "paid"].includes(offerMode)) {
    return res.status(400).json({ ok: false, error: "Invalid offer mode" });
  }

  try {
    const item = await prisma.funnelEvent.create({
      data: {
        eventName,
        visitorId: short(body.visitorId, 120),
        leadId: short(body.leadId, 120),
        funnel,
        offerMode,
        entryPrice: positiveInt(body.entryPrice),
        batchId: short(body.batchId, 180),
        pagePath: short(body.pagePath, 300),
        source: short(body.source, 120),
        medium: short(body.medium, 120),
        campaign: short(body.campaign, 220),
        content: short(body.content, 220),
        term: short(body.term, 220),
        campaignId: short(body.campaignId, 120),
        adsetId: short(body.adsetId, 120),
        adId: short(body.adId, 120),
        fbclid: short(body.fbclid, 300),
        landingVariant: short(body.landingVariant, 120),
        eventValue: positiveInt(body.eventValue ?? body?.metadata?.value),
        currency: short(body.currency ?? body?.metadata?.currency, 8) || "INR",
        metadata: safeMetadata(body.metadata) || undefined,
      },
      select: { id: true },
    });

    return res.status(200).json({ ok: true, id: item.id });
  } catch (error) {
    console.error("Funnel event persistence failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to record event" });
  }
}
