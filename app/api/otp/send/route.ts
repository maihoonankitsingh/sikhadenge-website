export const revalidate = 0;
import crypto from "crypto";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizePhoneIN(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function randomOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hmac(secret: string, text: string) {
  return crypto.createHmac("sha256", secret).update(text, "utf8").digest("hex");
}

async function sendOtpEmail(toEmail: string, code: string) {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const from = process.env.SMTP_FROM || "";

  if (!host || !user || !pass || !from) throw new Error("SMTP_ENV_MISSING");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: toEmail,
    subject: "Your Sikhadenge verification code",
    text: `Your verification code is: ${code}\nIt expires in 10 minutes.`,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const phoneRaw = String(body.phone || "");
    const phone = normalizePhoneIN(phoneRaw);

    if (!phone || phone.length < 10) {
      return Response.json({ ok: false, error: "PHONE_INVALID" }, { status: 400 });
    }

    const secret = (process.env.OTP_HASH_SECRET || "").trim();
    if (!secret || secret.length < 16) {
      return Response.json({ ok: false, error: "OTP_HASH_SECRET_MISSING" }, { status: 500 });
    }

    const ttlMin = Number(process.env.OTP_TTL_MINUTES || "10");
    const maxAttempts = Number(process.env.OTP_MAX_ATTEMPTS || "5");
    const expiresAt = new Date(Date.now() + ttlMin * 60 * 1000);

    const code = randomOtp();
    const codeHash = hmac(secret, `${phone}:${code}`);

    // Ensure lead row exists (name/email nullable as per your DB)// Store OTP (overwrite any existing for this phone)
    await prisma.phoneOtp.deleteMany({ where: { phone } });
    await prisma.phoneOtp.create({
      data: { id: crypto.randomUUID(), phone, codeHash, expiresAt, attempts: 0 },
    });

    const channel = (process.env.OTP_CHANNEL || "twilio").toLowerCase();

    // EMAIL channel: send to fixed ops inbox (since you are collecting only phone in form)
    if (channel === "email") {
      const toEmail = (process.env.OTP_DEBUG_TO || process.env.SMTP_USER || "").trim();
      if (!toEmail) {
        return Response.json({ ok: false, error: "OTP_EMAIL_TO_MISSING" }, { status: 500 });
      }
      await sendOtpEmail(toEmail, code);
      return Response.json({ ok: true, channel: "email" });
    }

    // Otherwise (default): keep old behavior error until SMS provider wired
    return Response.json({ ok: false, error: "TWILIO_ENV_MISSING" }, { status: 500 });
  } catch (e: any) {
    return Response.json(
      { ok: false, error: e?.message || "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
