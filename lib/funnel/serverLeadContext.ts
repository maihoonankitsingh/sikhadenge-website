import { prisma } from "../prisma";
import type { FunnelProduct, OfferMode } from "./types";

export async function resolveFunnelLeadContext(input: {
  leadId: string;
  funnel: FunnelProduct;
}): Promise<{ valid: boolean; offerMode: OfferMode }> {
  if (!input.leadId) return { valid: false, offerMode: "paid" };

  const lead = await prisma.lead.findUnique({
    where: { id: input.leadId },
    select: { source: true },
  });

  if (!lead?.source) return { valid: false, offerMode: "paid" };
  if (lead.source === `funnel:${input.funnel}:free`) {
    return { valid: true, offerMode: "free" };
  }
  if (lead.source === `funnel:${input.funnel}:paid`) {
    return { valid: true, offerMode: "paid" };
  }

  return { valid: false, offerMode: "paid" };
}
