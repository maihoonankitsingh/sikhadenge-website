import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export const COOKIE_NAME = "sd_admin";
const ONE_DAY_SEC = 60 * 60 * 24;

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function hmac(data: string, secret: string) {
  return base64url(crypto.createHmac("sha256", secret).update(data).digest());
}

function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export type AdminSession = {
  sub: string; // admin username
  iat: number;
  exp: number;
};

export function signSession(
  payload: Omit<AdminSession, "iat" | "exp">,
  ttlSec = ONE_DAY_SEC
) {
  const secret = process.env.ADMIN_COOKIE_SECRET || "";
  if (!secret || secret.length < 24) throw new Error("ADMIN_COOKIE_SECRET missing/too short");

  const now = Math.floor(Date.now() / 1000);
  const session: AdminSession = { ...payload, iat: now, exp: now + ttlSec };

  const body = base64url(JSON.stringify(session));
  const sig = hmac(body, secret);
  return `${body}.${sig}`;
}

export function verifySession(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const secret = process.env.ADMIN_COOKIE_SECRET || "";
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [body, sig] = parts;
  const expected = hmac(body, secret);
  if (!timingSafeEqual(sig, expected)) return null;

  try {
    const json = Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const session = JSON.parse(json) as AdminSession;

    const now = Math.floor(Date.now() / 1000);
    if (!session?.sub || !session?.exp) return null;
    if (session.exp <= now) return null;

    return session;
  } catch {
    return null;
  }
}

export function getCookie(req: NextApiRequest, name: string) {
  const raw = req.headers.cookie || "";
  const parts = raw.split(";").map((x) => x.trim());
  for (const p of parts) {
    if (p.startsWith(name + "=")) return decodeURIComponent(p.slice(name.length + 1));
  }
  return null;
}

export function setCookie(res: NextApiResponse, name: string, value: string, maxAgeSec: number) {
  const secure = process.env.NODE_ENV === "production";
  const cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAgeSec}`,
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  res.setHeader("Set-Cookie", cookie);
}

export function clearCookie(res: NextApiResponse, name: string) {
  const secure = process.env.NODE_ENV === "production";
  const cookie = [
    `${name}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  res.setHeader("Set-Cookie", cookie);
}

export function getAdminSession(req: NextApiRequest): AdminSession | null {
  const token = getCookie(req, COOKIE_NAME);
  return verifySession(token);
}

export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const session = getAdminSession(req);
  if (!session) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return null;
  }
  return session;
}
