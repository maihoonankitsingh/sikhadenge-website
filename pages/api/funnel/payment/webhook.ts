import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import {
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  verifyRazorpayWebhookSignature,
} from "../../../../lib/funnel/razorpay";
import { paymentPurposeDetails } from "../../../../lib/funnel/paymentPurpose";
import { sendMetaCapiEvent } from "../../../../lib/funnel/metaCapi";

export const config = { api: { bodyParser: false } };

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function record(value: unknown): Record<string, any> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, any>)
    : {};
}

async function rawBody(req: NextApiRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function siteUrl(path: string) {
  const base = (process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://sikhadenge.in").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

async function reconcileCaptured(orderId: string, paymentId: string) {
  const stored = await prisma.funnelPayment.findUnique({ where: { providerOrderId: orderId } });
  if (!stored) return { handled: false };

  const details = paymentPurposeDetails(stored);
  if (!details) throw new Error("Unsupported payment purpose in signed webhook");

  const [payment, order, registration] = await Promise.all([
    fetchRazorpayPayment(paymentId),
    fetchRazorpayOrder(orderId),
    prisma.funnelEvent.findFirst({
      where: { leadId: stored.leadId, eventName: "generate_lead" },
      orderBy: { createdAt: "desc" },
      select: { entryPrice: true },
    }),
  ]);

  if (
    payment.order_id !== orderId ||
    payment.status !== "captured" ||
    payment.captured === false ||
    order.status !== "paid" ||
    payment.amount !== stored.amountPaise ||
    order.amount !== stored.amountPaise ||
    order.amount_paid < stored.amountPaise ||
    payment.currency !== stored.currency ||
    order.currency !== stored.currency
  ) {
    throw new Error("Signed webhook could not be reconciled with captured provider state");
  }

  const metadata = record(stored.metadata);
  const purchaseEventId = `${details.eventPrefix}_${paymentId}`;
  const amountRupees = stored.amountPaise / 100;

  await prisma.$transaction(async (tx) => {
    await tx.funnelPayment.update({
      where: { id: stored.id },
      data: {
        status: "captured",
        providerPaymentId: paymentId,
        purchaseEventId,
        paidAt: stored.paidAt || new Date(),
        failureCode: null,
        failureReason: null,
      },
    });

    await tx.funnelEvent.upsert({
      where: { eventId: purchaseEventId },
      update: {},
      create: {
        eventId: purchaseEventId,
        eventName: details.eventName,
        visitorId: text(metadata.visitorId, 120) || null,
        sessionId: text(metadata.sessionId, 120) || null,
        leadId: stored.leadId,
        funnel: stored.funnel,
        offerMode: stored.offerMode,
        entryPrice: registration?.entryPrice ?? null,
        batchId: stored.batchId,
        pagePath: details.pagePath,
        source: text(metadata.source, 120) || null,
        medium: text(metadata.medium, 120) || null,
        campaign: text(metadata.campaign, 220) || null,
        content: text(metadata.content, 220) || null,
        term: text(metadata.term, 220) || null,
        campaignId: text(metadata.campaignId, 120) || null,
        adsetId: text(metadata.adsetId, 120) || null,
        adId: text(metadata.adId, 120) || null,
        fbclid: text(metadata.fbclid, 300) || null,
        fbp: text(metadata.fbp, 300) || null,
        fbc: text(metadata.fbc, 500) || null,
        gclid: text(metadata.gclid, 300) || null,
        landingVariant: text(metadata.landingVariant, 120) || null,
        eventValue: Math.round(amountRupees),
        currency: stored.currency,
        metadata: {
          provider: "razorpay",
          purpose: stored.purpose,
          providerOrderId: orderId,
          providerPaymentId: paymentId,
          verifiedBy: "signed_webhook_and_provider_status",
        },
      },
    });

    await tx.lead.update({
      where: { id: stored.leadId },
      data: { status: details.leadStatus },
    });
  });

  const capi = await sendMetaCapiEvent({
    eventName: "Purchase",
    eventId: purchaseEventId,
    eventSourceUrl: siteUrl(details.pagePath),
    email: text(metadata.email, 220),
    phone: text(metadata.phone, 30),
    fbp: text(metadata.fbp, 300),
    fbc: text(metadata.fbc, 500),
    externalId: stored.leadId,
    value: amountRupees,
    currency: stored.currency,
    contentName: details.contentName,
    customData: {
      payment_provider: "razorpay",
      payment_purpose: stored.purpose,
      reconciliation: "webhook",
      batch_id: stored.batchId || "",
    },
  });

  if (capi.attempted && !capi.ok) console.error("Webhook Meta CAPI Purchase failed:", capi);
  return { handled: true, purchaseEventId };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  try {
    const body = await rawBody(req);
    const signature = text(req.headers["x-razorpay-signature"], 300);
    if (!verifyRazorpayWebhookSignature(body, signature)) {
      return res.status(401).json({ ok: false, error: "Invalid webhook signature" });
    }

    const event = JSON.parse(body.toString("utf8"));
    const eventName = text(event?.event, 100);
    const paymentEntity = record(event?.payload?.payment?.entity);
    const orderEntity = record(event?.payload?.order?.entity);

    if (eventName === "payment.captured" || eventName === "order.paid") {
      const paymentId = text(paymentEntity.id, 120);
      const orderId = text(paymentEntity.order_id || orderEntity.id, 120);
      if (paymentId && orderId) await reconcileCaptured(orderId, paymentId);
      return res.status(200).json({ ok: true });
    }

    if (eventName === "payment.failed") {
      const orderId = text(paymentEntity.order_id, 120);
      if (orderId) {
        const stored = await prisma.funnelPayment.findUnique({ where: { providerOrderId: orderId } });
        if (stored && stored.status !== "captured") {
          await prisma.funnelPayment.update({
            where: { id: stored.id },
            data: {
              status: "failed",
              providerPaymentId: text(paymentEntity.id, 120) || null,
              failureCode: text(paymentEntity.error_code, 120) || null,
              failureReason: text(paymentEntity.error_description, 500) || null,
              failedAt: new Date(),
            },
          });
        }
      }
      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true, ignored: true });
  } catch (error) {
    console.error("Razorpay webhook processing failed:", error);
    return res.status(500).json({ ok: false });
  }
}
