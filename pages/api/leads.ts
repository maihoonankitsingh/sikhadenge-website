import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Resp = { ok: true; lead: any } | { ok: false; error: string };

/**
 * Simple in-memory rate limiter (per Node process).
 * Good enough for basic spam protection on VPS + single PM2 process.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX = 20; // max requests per window per IP

const ipHits =
  (globalThis as any).__sd_ipHits ??
  ((globalThis as any).__sd_ipHits = new Map<string, { n: number; t: number }>());

function getClientIp(req: NextApiRequest): string {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();

  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    // first ip in list
    return xff.split(",")[0]?.trim() || "unknown";
  }
  return (req.socket?.remoteAddress || "unknown").toString();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cur = ipHits.get(ip);

  if (!cur) {
    ipHits.set(ip, { n: 1, t: now });
    return false;
  }

  // reset window
  if (now - cur.t > RATE_WINDOW_MS) {
    ipHits.set(ip, { n: 1, t: now });
    return false;
  }

  cur.n += 1;
  ipHits.set(ip, cur);
  return cur.n > RATE_MAX;
}

function normalizePromoCode(value: unknown): string | null {
  if (!value || typeof value !== "string") return null;
  const v = value.trim().toUpperCase();
  return v.length ? v : null;
}

function normalizePhone(value: unknown): string | null {
  if (!value || typeof value !== "string") return null;
  const digits = value.replace(/[^\d]/g, "");
  if (digits.length < 10) return null;
  // If +91 included etc, keep last 10 digits
  return digits.slice(-10);
}

function safeObject(value: unknown): Record<string, any> | null {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) return null;
  return value as Record<string, any>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Resp>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = getClientIp(req);

  // rate-limit first
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  }

  try {
    const body = req.body ?? {};

    // Honeypot: if bot fills hidden field, silently accept but don't store.
    // (frontend me later hidden input add karenge, name: "hp")
    const hp = typeof body.hp === "string" ? body.hp.trim() : "";
    if (hp) {
      return res.status(200).json({ ok: true, lead: null });
    }

    const fullNameRaw = body.fullName ?? body.name ?? "";
    const fullName = typeof fullNameRaw === "string" ? fullNameRaw.trim() : "";

    const phone = normalizePhone(body.phone);

    const sourceRaw = body.source ?? "website";
    const source = typeof sourceRaw === "string" ? sourceRaw.trim() : "website";

    const promoCode = normalizePromoCode(body.promoCode);

    const page =
      typeof body.page === "string" ? body.page.trim() : "counselling-modal";

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ ok: false, error: "fullName is required" });
    }
    if (!phone) {
      return res.status(400).json({ ok: false, error: "valid phone is required" });
    }

    // Duplicate suppression: same phone within last 10 minutes -> return existing lead
    const since = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await prisma.lead.findFirst({
      where: { phone, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
    });
    if (existing) {
      return res.status(200).json({ ok: true, lead: existing });
    }

    // promoCode -> influencer mapping
    let influencerId: string | null = null;
    if (promoCode) {
      const inf = await prisma.influencer.findFirst({
        where: { promoCode, isActive: true },
        select: { id: true },
      });
      influencerId = inf?.id ?? null;
    }

    // notes: merge page + optional modal notes object
    const notesObj: Record<string, any> = { page, ip };
    const notesFromClient = safeObject(body.notes);
    if (notesFromClient) {
      notesObj.form = notesFromClient;
    }

    const lead = await prisma.lead.create({
      data: {
        name: fullName,
        phone,
        source,
        status: "new",
        notes: JSON.stringify(notesObj),
        promoCode,
        influencerId,
      },
    });
        // Push lead to NeoDove (optional)
    const neodoveUrl = process.env.NEODOVE_ENDPOINT;

    if (neodoveUrl) {
      try {
        const course =
          (body?.notes && (body.notes.course || body.notes.Course)) ||
          body?.course ||
          body?.Course ||
          "";

        const ac = new AbortController();
        const t = setTimeout(() => ac.abort(), 5000);

        await fetch(neodoveUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            mobile: phone,
            email: typeof body?.email === "string" ? body.email.trim() : "",
            detail1: promoCode || "",
            detail2: course ? String(course) : "",
            detail3: source || "",
          }),
          signal: ac.signal,
        });

        clearTimeout(t);
      } catch (err) {
        console.error("NeoDove push failed:", err);
      }
    }


    return res.status(200).json({ ok: true, lead });
  } catch (e: any) {
    return res.status(500).json({
      ok: false,
      error: e?.message ? String(e.message) : "Server error",
    });
  }
}



