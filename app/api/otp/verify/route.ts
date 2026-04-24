export const revalidate = 0;
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normPhone(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
}

function hashOtp(phone: string, otp: string) {
  const secret = (process.env.OTP_HASH_SECRET || "").trim();
  if (!secret || secret.includes("CHANGE_ME")) throw new Error("OTP_HASH_SECRET missing/weak");
  return crypto.createHmac("sha256", secret).update(`${phone}:${otp}`).digest("hex");
}

async function pushNeoDoveIfEnabled(lead: any) {
  const endpoint = (process.env.NEODOVE_ENDPOINT || "").trim();
  if (!endpoint) return;

  const payload = {
    name: lead?.name || "",
    mobile: lead?.phone || "",
    email: lead?.email || "",
    detail1: lead?.source || "website",
    detail2: lead?.page || "/",
  };

  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const phone = normPhone(body.phone || "");
    const code = String(body.code || "").trim();

    if (!phone || phone.length !== 10) return Response.json({ ok: false, error: "INVALID_PHONE" }, { status: 400 });
    if (!/^\d{6}$/.test(code)) return Response.json({ ok: false, error: "INVALID_CODE" }, { status: 400 });

    const maxAttempts = Number(process.env.OTP_MAX_ATTEMPTS || "5");

    const otpRow = await prisma.phoneOtp.findFirst({
      where: { phone },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRow) return Response.json({ ok: false, error: "OTP_NOT_FOUND" }, { status: 404 });

    if (otpRow.expiresAt.getTime() < Date.now()) {
      await prisma.phoneOtp.deleteMany({ where: { phone } });
      return Response.json({ ok: false, error: "OTP_EXPIRED" }, { status: 400 });
    }

    if (otpRow.attempts >= maxAttempts) {
      await prisma.phoneOtp.deleteMany({ where: { phone } });
      return Response.json({ ok: false, error: "OTP_MAX_ATTEMPTS" }, { status: 429 });
    }

    const got = hashOtp(phone, code);
    if (got !== otpRow.codeHash) {
      await prisma.phoneOtp.update({ where: { id: otpRow.id }, data: { attempts: { increment: 1 } } });
      return Response.json({ ok: false, error: "OTP_WRONG" }, { status: 400 });
    }

    await prisma.phoneOtp.deleteMany({ where: { phone } });

      const lead = { phone, phoneVerified: true, source: "website", page: "/" } as any;
      await pushNeoDoveIfEnabled(lead);

    return Response.json({ ok: true, phoneVerified: true });
  } catch (e: any) {
    return Response.json({ ok: false, error: "VERIFY_FAILED", detail: String(e?.message || e) }, { status: 500 });
  }
}
