// =============================================================
// Notifications service (Phase 6) — student ke in-app notifications.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk } from "../types";

export async function listNotifications(userId: string) {
  const [items, unread] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, type: true, title: true, body: true, link: true, read: true, createdAt: true },
    }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);
  return serviceOk({ items, unread });
}

/** id do to ek, "all" do to sab read mark. */
export async function markRead(userId: string, id: unknown) {
  if (id === "all") {
    await prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
  } else if (typeof id === "string" && id) {
    await prisma.notification.updateMany({ where: { id, userId }, data: { read: true } });
  }
  return serviceOk({ ok: true });
}
