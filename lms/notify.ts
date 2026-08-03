// =============================================================
// Notification helper — ek jagah se sab notifications.
//  1. In-app notification (DB row) — hamesha banti hai (bell me dikhti).
//  2. Email (Resend) — RESEND_API_KEY ho to best-effort bhejta hai.
//  3. WhatsApp (Meta Cloud API) — WHATSAPP_TOKEN + WHATSAPP_PHONE_ID ho to.
//
// Sab external sends "best-effort" hain — fail ho to bhi flow nahi rukta.
// Naya event notify karna ho to bas notify() call karo.
// =============================================================

import { prisma } from "../lib/prisma";

export type NotifyInput = {
  userId: string;
  type: string; // enrollment | payment | recording | grade | doubt | certificate | live
  title: string;
  body?: string;
  link?: string;
};

export async function notify(input: NotifyInput): Promise<void> {
  // 1. In-app (kabhi fail na kare flow).
  await prisma.notification
    .create({
      data: { userId: input.userId, type: input.type, title: input.title, body: input.body || null, link: input.link || null },
    })
    .catch(() => null);

  // 2/3. External (best-effort) — user ka contact laao.
  const user = await prisma.user
    .findUnique({ where: { id: input.userId }, select: { email: true, phone: true, name: true } })
    .catch(() => null);
  if (!user) return;

  await Promise.allSettled([
    user.email ? sendEmail(user.email, input.title, input.body || input.title) : Promise.resolve(),
    user.phone ? sendWhatsApp(user.phone, `${input.title}${input.body ? `\n${input.body}` : ""}`) : Promise.resolve(),
  ]);
}

/** Ek saath multiple users ko notify (e.g. recording ready -> poori batch). */
export async function notifyMany(userIds: string[], base: Omit<NotifyInput, "userId">): Promise<void> {
  await Promise.allSettled(userIds.map((userId) => notify({ ...base, userId })));
}

// ---------- Email (Resend) ----------
async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Sikhadenge <noreply@sikhadenge.com>";
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text }),
    });
  } catch {
    /* best-effort */
  }
}

// ---------- WhatsApp (Meta Cloud API) ----------
async function sendWhatsApp(phone: string, text: string): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return;
  // 10-digit -> +91 (India default). Adjust as needed.
  const to = phone.length === 10 ? `91${phone}` : phone.replace(/[^0-9]/g, "");
  try {
    await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: text } }),
    });
  } catch {
    /* best-effort */
  }
}
