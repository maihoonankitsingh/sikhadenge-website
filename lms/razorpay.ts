// =============================================================
// Razorpay helper — orders create + payment signature verify.
// REST API use karte hain (koi npm SDK nahi). Sirf server-side.
//
// Env chahiye: RAZORPAY_KEY_ID, RAZORPAY_SECRET
// (Frontend ko sirf KEY_ID milta hai; SECRET kabhi client pe mat bhejo.)
// =============================================================

import crypto from "crypto";

const RZP_API = "https://api.razorpay.com/v1";

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_SECRET);
}

export function razorpayKeyId(): string {
  return process.env.RAZORPAY_KEY_ID || "";
}

function authHeader(): string {
  const token = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`).toString("base64");
  return `Basic ${token}`;
}

export type RazorpayOrder = { id: string; amount: number; currency: string; status: string };

/** amountInr rupees me; Razorpay paise leta hai (x100). */
export async function createOrder(amountInr: number, receipt: string, notes: Record<string, string>): Promise<RazorpayOrder> {
  const res = await fetch(`${RZP_API}/orders`, {
    method: "POST",
    headers: { Authorization: authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Math.round(amountInr * 100),
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Razorpay order failed (${res.status}): ${text.slice(0, 200)}`);
  }
  return (await res.json()) as RazorpayOrder;
}

/**
 * Payment success ke baad signature verify karo:
 *   HMAC_SHA256(order_id + "|" + payment_id, SECRET) === razorpay_signature
 * Ye confirm karta hai ki payment sach me Razorpay se hua (tampered nahi).
 */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_SECRET || "";
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
