import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { sendMetaCapiEvent } from "../../../lib/funnel/metaCapi";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
const ipHits =
  (globalThis as any).__sd_funnel_register_hits ??
  ((globalThis as any).__sd_funnel_register_hits = new Map<string, { n: number; t: number }>());

function getClientIp(req: NextApiRequest) {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) return xff.split(",")[0]?.trim() || "unknown";
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

function text(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function normalizePhone(value: unknown) {
  const digits = text(value, 30).replace(/\D/g, "");
  return digits.length < 10 ? null : digits.slice(-10);
}

function normalizeEmail(value: unknown) {
  const email = text(value, 220).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

type ServerAttribution = {
  visitorId: string;
  sessionId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  campaignId: string;
  adsetId: string;
  adId: string;
  fbclid: string;
  fbp: string;
  fbc: string;
  gclid: string;
  landingVariant: string;
  referrer: string;
};

function emptyAttribution(): ServerAttribution {
  return {
    visitorId: "",
    sessionId: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
    campaignId: "",
    adsetId: "",
    adId: "",
    fbclid: "",
    fbp: "",
    fbc: "",
    gclid: "",
    landingVariant: "",
    referrer: "",
  };
}

function attribution(value: unknown): ServerAttribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return emptyAttribution();
  const raw = value as Record<string, unknown>;
  return {
    visitorId: text(raw.visitorId, 120),
    sessionId: text(raw.sessionId, 120),
    utmSource: text(raw.utmSource, 120),
    utmMedium: text(raw.utmMedium, 120),
    utmCampaign: text(raw.utmCampaign, 220),
    utmContent: text(raw.utmContent, 220),
    utmTerm: text(raw.utmTerm, 220),
    campaignId: text(raw.campaignId, 120),
    adsetId: text(raw.adsetId, 120),
    adId: text(raw.adId, 120),
    fbclid: text(raw.fbclid, 300),
    fbp: text(raw.fbp, 300),
    fbc: text(raw.fbc, 500),
    gclid: text(raw.gclid, 300),
    landingVariant: text(raw.landingVariant, 120),
    referrer: text(raw.referrer, 500),
  };
}

function absolutePageUrl(path: string) {
  const base = (process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://sikhadenge.in").replace(/\/$/, "");
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

async function pushNeoDove(payload: {
  name: string;
  phone: string;
  email: string;
  funnel: string;
  offerMode: string;
}) {
  const endpoint = process.env.NEODOVE_ENDPOINT;
  if (!endpoint) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        mobile: payload.phone,
        email: payload.email,
        detail1: payload.funnel,
        detail2: `${payload.funnel} masterclass`,
        detail3: payload.offerMode,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function pushWhatsAppRegistration(payload: Record<string, unknown>) {
  const endpoint = process.env.WHATSAPP_FUNNEL_WEBHOOK_URL;
  if (!endpoint) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.WHATSAPP_FUNNEL_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${process.env.WHATSAPP_FUNNEL_WEBHOOK_TOKEN}`;
  }
  try {
    await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  }

  const body = req.body ?? {};
  if (text(body.hp, 200)) {
    return res.status(200).json({
      ok: true,
      leadId: null,
      checkoutUrl: null,
      confirmationUrl: null,
      shouldTrackLead: false,
    });
  }

  const fullName = text(body.fullName ?? body.name, 120);
  const phone = normalizePhone(body.phone);
  const email = normalizeEmail(body.email);
  const funnel = text(body.funnel, 20) as "chatgpt" | "claude";
  const offerMode = text(body.offerMode, 20) as "free" | "paid";
  const occupation = text(body.occupation, 120);
  const goal = text(body.goal, 160);
  const laptop = text(body.laptop, 40);
  const batchId = text(body.batchId, 180);
  const page = text(body.page, 300);
  const attrs = attribution(body.attribution);
  const requestedPrice = Math.max(0, Math.round(Number(body.entryPrice) || 0));

  if (fullName.length < 2) return res.status(400).json({ ok: false, error: "Please enter your full name." });
  if (!phone) return res.status(400).json({ ok: false, error: "Please enter a valid WhatsApp number." });
  if (!email) return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  if (!["chatgpt", "claude"].includes(funnel)) return res.status(400).json({ ok: false, error: "Invalid masterclass." });
  if (!["free", "paid"].includes(offerMode)) return res.status(400).json({ ok: false, error: "Invalid offer mode." });

  const configuredPaidPrice = Math.max(
    1,
    Math.round(Number(process.env.NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE || "9") || 9)
  );
  const entryPrice = offerMode === "free" ? 0 : configuredPaidPrice;

  if (offerMode === "paid" && requestedPrice !== configuredPaidPrice) {
    return res.status(409).json({
      ok: false,
      error: "The masterclass price changed. Refresh the page and try again.",
    });
  }

  try {
    const source = `funnel:${funnel}:${offerMode}`;
    const since = new Date(Date.now() - 10 * 60 * 1000);
    let lead = await prisma.lead.findFirst({
      where: { phone, source, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
    });

    let shouldTrackLead = false;
    let registrationEventId = "";

    if (!lead) {
      const notes = {
        schema: "funnel-v2",
        page,
        funnel,
        offerMode,
        entryPrice,
        batchId,
        email,
        occupation,
        goal,
        laptop,
        attribution: attrs,
        ip,
      };

      lead = await prisma.lead.create({
        data: {
          name: fullName,
          phone,
          source,
          status: "registered",
          notes: JSON.stringify(notes),
        },
      });

      registrationEventId = `lead_${crypto.randomUUID()}`;
      shouldTrackLead = true;

      await prisma.funnelEvent.create({
        data: {
          eventId: registrationEventId,
          eventName: "generate_lead",
          visitorId: attrs.visitorId || null,
          sessionId: attrs.sessionId || null,
          leadId: lead.id,
          funnel,
          offerMode,
          entryPrice,
          batchId: batchId || null,
          pagePath: page || null,
          source: attrs.utmSource || null,
          medium: attrs.utmMedium || null,
          campaign: attrs.utmCampaign || null,
          content: attrs.utmContent || null,
          term: attrs.utmTerm || null,
          campaignId: attrs.campaignId || null,
          adsetId: attrs.adsetId || null,
          adId: attrs.adId || null,
          fbclid: attrs.fbclid || null,
          fbp: attrs.fbp || null,
          fbc: attrs.fbc || null,
          gclid: attrs.gclid || null,
          landingVariant: attrs.landingVariant || null,
          metadata: {
            occupation,
            goal,
            laptop,
            referrer: attrs.referrer,
            serverPersisted: true,
          },
        },
      });

      const integrationResults = await Promise.allSettled([
        pushNeoDove({ name: fullName, phone, email, funnel, offerMode }),
        pushWhatsAppRegistration({
          event: "masterclass_registered",
          leadId: lead.id,
          name: fullName,
          phone,
          email,
          funnel,
          offerMode,
          entryPrice,
          batchId,
          paymentRequired: offerMode === "paid",
        }),
        sendMetaCapiEvent({
          eventName: "Lead",
          eventId: registrationEventId,
          eventSourceUrl: absolutePageUrl(page),
          email,
          phone,
          clientIp: ip,
          clientUserAgent: text(req.headers["user-agent"], 500),
          fbp: attrs.fbp,
          fbc: attrs.fbc,
          externalId: lead.id,
          contentName: `${funnel}_masterclass`,
          customData: { offer_mode: offerMode, entry_price: entryPrice, batch_id: batchId },
        }),
      ]);

      for (const result of integrationResults) {
        if (result.status === "rejected") {
          console.error("Funnel integration failed:", result.reason);
        } else if (
          result.value &&
          typeof result.value === "object" &&
          "attempted" in result.value &&
          result.value.attempted &&
          !result.value.ok
        ) {
          console.error("Meta CAPI lead event failed:", result.value);
        }
      }
    } else {
      const existingEvent = await prisma.funnelEvent.findFirst({
        where: { leadId: lead.id, eventName: "generate_lead" },
        orderBy: { createdAt: "desc" },
        select: { eventId: true },
      });
      registrationEventId = existingEvent?.eventId || "";
    }

    const checkoutUrl =
      offerMode === "paid"
        ? `/masterclass/${funnel}/checkout?lead_id=${encodeURIComponent(lead.id)}`
        : null;

    const confirmationUrl = `/masterclass/${funnel}/thank-you?lead_id=${encodeURIComponent(
      lead.id
    )}&mode=${encodeURIComponent(offerMode)}`;

    return res.status(200).json({
      ok: true,
      leadId: lead.id,
      checkoutUrl,
      confirmationUrl,
      entryPrice,
      shouldTrackLead,
      registrationEventId,
    });
  } catch (error) {
    console.error("Funnel registration failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to complete registration." });
  }
}
