import { NextResponse } from "next/server";
import { prisma } from "../../../../../../src/server/db";
import { verifyOtp } from "../../../../../../src/server/auth/otp";
import { createSession } from "../../../../../../src/server/auth/session";
import { ROLE_KEYS } from "../../../../../../src/server/auth/constants";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  const e = String(email || "").trim().toLowerCase();
  const o = String(otp || "").trim();

  const allowed = await prisma.sdAllowedEmail.findUnique({ where: { email: e } });
  if (!allowed) {
    return NextResponse.json({ ok: false, reason: "NOT_ALLOWED" }, { status: 403 });
  }

  const v = await verifyOtp(e, o);
  if (!v.ok) return NextResponse.json(v, { status: 400 });

  const now = new Date();
  const user = await prisma.sdUser.upsert({
    where: { email: e },
    update: { emailVerifiedAt: now },
    create: { email: e, phone: `email:${e}`, emailVerifiedAt: now },
  });

  let userRole = await prisma.sdUserRole.findFirst({
    where: { userId: user.id },
    include: { role: true },
  });

  if (!userRole) {
    const role = await prisma.sdRole.findUnique({ where: { key: ROLE_KEYS.EMPLOYEE } });
    if (role) {
      userRole = await prisma.sdUserRole.create({
        data: { userId: user.id, roleId: role.id },
        include: { role: true },
      });
    }
  }

  await createSession(user.id);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      role: userRole?.role?.key || ROLE_KEYS.EMPLOYEE,
    },
  });
}
