import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { createCheckoutToken } from "../../../../lib/funnel/checkoutToken";

function text(value: unknown, max = 220) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const leadId = text(req.body?.leadId, 120);
  const funnel = text(req.body?.funnel, 20) as "chatgpt" | "claude";
  if (!leadId || !["chatgpt", "claude"].includes(funnel)) {
    return res.status(400).json({ ok: false, error: "Invalid workshop request" });
  }

  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return res.status(404).json({ ok: false, error: "Registration not found" });

    const validSource =
      lead.source === `funnel:${funnel}:free` || lead.source === `funnel:${funnel}:paid`;
    if (!validSource) {
      return res.status(409).json({ ok: false, error: "This lead is not eligible for this workshop funnel" });
    }

    const captured = await prisma.funnelPayment.findFirst({
      where: {
        leadId,
        funnel,
        purpose: "implementation_workshop",
        status: "captured",
      },
      orderBy: { createdAt: "desc" },
    });

    if (captured) {
      return res.status(200).json({
        ok: true,
        alreadyPaid: true,
        checkoutUrl: `/workshop/${funnel}/thank-you?lead_id=${encodeURIComponent(leadId)}`,
      });
    }

    const token = createCheckoutToken({
      leadId,
      funnel,
      purpose: "implementation_workshop",
      ttlSeconds: 2 * 60 * 60,
    });

    return res.status(200).json({
      ok: true,
      alreadyPaid: false,
      checkoutUrl: `/workshop/${funnel}/checkout?lead_id=${encodeURIComponent(leadId)}&token=${encodeURIComponent(token)}`,
    });
  } catch (error) {
    console.error("Workshop checkout handoff failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to start workshop checkout" });
  }
}
