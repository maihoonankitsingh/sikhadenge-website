import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { createRazorpayOrder, getRazorpayPublicKey } from "../../../../lib/funnel/razorpay";
import { verifyCheckoutToken } from "../../../../lib/funnel/checkoutToken";

function text(value: unknown, max = 220) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseNotes(value: string | null) {
  if (!value) return {} as Record<string, any>;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, any>)
      : {};
  } catch {
    return {} as Record<string, any>;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const leadId = text(req.body?.leadId, 120);
  const funnel = text(req.body?.funnel, 20);
  const checkoutToken = text(req.body?.checkoutToken, 1200);
  const token = verifyCheckoutToken(checkoutToken);

  if (
    !leadId ||
    !["chatgpt", "claude"].includes(funnel) ||
    !token ||
    token.leadId !== leadId ||
    token.funnel !== funnel
  ) {
    return res.status(401).json({ ok: false, error: "Checkout link is invalid or expired. Please register again." });
  }

  const keyId = getRazorpayPublicKey();
  if (!keyId || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(503).json({ ok: false, error: "Secure payment is not configured yet" });
  }

  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return res.status(404).json({ ok: false, error: "Registration not found" });

    const notes = parseNotes(lead.notes);
    if (
      notes.schema !== "funnel-v2" ||
      notes.funnel !== funnel ||
      notes.offerMode !== "paid" ||
      lead.source !== `funnel:${funnel}:paid`
    ) {
      return res.status(409).json({ ok: false, error: "This registration is not a paid masterclass registration" });
    }

    const amountRupees = Math.max(
      1,
      Math.round(Number(process.env.NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE || "9") || 9)
    );
    const amountPaise = amountRupees * 100;
    const batchId = text(notes.batchId, 180) || null;

    const paid = await prisma.funnelPayment.findFirst({
      where: { leadId, funnel, purpose: "masterclass_entry", status: "captured" },
      orderBy: { createdAt: "desc" },
    });

    if (paid) {
      return res.status(200).json({
        ok: true,
        alreadyPaid: true,
        confirmationUrl: `/masterclass/${funnel}/thank-you?lead_id=${encodeURIComponent(leadId)}&mode=paid&paid=1`,
      });
    }

    const existing = await prisma.funnelPayment.findFirst({
      where: {
        leadId,
        funnel,
        purpose: "masterclass_entry",
        status: "created",
        amountPaise,
      },
      orderBy: { createdAt: "desc" },
    });

    const email = text(notes.email, 220);
    const phone = text(lead.phone, 30);

    if (existing) {
      return res.status(200).json({
        ok: true,
        alreadyPaid: false,
        keyId,
        paymentRecordId: existing.id,
        orderId: existing.providerOrderId,
        amount: existing.amountPaise,
        currency: existing.currency,
        name: lead.name || "SikhaDenge Learner",
        email,
        contact: phone,
        description: `${funnel === "chatgpt" ? "ChatGPT" : "Claude"} Live Masterclass`,
      });
    }

    const receipt = `mc_${leadId.slice(-10)}_${Date.now().toString(36)}`.slice(0, 40);
    const attrs = notes.attribution && typeof notes.attribution === "object" ? notes.attribution : {};

    const order = await createRazorpayOrder({
      amountPaise,
      receipt,
      notes: {
        lead_id: leadId.slice(0, 250),
        funnel,
        batch_id: String(batchId || "").slice(0, 250),
        purpose: "masterclass_entry",
      },
    });

    if (order.amount !== amountPaise || order.currency !== "INR") {
      throw new Error("Payment provider returned an unexpected order amount");
    }

    const payment = await prisma.funnelPayment.create({
      data: {
        provider: "razorpay",
        purpose: "masterclass_entry",
        leadId,
        funnel,
        offerMode: "paid",
        batchId,
        amountPaise,
        currency: "INR",
        status: "created",
        receipt,
        providerOrderId: order.id,
        metadata: {
          email,
          phone,
          visitorId: text(attrs.visitorId, 120),
          sessionId: text(attrs.sessionId, 120),
          source: text(attrs.utmSource, 120),
          medium: text(attrs.utmMedium, 120),
          campaign: text(attrs.utmCampaign, 220),
          content: text(attrs.utmContent, 220),
          term: text(attrs.utmTerm, 220),
          campaignId: text(attrs.campaignId, 120),
          adsetId: text(attrs.adsetId, 120),
          adId: text(attrs.adId, 120),
          fbclid: text(attrs.fbclid, 300),
          fbp: text(attrs.fbp, 300),
          fbc: text(attrs.fbc, 500),
          gclid: text(attrs.gclid, 300),
          landingVariant: text(attrs.landingVariant, 120),
        },
      },
    });

    return res.status(200).json({
      ok: true,
      alreadyPaid: false,
      keyId,
      paymentRecordId: payment.id,
      orderId: order.id,
      amount: amountPaise,
      currency: "INR",
      name: lead.name || "SikhaDenge Learner",
      email,
      contact: phone,
      description: `${funnel === "chatgpt" ? "ChatGPT" : "Claude"} Live Masterclass`,
    });
  } catch (error) {
    console.error("Masterclass payment order creation failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to start secure payment" });
  }
}
