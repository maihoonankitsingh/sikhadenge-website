import crypto from "crypto";
import { appendFile } from "fs/promises";

export const runtime = "nodejs"; // crypto + fs ke liye

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Missing RAZORPAY_WEBHOOK_SECRET", { status: 500 });
  }

  // Raw body required for signature verification
  const rawBody = await req.text();

  const signature =
    req.headers.get("x-razorpay-signature") ||
    req.headers.get("X-Razorpay-Signature") ||
    "";

  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (!signature || !safeEqual(signature, expected)) {
    return new Response("Invalid signature", { status: 401 });
  }

  // Parse event
  let payload: any = null;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Minimal storage (JSONL log). DB mapping next step me karenge.
  // File: /tmp/razorpay_webhooks.jsonl
  try {
    await appendFile(
      "/tmp/razorpay_webhooks.jsonl",
      JSON.stringify({
        receivedAt: new Date().toISOString(),
        event: payload?.event,
        account_id: payload?.account_id,
        contains: {
          order_id: payload?.payload?.payment?.entity?.order_id,
          payment_id: payload?.payload?.payment?.entity?.id,
          status: payload?.payload?.payment?.entity?.status,
          amount: payload?.payload?.payment?.entity?.amount,
          currency: payload?.payload?.payment?.entity?.currency,
        },
        raw: payload,
      }) + "\n",
      "utf8"
    );
  } catch {
    // ignore logging failure; still return 200 to stop retries
  }

  return Response.json({ ok: true });
}
