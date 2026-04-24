export const revalidate = 0;
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hmacSha256Hex(secret: string, body: Buffer) {
  return crypto.createHmac("sha256", secret).update(body).digest("hex");
}
function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: Request) {
  const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || "").trim();
  if (!secret) return Response.json({ ok: false, reason: "secret_missing" }, { status: 500 });

  const sig = (req.headers.get("x-razorpay-signature") || "").trim();
  if (!sig) return Response.json({ ok: false, reason: "sig_missing" }, { status: 400 });

  const rawText = await req.text();
  const rawBody = Buffer.from(rawText, "utf8");

  const expected = hmacSha256Hex(secret, rawBody);
  if (!safeEqual(sig, expected)) {
    return Response.json({ ok: false, reason: "invalid_signature" }, { status: 401 });
  }

  let evt: any;
  try {
    evt = JSON.parse(rawText);
  } catch {
    return Response.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const paymentEntity = evt?.payload?.payment?.entity;
  const razorpayPaymentId: string | undefined = paymentEntity?.id;

  // signature verified => acknowledge even if payload incomplete
  if (!razorpayPaymentId) {
    return Response.json({ ok: true, skipped: "no_payment_id" }, { status: 200 });
  }

  // Idempotent: avoids P2002 on retries
  await prisma.payment.upsert({
    where: { razorpayPaymentId },
    update: {
      status: paymentEntity?.status ?? undefined,
      amount: paymentEntity?.amount ?? undefined,
      currency: paymentEntity?.currency ?? undefined,
    },
    create: {
      razorpayPaymentId,
      status: paymentEntity?.status ?? null,
      amount: paymentEntity?.amount ?? null,
      currency: paymentEntity?.currency ?? null,
    },
  });

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
