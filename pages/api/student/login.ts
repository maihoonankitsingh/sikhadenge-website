import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { createStudentSession } from "../../../lib/studentAuth";

function normPhone(v: string) {
  return v.replace(/[^0-9]/g, "").slice(-10);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { identifier, password } = req.body || {};
  if (typeof identifier !== "string" || typeof password !== "string") {
    return res.status(400).json({ ok: false, error: "Invalid payload" });
  }

  const id = identifier.trim();
  const isEmail = id.includes("@");
  const where = isEmail ? { email: id.toLowerCase() } : { phone: normPhone(id) };

  const user = await prisma.user.findUnique({
    where,
    select: { id: true, name: true, email: true, phone: true, role: true, passwordHash: true, isActive: true },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

  await createStudentSession(res, user.id);
  return res.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
  });
}
