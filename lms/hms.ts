// =============================================================
// 100ms (HMS) helper — live class rooms banane ke liye.
//
// Env chahiye:
//   HMS_ACCESS_KEY   HMS_SECRET   HMS_TEMPLATE_ID   HMS_SUBDOMAIN
//   HMS_WEBHOOK_SECRET (optional, webhook verify ke liye)
//
// Ye sirf server-side use hota hai. Client video 100ms ke hosted
// "prebuilt" room (room-code URL) se chalta hai — koi heavy front-end
// SDK bundle karne ki zaroorat nahi, aur recording 100ms khud karta hai.
// =============================================================

import crypto from "crypto";
import jwt from "jsonwebtoken";

const HMS_API = "https://api.100ms.live/v2";

export function isHmsConfigured(): boolean {
  return Boolean(process.env.HMS_ACCESS_KEY && process.env.HMS_SECRET && process.env.HMS_TEMPLATE_ID);
}

/** 100ms REST API call karne ke liye short-lived management token (JWT). */
function managementToken(): string {
  const accessKey = process.env.HMS_ACCESS_KEY!;
  const secret = process.env.HMS_SECRET!;
  return jwt.sign(
    {
      access_key: accessKey,
      type: "management",
      version: 2,
      jti: crypto.randomUUID(),
    },
    secret,
    { algorithm: "HS256", expiresIn: "1h" }
  );
}

async function hmsFetch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${HMS_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${managementToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`100ms ${path} failed (${res.status}): ${text.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}

export type HmsRoom = { id: string; name: string };

/** Ek naya live room banata hai (template me recording enabled hona chahiye). */
export async function createRoom(name: string, description?: string): Promise<HmsRoom> {
  return hmsFetch<HmsRoom>("/rooms", {
    name,
    description: description || name,
    template_id: process.env.HMS_TEMPLATE_ID,
  });
}

export type RoomCode = { code: string; role: string; enabled: boolean };

/** Room ke liye har role ka join-code banata hai. */
export async function createRoomCodes(roomId: string): Promise<RoomCode[]> {
  const out = await hmsFetch<{ data: RoomCode[] }>(`/room-codes/room/${roomId}`, {});
  return out.data || [];
}

/** Codes me se host (teacher) aur guest (student) code chhaant kar deta hai. */
export function pickCodes(codes: RoomCode[]): { hostCode?: string; guestCode?: string } {
  const host = codes.find((c) => /host|teacher|broadcaster|speaker/i.test(c.role));
  const guest = codes.find((c) => /guest|student|viewer|listener/i.test(c.role));
  return {
    hostCode: host?.code || codes[0]?.code,
    guestCode: guest?.code || codes[codes.length - 1]?.code,
  };
}

/** Room-code se 100ms hosted prebuilt room ka URL. */
export function prebuiltUrl(code: string): string {
  const sub = (process.env.HMS_SUBDOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${sub}/meeting/${code}`;
}

/**
 * Webhook ki authenticity check (optional). 100ms webhook config me jo
 * passcode/secret set karo, wahi HMS_WEBHOOK_SECRET me rakho.
 */
export function verifyWebhook(headerSecret: string | undefined): boolean {
  const expected = process.env.HMS_WEBHOOK_SECRET;
  if (!expected) return true; // configured nahi -> skip (dev)
  if (!headerSecret) return false;
  const a = Buffer.from(headerSecret);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
