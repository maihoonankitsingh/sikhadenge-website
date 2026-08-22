import { prisma } from "../prisma";
import type { FunnelProduct, OfferMode } from "./types";

export type CoreProgramEligibility = {
  eligible: boolean;
  leadId: string;
  funnel: FunnelProduct | null;
  offerMode: OfferMode | null;
  workshopPaymentId: string | null;
};

export async function getCoreProgramEligibility(leadId: string): Promise<CoreProgramEligibility> {
  if (!leadId) {
    return { eligible: false, leadId: "", funnel: null, offerMode: null, workshopPaymentId: null };
  }

  const workshop = await prisma.funnelPayment.findFirst({
    where: {
      leadId,
      purpose: "implementation_workshop",
      status: "captured",
      funnel: { in: ["chatgpt", "claude"] },
    },
    orderBy: [{ paidAt: "desc" }, { createdAt: "desc" }],
    select: { id: true, funnel: true, offerMode: true },
  });

  if (!workshop || !["chatgpt", "claude"].includes(workshop.funnel)) {
    return { eligible: false, leadId, funnel: null, offerMode: null, workshopPaymentId: null };
  }

  return {
    eligible: true,
    leadId,
    funnel: workshop.funnel as FunnelProduct,
    offerMode: workshop.offerMode === "free" ? "free" : "paid",
    workshopPaymentId: workshop.id,
  };
}

export async function getCoreProgramEnrollment(leadId: string) {
  if (!leadId) return null;
  return prisma.funnelPayment.findFirst({
    where: {
      leadId,
      purpose: "core_program",
      status: "captured",
    },
    orderBy: [{ paidAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      funnel: true,
      offerMode: true,
      amountPaise: true,
      currency: true,
      paidAt: true,
      providerPaymentId: true,
    },
  });
}
