// =============================================================
// Gamification service (Phase 9) — XP, streak, badges, leaderboard.
// XP events services se award hote hain (lesson complete, quiz pass, etc.)
// Badges code me defined hain (DB me sirf earned rows).
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk } from "../types";
import { notify } from "../notify";

// ---------- Badge definitions (code) ----------
export const BADGES: { key: string; label: string; emoji: string; desc: string }[] = [
  { key: "first_steps", label: "First Steps", emoji: "👣", desc: "Complete your first lesson" },
  { key: "creator", label: "Creator", emoji: "🎨", desc: "Submit your first project" },
  { key: "rising", label: "Rising Star", emoji: "⭐", desc: "Earn 100 XP" },
  { key: "committed", label: "Committed", emoji: "💪", desc: "Earn 500 XP" },
  { key: "streak7", label: "On Fire", emoji: "🔥", desc: "Keep a 7-day streak" },
  { key: "graduate", label: "Graduate", emoji: "🎓", desc: "Earn a certificate" },
];
const BADGE_MAP = new Map(BADGES.map((b) => [b.key, b]));

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function midnight(d: Date): Date {
  return new Date(dayKey(d) + "T00:00:00.000Z");
}

/** Ek badge award karo (idempotent) + notify. */
export async function awardBadge(userId: string, key: string): Promise<void> {
  const def = BADGE_MAP.get(key);
  if (!def) return;
  const existing = await prisma.userBadge.findUnique({
    where: { userId_key: { userId, key } },
    select: { id: true },
  });
  if (existing) return;
  await prisma.userBadge.create({ data: { userId, key } }).catch(() => null);
  await notify({
    userId,
    type: "certificate",
    title: `${def.emoji} Badge unlocked: ${def.label}`,
    body: def.desc,
    link: "/student",
  }).catch(() => null);
}

/** XP add karo + XP-based badges check karo. */
export async function awardXp(userId: string, amount: number): Promise<void> {
  if (amount <= 0) return;
  const user = await prisma.user
    .update({ where: { id: userId }, data: { xp: { increment: amount } }, select: { xp: true } })
    .catch(() => null);
  if (!user) return;
  if (user.xp >= 100) await awardBadge(userId, "rising");
  if (user.xp >= 500) await awardBadge(userId, "committed");
}

/**
 * Daily streak update — kisi bhi activity par call karo.
 * Aaj already active -> no change; kal active tha -> +1; warna reset to 1.
 */
export async function touchStreak(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { streakDays: true, lastActiveOn: true } });
  if (!user) return;

  const today = midnight(new Date());
  const last = user.lastActiveOn ? midnight(user.lastActiveOn) : null;
  if (last && dayKey(last) === dayKey(today)) return; // aaj already counted

  let streak = 1;
  if (last) {
    const diffDays = Math.round((today.getTime() - last.getTime()) / 86400000);
    streak = diffDays === 1 ? user.streakDays + 1 : 1;
  }

  await prisma.user.update({ where: { id: userId }, data: { streakDays: streak, lastActiveOn: today } });
  if (streak >= 7) await awardBadge(userId, "streak7");
}

// ---------- Read ----------

export async function getMyStats(userId: string) {
  // Activity touch (dashboard khulne par streak update).
  await touchStreak(userId).catch(() => null);

  const [user, earned, rank] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { xp: true, streakDays: true } }),
    prisma.userBadge.findMany({ where: { userId }, select: { key: true } }),
    prisma.user.count({ where: { role: "STUDENT", xp: { gt: (await prisma.user.findUnique({ where: { id: userId }, select: { xp: true } }))?.xp ?? 0 } } }),
  ]);

  const earnedKeys = new Set(earned.map((e) => e.key));
  const badges = BADGES.map((b) => ({ ...b, earned: earnedKeys.has(b.key) }));

  return serviceOk({
    xp: user?.xp ?? 0,
    streakDays: user?.streakDays ?? 0,
    rank: rank + 1, // kitne log aage hain + 1
    badges,
  });
}

export async function getLeaderboard(userId: string) {
  const top = await prisma.user.findMany({
    where: { role: "STUDENT", xp: { gt: 0 } },
    orderBy: { xp: "desc" },
    take: 10,
    select: { id: true, name: true, xp: true, streakDays: true },
  });
  return serviceOk({
    leaderboard: top.map((u, i) => ({
      rank: i + 1,
      name: u.name,
      xp: u.xp,
      streakDays: u.streakDays,
      isMe: u.id === userId,
    })),
  });
}
