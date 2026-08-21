import type { CheckoutPurpose } from "./checkoutToken";

export type SupportedPaymentPurpose = CheckoutPurpose;

export function paymentPurposeDetails(input: {
  purpose: string;
  funnel: string;
  leadId: string;
}) {
  if (input.purpose === "core_program") {
    return {
      purpose: "core_program" as const,
      eventName: "close_convert_lead",
      eventPrefix: "core_purchase",
      pagePath: "/program/ai-expert/checkout",
      leadStatus: "enrolled_ai_expert",
      contentName: "sikhadenge_ai_expert_program",
      confirmationUrl: `/program/ai-expert/thank-you?lead_id=${encodeURIComponent(input.leadId)}`,
    };
  }

  if (input.purpose === "implementation_workshop") {
    return {
      purpose: "implementation_workshop" as const,
      eventName: "workshop_purchase",
      eventPrefix: "workshop_purchase",
      pagePath: `/workshop/${input.funnel}/checkout`,
      leadStatus: "paid_workshop",
      contentName: `${input.funnel}_implementation_workshop`,
      confirmationUrl: `/workshop/${input.funnel}/thank-you?lead_id=${encodeURIComponent(input.leadId)}`,
    };
  }

  if (input.purpose === "masterclass_entry") {
    return {
      purpose: "masterclass_entry" as const,
      eventName: "purchase",
      eventPrefix: "purchase",
      pagePath: `/masterclass/${input.funnel}/checkout`,
      leadStatus: "paid_masterclass",
      contentName: `${input.funnel}_masterclass_entry`,
      confirmationUrl: `/masterclass/${input.funnel}/thank-you?lead_id=${encodeURIComponent(input.leadId)}&mode=paid&paid=1`,
    };
  }

  return null;
}
