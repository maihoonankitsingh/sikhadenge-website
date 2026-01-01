import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

function normPromo(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  if (req.method === "GET") {
    const list = await prisma.influencer.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        promoCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { leads: true } },
      },
    });
    return res.json({ ok: true, items: list });
  }

  if (req.method === "POST") {
    const { name, email, promoCode, password } = req.body || {};
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ ok: false, error: "Name required" });
    }
    if (typeof promoCode !== "string" || promoCode.trim().length < 3) {
      return res.status(400).json({ ok: false, error: "Promo code required" });
    }
    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ ok: false, error: "Password min 6 chars" });
    }

    const pc = normPromo(promoCode);
    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const created = await prisma.influencer.create({
        data: {
          name: name.trim(),
          email: typeof email === "string" && email.trim() ? email.trim() : null,
          promoCode: pc,
          passwordHash,
          isActive: true,
        },
        select: { id: true, name: true, email: true, promoCode: true, isActive: true, createdAt: true },
      });
      return res.json({ ok: true, item: created });
    } catch (e: any) {
      const msg = String(e?.message || "");
      if (msg.includes("Unique constraint") || msg.includes("unique")) {
        return res.status(409).json({ ok: false, error: "Promo code or email already exists" });
      }
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }

  return res.status(405).json({ ok: false });
}
