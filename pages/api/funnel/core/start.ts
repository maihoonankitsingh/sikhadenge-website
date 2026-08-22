import type { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutToken } from "../../../../lib/funnel/checkoutToken";
import { getCoreProgramEligibility, getCoreProgramEnrollment } from "../../../../lib/funnel/coreProgram";

function text(value: unknown, max = 140) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const leadId = text(req.body?.leadId, 120);
  if (!leadId) return res.status(400).json({ ok: false, error: "Lead is required" });

  try {
    const existing = await getCoreProgramEnrollment(leadId);
    if (existing) {
      return res.status(200).json({
        ok: true,
        alreadyEnrolled: true,
        confirmationUrl: `/program/ai-expert/thank-you?lead_id=${encodeURIComponent(leadId)}`,
      });
    }

    const eligibility = await getCoreProgramEligibility(leadId);
    if (!eligibility.eligible || !eligibility.funnel || !eligibility.offerMode) {
      return res.status(403).json({
        ok: false,
        error: "This AI Expert Program offer requires a verified implementation workshop purchase.",
      });
    }

    const token = createCheckoutToken({
      leadId,
      funnel: eligibility.funnel,
      purpose: "core_program",
      ttlSeconds: 2 * 60 * 60,
    });

    return res.status(200).json({
      ok: true,
      alreadyEnrolled: false,
      checkoutUrl: `/program/ai-expert/checkout?lead_id=${encodeURIComponent(leadId)}&source=${encodeURIComponent(
        eligibility.funnel
      )}&mode=${encodeURIComponent(eligibility.offerMode)}&token=${encodeURIComponent(token)}`,
    });
  } catch (error) {
    console.error("AI Expert Program checkout handoff failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to prepare program checkout" });
  }
}
