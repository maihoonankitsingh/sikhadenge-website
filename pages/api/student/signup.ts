import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { createStudentSession } from "../../../lib/studentAuth";

function normPhone(v: string) {
  return v.replace(/[^0-9]/g, "").slice(-10);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { name, email, phone, password } = req.body || {};
  if (typeof name !== "string" || typeof password !== "string") {
    return res.status(400).json({ ok: false, error: "Invalid payload" });
  }
  if (name.trim().length < 2) return res.status(400).json({ ok: false, error: "Name too short" });
  if (password.length < 6) return res.status(400).json({ ok: false, error: "Password must be 6+ characters" });

  const emailNorm = typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;
  const phoneNorm = typeof phone === "string" && phone.trim() ? normPhone(phone) : null;

  if (!emailNorm && !phoneNorm) {
    return res.status(400).json({ ok: false, error: "Email or phone required" });
  }
  if (phoneNorm && phoneNorm.length !== 10) {
    return res.status(400).json({ ok: false, error: "Invalid phone number" });
  }

  // Duplicate check
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        ...(emailNorm ? [{ email: emailNorm }] : []),
        ...(phoneNorm ? [{ phone: phoneNorm }] : []),
      ],
    },
    select: { id: true },
  });
  if (existing) {
    return res.status(409).json({ ok: false, error: "Account already exists. Please login." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: emailNorm,
      phone: phoneNorm,
      passwordHash,
      role: "STUDENT",
    },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });

  await createStudentSession(res, user.id);
  return res.json({ ok: true, user });
}
