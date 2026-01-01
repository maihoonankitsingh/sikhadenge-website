import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";

function normPromo(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const id = req.query.id;
  if (typeof id !== "string" || !id.trim()) {
    return res.status(400).json({ ok: false, error: "Invalid id" });
  }

  if (req.method === "PATCH") {
    const { name, email, promoCode, isActive, newPassword } = req.body || {};

    const data: any = {};

    if (typeof name === "string") data.name = name.trim();
    if (typeof email === "string") data.email = email.trim() ? email.trim() : null;
    if (typeof promoCode === "string") data.promoCode = normPromo(promoCode);
    if (typeof isActive === "boolean") data.isActive = isActive;

    if (typeof newPassword === "string" && newPassword.length > 0) {
      if (newPassword.length < 6) return res.status(400).json({ ok: false, error: "Password min 6 chars" });
      data.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    try {
      const updated = await prisma.influencer.update({
        where: { id },
        data,
        select: { id: true, name: true, email: true, promoCode: true, isActive: true, updatedAt: true },
      });
      return res.json({ ok: true, item: updated });
    } catch (e: any) {
      const msg = String(e?.message || "");
      if (msg.includes("Record to update not found")) {
        return res.status(404).json({ ok: false, error: "Not found" });
      }
      if (msg.includes("Unique constraint") || msg.includes("unique")) {
        return res.status(409).json({ ok: false, error: "Promo code or email already exists" });
      }
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }

  return res.status(405).json({ ok: false });
}
