import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import {
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  verifyRazorpayCheckoutSignature,
} from "../../../../lib/funnel/razorpay";
import { sendMetaCapiEvent } from "../../../../lib/funnel/metaCapi";

function text(value: unknown, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function record(value: unknown): Record<string, any> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, any>)
    : {};
}

function clientIp(req: NextApiRequest) {
  const cf = req.headers["cf-connecting-ip"];
  if (typeof cf === "string" && cf.trim()) return cf.trim();
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) return xff.split(",")[0]?.trim() || "";
  return String(req.socket?.remoteAddress || "");
}

function siteUrl(path: string) {
  const base = (process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://sikhadenge.in").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const paymentRecordId = text(req.body?.paymentRecordId, 120);
  const returnedOrderId = text(req.body?.razorpay_order_id, 120);
  const paymentId = text(req.body?.razorpay_payment_id, 120);
  const signature = text(req.body?.razorpay_signature, 300);

  if (!paymentRecordId || !returnedOrderId || !paymentId || !signature) {
    return res.status(400).json({ ok: false, error: "Incomplete payment verification data" });
  }

  try {
    const stored = await prisma.funnelPayment.findUnique({ where: { id: paymentRecordId } });
    if (!stored) return res.status(404).json({ ok: false, error: "Payment order not found" });

    if (stored.status === "captured" && stored.providerPaymentId === paymentId) {
      return res.status(200).json({
        ok: true,
        purchaseEventId: stored.purchaseEventId,
        confirmationUrl: `/masterclass/${stored.funnel}/thank-you?lead_id=${encodeURIComponent(stored.leadId)}&mode=paid&paid=1`,
      });
    }

    if (stored.provider !== "razorpay" || stored.providerOrderId !== returnedOrderId) {
      return res.status(409).json({ ok: false, error: "Payment order mismatch" });
    }

    const validSignature = verifyRazorpayCheckoutSignature({
      orderId: stored.providerOrderId,
      paymentId,
      signature,
    });
    if (!validSignature) {
      return res.status(400).json({ ok: false, error: "Payment signature verification failed" });
    }

    const [payment, order] = await Promise.all([
      fetchRazorpayPayment(paymentId),
      fetchRazorpayOrder(stored.providerOrderId),
    ]);

    const amountMatches =
      payment.amount === stored.amountPaise &&
      order.amount === stored.amountPaise &&
      order.amount_paid >= stored.amountPaise;
    const providerMatches = payment.order_id === stored.providerOrderId;
    const currencyMatches = payment.currency === stored.currency && order.currency === stored.currency;
    const captured = payment.status === "captured" && payment.captured !== false;
    const orderPaid = order.status === "paid";

    if (!amountMatches || !providerMatches || !currencyMatches || !captured || !orderPaid) {
      return res.status(409).json({
        ok: false,
        error: "Payment is not fully captured yet. Please retry verification shortly.",
      });
    }

    const metadata = record(stored.metadata);
    const purchaseEventId = stored.purchaseEventId || `purchase_${crypto.randomUUID()}`;
    const amountRupees = stored.amountPaise / 100;

    await prisma.$transaction(async (tx) => {
      const latest = await tx.funnelPayment.findUnique({ where: { id: stored.id } });
      if (!latest) throw new Error("Payment record disappeared during verification");

      if (latest.status !== "captured") {
        await tx.funnelPayment.update({
          where: { id: stored.id },
          data: {
            status: "captured",
            providerPaymentId: paymentId,
            purchaseEventId,
            paidAt: new Date(),
            failureCode: null,
            failureReason: null,
          },
        });

        await tx.funnelEvent.create({
          data: {
            eventId: purchaseEventId,
            eventName: "purchase",
            visitorId: text(metadata.visitorId, 120) || null,
            sessionId: text(metadata.sessionId, 120) || null,
            leadId: stored.leadId,
            funnel: stored.funnel,
            offerMode: stored.offerMode,
            entryPrice: Math.round(amountRupees),
            batchId: stored.batchId,
            pagePath: `/masterclass/${stored.funnel}/checkout`,
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
              paymentRecordId: stored.id,
              providerOrderId: stored.providerOrderId,
              providerPaymentId: paymentId,
              verifiedBy: "checkout_signature_and_provider_status",
            },
          },
        });

        await tx.lead.update({
          where: { id: stored.leadId },
          data: { status: "paid_masterclass" },
        });
      }
    });

    const lead = await prisma.lead.findUnique({ where: { id: stored.leadId } });
    const capiResult = await sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: purchaseEventId,
      eventSourceUrl: siteUrl(`/masterclass/${stored.funnel}/checkout`),
      email: text(metadata.email, 220),
      phone: text(metadata.phone || lead?.phone, 30),
      clientIp: clientIp(req),
      clientUserAgent: text(req.headers["user-agent"], 500),
      fbp: text(metadata.fbp, 300),
      fbc: text(metadata.fbc, 500),
      externalId: stored.leadId,
      value: amountRupees,
      currency: stored.currency,
      contentName: `${stored.funnel}_masterclass_entry`,
      customData: {
        payment_provider: "razorpay",
        offer_mode: stored.offerMode,
        batch_id: stored.batchId || "",
      },
    });

    if (capiResult.attempted && !capiResult.ok) {
      console.error("Meta CAPI purchase event failed:", capiResult);
    }

    return res.status(200).json({
      ok: true,
      purchaseEventId,
      confirmationUrl: `/masterclass/${stored.funnel}/thank-you?lead_id=${encodeURIComponent(stored.leadId)}&mode=paid&paid=1`,
    });
  } catch (error) {
    console.error("Masterclass payment verification failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to verify payment" });
  }
}
