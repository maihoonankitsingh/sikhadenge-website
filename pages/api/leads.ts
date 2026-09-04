import type { Lead } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Resp = { ok: true; lead: Lead | null } | { ok: false; error: string };

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
const RATE_MAP_MAX_ENTRIES = 10_000;

type RateEntry = { n: number; t: number };
type GlobalWithLeadRateLimit = typeof globalThis & {
  __sd_ipHits?: Map<string, RateEntry>;
};

const globalRateLimit = globalThis as GlobalWithLeadRateLimit;
const ipHits =
  globalRateLimit.__sd_ipHits ??
  (globalRateLimit.__sd_ipHits = new Map<string, RateEntry>());

function getClientIp(req: NextApiRequest): string {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();

  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0]?.trim() || "unknown";
  }
  return (req.socket?.remoteAddress || "unknown").toString();
}

function pruneIpHits(now: number) {
  for (const [ip, entry] of ipHits) {
    if (now - entry.t > RATE_WINDOW_MS) ipHits.delete(ip);
  }

  if (ipHits.size <= RATE_MAP_MAX_ENTRIES) return;

  const oldest = [...ipHits.entries()]
    .sort((a, b) => a[1].t - b[1].t)
    .slice(0, ipHits.size - RATE_MAP_MAX_ENTRIES);

  for (const [ip] of oldest) ipHits.delete(ip);
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneIpHits(now);

  const cur = ipHits.get(ip);

  if (!cur) {
    ipHits.set(ip, { n: 1, t: now });
    return false;
  }

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
  return digits.slice(-10);
}

function safeObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function errorMessage(error: unknown): string {
  return error instanceof Error && error.message ? error.message : "Server error";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Resp>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  }

  try {
    const body = req.body ?? {};

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

    const page = typeof body.page === "string" ? body.page.trim() : "counselling-modal";

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ ok: false, error: "fullName is required" });
    }
    if (!phone) {
      return res.status(400).json({ ok: false, error: "valid phone is required" });
    }

    const since = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await prisma.lead.findFirst({
      where: { phone, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
    });
    if (existing) {
      return res.status(200).json({ ok: true, lead: existing });
    }

    let influencerId: string | null = null;
    if (promoCode) {
      const inf = await prisma.influencer.findFirst({
        where: { promoCode, isActive: true },
        select: { id: true },
      });
      influencerId = inf?.id ?? null;
    }

    const notesObj: Record<string, unknown> = { page, ip };
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

    const neodoveUrl = process.env.NEODOVE_ENDPOINT;

    if (neodoveUrl) {
      const ac = new AbortController();
      const timeout = setTimeout(() => ac.abort(), 5000);

      try {
        const notes = safeObject(body.notes);
        const courseFromNotes = notes?.course ?? notes?.Course;
        const course = courseFromNotes ?? body?.course ?? body?.Course ?? "";

        const response = await fetch(neodoveUrl, {
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

        if (!response.ok) {
          console.error("NeoDove push failed with status:", response.status);
        }
      } catch (error) {
        console.error("NeoDove push failed:", error);
      } finally {
        clearTimeout(timeout);
      }
    }

    return res.status(200).json({ ok: true, lead });
  } catch (error: unknown) {
    return res.status(500).json({
      ok: false,
      error: errorMessage(error),
    });
  }
}
