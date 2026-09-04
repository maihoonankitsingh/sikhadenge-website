import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { createInfluencerSession } from "../../../lib/influencerAuth";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;
const LOGIN_MAP_MAX_ENTRIES = 5_000;

type LoginAttempt = { count: number; windowStartedAt: number };
type GlobalWithInfluencerLoginRateLimit = typeof globalThis & {
  __sdInfluencerLoginAttempts?: Map<string, LoginAttempt>;
};

const globalRateLimit = globalThis as GlobalWithInfluencerLoginRateLimit;
const loginAttempts =
  globalRateLimit.__sdInfluencerLoginAttempts ??
  (globalRateLimit.__sdInfluencerLoginAttempts = new Map<string, LoginAttempt>());

function clientIp(req: NextApiRequest): string {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) return realIp.trim();

  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return req.socket.remoteAddress || "unknown";
}

function pruneAttempts(now: number) {
  for (const [key, value] of loginAttempts) {
    if (now - value.windowStartedAt > LOGIN_WINDOW_MS) loginAttempts.delete(key);
  }

  if (loginAttempts.size <= LOGIN_MAP_MAX_ENTRIES) return;

  const oldest = [...loginAttempts.entries()]
    .sort((a, b) => a[1].windowStartedAt - b[1].windowStartedAt)
    .slice(0, loginAttempts.size - LOGIN_MAP_MAX_ENTRIES);

  for (const [key] of oldest) loginAttempts.delete(key);
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  pruneAttempts(now);

  const current = loginAttempts.get(key);
  if (!current || now - current.windowStartedAt > LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, windowStartedAt: now });
    return false;
  }

  current.count += 1;
  loginAttempts.set(key, current);
  return current.count > LOGIN_MAX_ATTEMPTS;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const { promoCode, password } = req.body || {};
  if (typeof promoCode !== "string" || typeof password !== "string") {
    return res.status(400).json({ ok: false, error: "Invalid payload" });
  }

  const code = promoCode.trim().toUpperCase().replace(/\s+/g, "");
  const rateLimitKey = `${clientIp(req)}:${code}`;

  if (isRateLimited(rateLimitKey)) {
    res.setHeader("Retry-After", String(Math.ceil(LOGIN_WINDOW_MS / 1000)));
    return res.status(429).json({ ok: false, error: "Too many login attempts" });
  }

  const influencer = await prisma.influencer.findUnique({
    where: { promoCode: code },
    select: { id: true, passwordHash: true, isActive: true, name: true, promoCode: true },
  });

  if (!influencer || !influencer.isActive) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, influencer.passwordHash);
  if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

  loginAttempts.delete(rateLimitKey);
  await createInfluencerSession(res, influencer.id);
  return res.json({
    ok: true,
    influencer: {
      id: influencer.id,
      name: influencer.name,
      promoCode: influencer.promoCode,
    },
  });
}
