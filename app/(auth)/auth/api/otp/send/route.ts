import { NextResponse } from "next/server";
import { prisma } from "../../../../../../src/server/db";
import { sendOtp } from "../../../../../../src/server/auth/otp";

export async function POST(req: Request) {
  const { email } = await req.json();
  const e = String(email || "").trim().toLowerCase();

  if (!e || !e.includes("@")) {
    return NextResponse.json({ ok: false, reason: "INVALID_EMAIL" }, { status: 400 });
  }

  const allowed = await prisma.sdAllowedEmail.findUnique({ where: { email: e } });
  if (!allowed) {
    return NextResponse.json({ ok: false, reason: "NOT_ALLOWED" }, { status: 403 });
  }

  await sendOtp(e);
  return NextResponse.json({ ok: true });
}
