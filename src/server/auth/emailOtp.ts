import crypto from "crypto";
import nodemailer from "nodemailer";
import { prisma } from "../db/client";

const OTP_TTL_MIN = 10;

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function isOfficialEmployeeEmail(email: string) {
  const e = (email || "").trim().toLowerCase();
  return /^[a-z0-9._%+-]+@sikhadenge\.in$/.test(e);
}

function makeOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmployeeOtp(emailRaw: string) {
  const email = (emailRaw || "").trim().toLowerCase();
  if (!isOfficialEmployeeEmail(email)) return { ok: false as const, error: "invalid_domain" as const };

  const code = makeOtp();
  const codeHash = sha256(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000);

  await prisma.sdEmailOtp.updateMany({
    where: { email, consumedAt: null, expiresAt: { gt: new Date() } },
    data: { expiresAt: new Date(Date.now() - 1000) },
  });

  const row = await prisma.sdEmailOtp.create({ data: { email, codeHash, expiresAt } });

  const transport = getTransport();
  const from = process.env.SMTP_FROM || "Sikhadenge <no-reply@sikhadenge.in>";

  if (!transport) {
    console.log("[EMPLOYEE_OTP_FALLBACK]", { email, code });
    return { ok: true as const, otpId: row.id, fallback: true as const };
  }

  await transport.sendMail({
    from,
    to: email,
    subject: "Sikhadenge Dashboard OTP",
    text: `Your OTP is ${code}. Valid for ${OTP_TTL_MIN} minutes.`,
  });

  return { ok: true as const, otpId: row.id, fallback: false as const };
}

export async function verifyEmployeeOtp(emailRaw: string, otpId: string, codeRaw: string) {
  const email = (emailRaw || "").trim().toLowerCase();
  const code = (codeRaw || "").trim();

  if (!isOfficialEmployeeEmail(email)) return { ok: false as const, error: "invalid_domain" as const };
  if (!otpId) return { ok: false as const, error: "invalid_otp" as const };
  if (!/^\d{6}$/.test(code)) return { ok: false as const, error: "invalid_otp" as const };

  const row = await prisma.sdEmailOtp.findUnique({ where: { id: otpId } });
  if (!row || row.email !== email) return { ok: false as const, error: "invalid_otp" as const };
  if (row.consumedAt) return { ok: false as const, error: "used" as const };
  if (row.expiresAt <= new Date()) return { ok: false as const, error: "expired" as const };
  if (row.attempts >= 5) return { ok: false as const, error: "locked" as const };

  if (sha256(code) !== row.codeHash) {
    await prisma.sdEmailOtp.update({ where: { id: row.id }, data: { attempts: { increment: 1 } } });
    return { ok: false as const, error: "invalid_otp" as const };
  }

  await prisma.sdEmailOtp.update({ where: { id: row.id }, data: { consumedAt: new Date() } });
  return { ok: true as const };
}

export function normalizeEmployeeEmail(e: string) {
  return (e || "").trim().toLowerCase();
}
