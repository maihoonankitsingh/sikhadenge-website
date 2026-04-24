import { notFound, redirect } from "next/navigation";
import { ROLE_KEYS, type RoleKey } from "./constants";
import { getSessionUser } from "./session";

export async function requireSession(nextPath?: string) {
  const user = await getSessionUser();
  if (!user) {
    const nextParam = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    redirect(`/auth/login${nextParam}`);
  }
  return user;
}

export async function requireRole(allowed: RoleKey[] | RoleKey, nextPath?: string) {
  const user = await requireSession(nextPath);
  const allowList = Array.isArray(allowed) ? allowed : [allowed];
  const ok = user.roles.some((role) => allowList.includes(role));
  if (!ok) {
    notFound();
  }
  return user;
}

export async function requireDashboardAccess(nextPath: string) {
  if (process.env.FEATURE_DASHBOARD !== "true") notFound();
  return requireRole([ROLE_KEYS.SUPER_ADMIN, ROLE_KEYS.ADMIN, ROLE_KEYS.EMPLOYEE], nextPath);
}
