// =============================================================
// User service — signup & login ki business logic.
// Yahan sirf data logic hai (koi HTTP/cookie nahi). Route isko call
// karke session set karta hai. Isse logic testable + reusable rehti hai.
// =============================================================

import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { normPhone } from "../http";
import { serviceOk, serviceFail, type PublicUser, type ServiceResult } from "../types";

const BCRYPT_ROUNDS = 10;

export type SignupInput = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  password?: unknown;
};

export type LoginInput = {
  identifier?: unknown;
  password?: unknown;
};

/** Naya student account banata hai. Returns PublicUser ya error. */
export async function signupStudent(input: SignupInput): Promise<ServiceResult<PublicUser>> {
  const { name, email, phone, password } = input;

  if (typeof name !== "string" || typeof password !== "string") {
    return serviceFail(400, "Invalid payload");
  }
  if (name.trim().length < 2) return serviceFail(400, "Name too short");
  if (password.length < 6) return serviceFail(400, "Password must be 6+ characters");

  const emailNorm = typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;
  const phoneNorm = typeof phone === "string" && phone.trim() ? normPhone(phone) : null;

  if (!emailNorm && !phoneNorm) return serviceFail(400, "Email or phone required");
  if (phoneNorm && phoneNorm.length !== 10) return serviceFail(400, "Invalid phone number");

  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        ...(emailNorm ? [{ email: emailNorm }] : []),
        ...(phoneNorm ? [{ phone: phoneNorm }] : []),
      ],
    },
    select: { id: true },
  });
  if (existing) return serviceFail(409, "Account already exists. Please login.");

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const user = await prisma.user.create({
    data: { name: name.trim(), email: emailNorm, phone: phoneNorm, passwordHash, role: "STUDENT" },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });

  return serviceOk(user as PublicUser);
}

/** Email ya phone + password se login verify karta hai. */
export async function loginStudent(input: LoginInput): Promise<ServiceResult<PublicUser>> {
  const { identifier, password } = input;
  if (typeof identifier !== "string" || typeof password !== "string") {
    return serviceFail(400, "Invalid payload");
  }

  const id = identifier.trim();
  const where = id.includes("@") ? { email: id.toLowerCase() } : { phone: normPhone(id) };

  const user = await prisma.user.findUnique({
    where,
    select: { id: true, name: true, email: true, phone: true, role: true, passwordHash: true, isActive: true },
  });

  if (!user || !user.isActive) return serviceFail(401, "Invalid credentials");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return serviceFail(401, "Invalid credentials");

  const { passwordHash, isActive, ...publicUser } = user;
  return serviceOk(publicUser as PublicUser);
}
