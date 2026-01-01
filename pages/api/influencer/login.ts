import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { createInfluencerSession } from "../../../lib/influencerAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { promoCode, password } = req.body || {};
  if (typeof promoCode !== "string" || typeof password !== "string") {
    return res.status(400).json({ ok: false, error: "Invalid payload" });
  }

  const code = promoCode.trim().toUpperCase().replace(/\s+/g, "");
  const influencer = await prisma.influencer.findUnique({
    where: { promoCode: code },
    select: { id: true, passwordHash: true, isActive: true, name: true, promoCode: true },
  });

  if (!influencer || !influencer.isActive) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, influencer.passwordHash);
  if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

  await createInfluencerSession(res, influencer.id);
  return res.json({ ok: true, influencer: { id: influencer.id, name: influencer.name, promoCode: influencer.promoCode } });
}
