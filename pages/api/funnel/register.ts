import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
const ipHits = (globalThis as any).__sd_funnel_register_hits ?? ((globalThis as any).__sd_funnel_register_hits = new Map<string, { n: number; t: number }>());

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
  if (!current || now - current.t > RATE_WINDOW_MS) { ipHits.set(ip, { n: 1, t: now }); return false; }
  current.n += 1; ipHits.set(ip, current); return current.n > RATE_MAX;
}

function text(value: unknown, max = 300) { if (typeof value !== "string") return ""; return value.trim().slice(0, max); }
function normalizePhone(value: unknown) { const digits = text(value, 30).replace(/\D/g, ""); return digits.length < 10 ? null : digits.slice(-10); }
function normalizeEmail(value: unknown) { const email = text(value, 220).toLowerCase(); return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null; }

type ServerAttribution = { visitorId: string; utmSource: string; utmMedium: string; utmCampaign: string; utmContent: string; utmTerm: string; campaignId: string; adsetId: string; adId: string; fbclid: string; landingVariant: string; referrer: string; };
function emptyAttribution(): ServerAttribution { return { visitorId: "", utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "", campaignId: "", adsetId: "", adId: "", fbclid: "", landingVariant: "", referrer: "" }; }
function attribution(value: unknown): ServerAttribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return emptyAttribution();
  const raw = value as Record<string, unknown>;
  return { visitorId: text(raw.visitorId, 120), utmSource: text(raw.utmSource, 120), utmMedium: text(raw.utmMedium, 120), utmCampaign: text(raw.utmCampaign, 220), utmContent: text(raw.utmContent, 220), utmTerm: text(raw.utmTerm, 220), campaignId: text(raw.campaignId, 120), adsetId: text(raw.adsetId, 120), adId: text(raw.adId, 120), fbclid: text(raw.fbclid, 300), landingVariant: text(raw.landingVariant, 120), referrer: text(raw.referrer, 500) };
}

function configuredCheckoutUrl(product: "chatgpt" | "claude") {
  if (product === "chatgpt" && process.env.CHATGPT_MASTERCLASS_CHECKOUT_URL) return process.env.CHATGPT_MASTERCLASS_CHECKOUT_URL;
  if (product === "claude" && process.env.CLAUDE_MASTERCLASS_CHECKOUT_URL) return process.env.CLAUDE_MASTERCLASS_CHECKOUT_URL;
  return process.env.MASTERCLASS_CHECKOUT_URL || "";
}

function buildCheckoutUrl(raw: string, params: { leadId: string; visitorId: string; funnel: string; amount: number; batchId: string }) {
  if (!raw) return null;
  try { const url = new URL(raw); url.searchParams.set("lead_id", params.leadId); if (params.visitorId) url.searchParams.set("visitor_id", params.visitorId); url.searchParams.set("funnel", params.funnel); url.searchParams.set("amount", String(params.amount)); if (params.batchId) url.searchParams.set("batch_id", params.batchId); return url.toString(); } catch { return null; }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false, error: "Method not allowed" }); }
  const ip = getClientIp(req); if (rateLimited(ip)) return res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  const body = req.body ?? {}; if (text(body.hp, 200)) return res.status(200).json({ ok: true, leadId: null, checkoutUrl: null });

  const fullName = text(body.fullName ?? body.name, 120); const phone = normalizePhone(body.phone); const email = normalizeEmail(body.email);
  const funnel = text(body.funnel, 20) as "chatgpt" | "claude"; const offerMode = text(body.offerMode, 20) as "free" | "paid";
  const occupation = text(body.occupation, 120); const goal = text(body.goal, 160); const laptop = text(body.laptop, 40); const batchId = text(body.batchId, 180); const page = text(body.page, 300); const attrs = attribution(body.attribution); const requestedPrice = Math.max(0, Math.round(Number(body.entryPrice) || 0));

  if (fullName.length < 2) return res.status(400).json({ ok: false, error: "Please enter your full name." });
  if (!phone) return res.status(400).json({ ok: false, error: "Please enter a valid WhatsApp number." });
  if (!email) return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  if (!["chatgpt", "claude"].includes(funnel)) return res.status(400).json({ ok: false, error: "Invalid masterclass." });
  if (!["free", "paid"].includes(offerMode)) return res.status(400).json({ ok: false, error: "Invalid offer mode." });

  const configuredPaidPrice = Math.max(1, Math.round(Number(process.env.NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE || "9") || 9));
  const entryPrice = offerMode === "free" ? 0 : configuredPaidPrice;
  if (offerMode === "paid" && requestedPrice !== configuredPaidPrice) return res.status(409).json({ ok: false, error: "The masterclass price changed. Refresh the page and try again." });

  try {
    const source = `funnel:${funnel}:${offerMode}`; const since = new Date(Date.now() - 10 * 60 * 1000);
    let lead = await prisma.lead.findFirst({ where: { phone, source, createdAt: { gte: since } }, orderBy: { createdAt: "desc" } });
    if (!lead) {
      const notes = { schema: "funnel-v2", page, funnel, offerMode, entryPrice, batchId, email, occupation, goal, laptop, attribution: attrs, ip };
      lead = await prisma.lead.create({ data: { name: fullName, phone, source, status: "registered", notes: JSON.stringify(notes) } });
      await prisma.funnelEvent.create({ data: { eventName: "generate_lead", visitorId: attrs.visitorId || null, leadId: lead.id, funnel, offerMode, entryPrice, batchId: batchId || null, pagePath: page || null, source: attrs.utmSource || null, medium: attrs.utmMedium || null, campaign: attrs.utmCampaign || null, content: attrs.utmContent || null, term: attrs.utmTerm || null, campaignId: attrs.campaignId || null, adsetId: attrs.adsetId || null, adId: attrs.adId || null, fbclid: attrs.fbclid || null, landingVariant: attrs.landingVariant || null, metadata: { occupation, goal, laptop, referrer: attrs.referrer, serverPersisted: true } } });
      const neodoveUrl = process.env.NEODOVE_ENDPOINT;
      if (neodoveUrl) { try { const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 5000); await fetch(neodoveUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fullName, mobile: phone, email, detail1: funnel, detail2: `${funnel} masterclass`, detail3: offerMode }), signal: controller.signal }); clearTimeout(timer); } catch (error) { console.error("Funnel NeoDove push failed:", error); } }
    }
    const checkoutUrl = offerMode === "paid" ? buildCheckoutUrl(configuredCheckoutUrl(funnel), { leadId: lead.id, visitorId: attrs.visitorId, funnel, amount: entryPrice, batchId }) : null;
    return res.status(200).json({ ok: true, leadId: lead.id, checkoutUrl, entryPrice });
  } catch (error) { console.error("Funnel registration failed:", error); return res.status(500).json({ ok: false, error: "Unable to complete registration." }); }
}
