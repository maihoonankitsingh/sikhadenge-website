import { prisma } from "../db";
import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_TTL_DAYS, type RoleKey } from "./constants";
import { randomToken, sha256 } from "./crypto";

export async function createSession(userId: string) {
  const token = randomToken(32);
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.sdSession.create({
    data: { userId, tokenHash, expiresAt },
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: expiresAt,
  });

  return { ok: true as const };
}

export async function getSessionUser() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = sha256(token);
  const now = new Date();

  const session = await prisma.sdSession.findFirst({
    where: { tokenHash, expiresAt: { gt: now } },
    include: { user: { include: { roles: { include: { role: true } } } } },
  });

  if (!session) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    roles: session.user.roles.map((ur) => ur.role.key as RoleKey),
  };
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;

  if (token) {
    const tokenHash = sha256(token);
    await prisma.sdSession.deleteMany({ where: { tokenHash } });
  }

  jar.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: new Date(0),
  });

  return { ok: true as const };
}
