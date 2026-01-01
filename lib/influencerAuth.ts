import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prisma";

const COOKIE_NAME = "sd_influencer";
const SESSION_DAYS = 30;

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function newToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createInfluencerSession(res: NextApiResponse, influencerId: string) {
  const token = newToken();
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.influencerSession.create({
    data: { influencerId, tokenHash, expiresAt },
  });

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}; Secure`
  );
}

export async function clearInfluencerSession(req: NextApiRequest, res: NextApiResponse) {
  const token = readCookie(req, COOKIE_NAME);
  if (token) {
    const tokenHash = sha256(token);
    await prisma.influencerSession.deleteMany({ where: { tokenHash } }).catch(() => null);
  }
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`
  );
}

export async function requireInfluencer(req: NextApiRequest, res: NextApiResponse) {
  const token = readCookie(req, COOKIE_NAME);
  if (!token) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return null;
  }

  const tokenHash = sha256(token);
  const session = await prisma.influencerSession.findUnique({
    where: { tokenHash },
    select: { influencerId: true, expiresAt: true },
  });

  if (!session || session.expiresAt.getTime() < Date.now()) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return null;
  }

  const influencer = await prisma.influencer.findUnique({
    where: { id: session.influencerId },
    select: { id: true, name: true, email: true, promoCode: true, isActive: true },
  });

  if (!influencer || !influencer.isActive) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return null;
  }

  return influencer;
}

function readCookie(req: NextApiRequest, name: string) {
  const raw = req.headers.cookie || "";
  const parts = raw.split(";").map((p) => p.trim());
  for (const p of parts) {
    if (!p) continue;
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    const k = p.slice(0, eq);
    if (k === name) return decodeURIComponent(p.slice(eq + 1));
  }
  return "";
}
