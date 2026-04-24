import { prisma } from "../db";
import { OTP_MAX_ATTEMPTS, OTP_TTL_MINUTES } from "./constants";
import { randomOtp6, sha256 } from "./crypto";

export async function sendOtp(email: string) {
  const otp = randomOtp6();
  const codeHash = sha256(`${email}:${otp}`);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await prisma.sdEmailOtp.create({
    data: { email, codeHash, expiresAt },
  });

  console.log("[AUTH_OTP]", JSON.stringify({ email, otp, expiresAt: expiresAt.toISOString() }));

  return { ok: true as const };
}

export async function verifyOtp(email: string, otp: string) {
  const now = new Date();

  const record = await prisma.sdEmailOtp.findFirst({
    where: {
      email,
      consumedAt: null,
      expiresAt: { gt: now },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return { ok: false as const, reason: "OTP_NOT_FOUND_OR_EXPIRED" };

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    return { ok: false as const, reason: "OTP_TOO_MANY_ATTEMPTS" };
  }

  const codeHash = sha256(`${email}:${otp}`);
  const matches = codeHash === record.codeHash;

  await prisma.sdEmailOtp.update({
    where: { id: record.id },
    data: {
      attempts: { increment: 1 },
      consumedAt: matches ? now : null,
    },
  });

  if (!matches) return { ok: false as const, reason: "OTP_INVALID" };

  return { ok: true as const };
}
