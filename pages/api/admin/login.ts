import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { signSession, setCookie, COOKIE_NAME } from "../../../lib/auth";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;
const LOGIN_MAP_MAX_ENTRIES = 2_000;

type LoginAttempt = { count: number; windowStartedAt: number };
type LoginRateLimitState = Map<string, LoginAttempt>;

type GlobalWithAdminLoginRateLimit = typeof globalThis & {
  __sdAdminLoginAttempts?: LoginRateLimitState;
};

const globalRateLimit = globalThis as GlobalWithAdminLoginRateLimit;
const loginAttempts =
  globalRateLimit.__sdAdminLoginAttempts ??
  (globalRateLimit.__sdAdminLoginAttempts = new Map<string, LoginAttempt>());

function clientIp(req: NextApiRequest): string {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();

  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return req.socket.remoteAddress || "unknown";
}

function pruneLoginAttempts(now: number) {
  for (const [key, value] of loginAttempts) {
    if (now - value.windowStartedAt > LOGIN_WINDOW_MS) loginAttempts.delete(key);
  }

  if (loginAttempts.size <= LOGIN_MAP_MAX_ENTRIES) return;

  const oldest = [...loginAttempts.entries()]
    .sort((a, b) => a[1].windowStartedAt - b[1].windowStartedAt)
    .slice(0, loginAttempts.size - LOGIN_MAP_MAX_ENTRIES);

  for (const [key] of oldest) loginAttempts.delete(key);
}

function isLoginRateLimited(key: string): boolean {
  const now = Date.now();
  pruneLoginAttempts(now);

  const current = loginAttempts.get(key);
  if (!current || now - current.windowStartedAt > LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { count: 1, windowStartedAt: now });
    return false;
  }

  current.count += 1;
  loginAttempts.set(key, current);
  return current.count > LOGIN_MAX_ATTEMPTS;
}

function clearLoginAttempts(key: string) {
  loginAttempts.delete(key);
}

function constantTimeEqual(input: string, expected: string): boolean {
  const a = crypto.createHash("sha256").update(input, "utf8").digest();
  const b = crypto.createHash("sha256").update(expected, "utf8").digest();
  return crypto.timingSafeEqual(a, b);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const { username, password } = req.body || {};
  const adminUser = (process.env.ADMIN_USERNAME || "").trim();
  const adminPass = (process.env.ADMIN_PASSWORD || "").trim();

  if (!adminUser || !adminPass) {
    return res.status(500).json({ ok: false, error: "Admin not configured" });
  }

  const rateLimitKey = clientIp(req);
  if (isLoginRateLimited(rateLimitKey)) {
    res.setHeader("Retry-After", String(Math.ceil(LOGIN_WINDOW_MS / 1000)));
    return res.status(429).json({ ok: false, error: "Too many login attempts" });
  }

  const suppliedUser = typeof username === "string" ? username.trim() : "";
  const suppliedPass = typeof password === "string" ? password : "";
  const validUser = constantTimeEqual(suppliedUser, adminUser);
  const validPass = constantTimeEqual(suppliedPass, adminPass);

  if (!validUser || !validPass) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  clearLoginAttempts(rateLimitKey);

  const token = signSession({ sub: adminUser }, 60 * 60 * 24 * 7);
  setCookie(res, COOKIE_NAME, token, 60 * 60 * 24 * 7);

  return res.json({ ok: true });
}
