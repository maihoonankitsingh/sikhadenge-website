export const CRM_PIPELINE_STAGES = [
  "new_lead",
  "engaged",
  "follow_up",
  "hot",
  "advisor_required",
  "decision_pending",
  "won",
  "lost",
  "do_not_contact",
] as const;

export const CRM_PRIORITIES = ["low", "normal", "high", "urgent"] as const;

export const CRM_ADVISOR_STATUSES = [
  "not_started",
  "requested",
  "scheduled",
  "completed",
  "follow_up",
  "converted",
  "not_fit",
  "no_show",
] as const;

export const CRM_QUALIFICATIONS = [
  "unknown",
  "low",
  "medium",
  "high",
  "qualified",
  "not_qualified",
] as const;

export const CRM_LOST_REASONS = [
  "price",
  "timing",
  "no_response",
  "not_fit",
  "competitor",
  "payment_failed",
  "no_interest",
  "other",
] as const;

export type FunnelSourceContext = {
  funnel: "chatgpt" | "claude" | "unknown";
  offerMode: "free" | "paid" | "unknown";
};

export function parseFunnelSource(source?: string | null): FunnelSourceContext {
  const parts = String(source || "").split(":");
  if (parts[0] !== "funnel") return { funnel: "unknown", offerMode: "unknown" };
  const funnel = parts[1] === "chatgpt" || parts[1] === "claude" ? parts[1] : "unknown";
  const offerMode = parts[2] === "free" || parts[2] === "paid" ? parts[2] : "unknown";
  return { funnel, offerMode };
}

export function parseLeadNotes(notes?: string | null): Record<string, any> {
  if (!notes) return {};
  try {
    const parsed = JSON.parse(notes);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

type EventLike = {
  eventName: string;
  eventValue?: number | null;
  createdAt: Date | string;
};

type PaymentLike = {
  purpose: string;
  status: string;
  createdAt: Date | string;
  paidAt?: Date | string | null;
};

const lifecycleOrder = [
  ["registered", "Registered"],
  ["whatsapp_sent", "WhatsApp Sent"],
  ["whatsapp_delivered", "WhatsApp Delivered"],
  ["whatsapp_read", "WhatsApp Read"],
  ["entry_paid", "Paid Entry Confirmed"],
  ["masterclass_joined", "Masterclass Joined"],
  ["masterclass_30m", "30m Retained"],
  ["masterclass_60m", "60m Retained"],
  ["workshop_offer", "Workshop Offer Viewed"],
  ["workshop_checkout", "Workshop Checkout"],
  ["workshop_paid", "Workshop Buyer"],
  ["workshop_attended", "Workshop Attended"],
  ["core_offer", "AI Expert Offer Viewed"],
  ["core_checkout", "AI Expert Checkout"],
  ["core_enrolled", "AI Expert Enrolled"],
] as const;

export function deriveLifecycle(events: EventLike[], payments: PaymentLike[]) {
  const names = new Set(events.map((event) => event.eventName));
  const capturedPurposes = new Set(
    payments.filter((payment) => payment.status === "captured").map((payment) => payment.purpose)
  );
  const createdPurposes = new Set(
    payments.filter((payment) => payment.status === "created").map((payment) => payment.purpose)
  );

  let key: (typeof lifecycleOrder)[number][0] = "registered";
  const reach = (candidate: typeof key, condition: boolean) => {
    if (condition) key = candidate;
  };

  reach("whatsapp_sent", names.has("whatsapp_message_sent"));
  reach("whatsapp_delivered", names.has("whatsapp_delivered"));
  reach("whatsapp_read", names.has("whatsapp_read"));
  reach("entry_paid", capturedPurposes.has("masterclass_entry") || names.has("purchase"));
  reach("masterclass_joined", names.has("masterclass_joined"));
  reach("masterclass_30m", names.has("masterclass_30m"));
  reach("masterclass_60m", names.has("masterclass_60m"));
  reach("workshop_offer", names.has("workshop_offer_viewed") || names.has("masterclass_offer_seen"));
  reach("workshop_checkout", createdPurposes.has("implementation_workshop") || names.has("workshop_checkout_started"));
  reach("workshop_paid", capturedPurposes.has("implementation_workshop") || names.has("workshop_purchase"));
  reach("workshop_attended", names.has("workshop_attended"));
  reach("core_offer", names.has("core_offer_seen"));
  reach("core_checkout", createdPurposes.has("core_program") || names.has("core_checkout_started"));
  reach("core_enrolled", capturedPurposes.has("core_program") || names.has("close_convert_lead"));

  const index = lifecycleOrder.findIndex(([candidate]) => candidate === key);
  const label = lifecycleOrder[index]?.[1] || "Registered";
  return { key, label, rank: Math.max(0, index) };
}

export function deriveRevenue(events: EventLike[]) {
  let entryRevenue = 0;
  let workshopRevenue = 0;
  let coreRevenue = 0;
  let refundValue = 0;

  for (const event of events) {
    const value = Math.max(0, Number(event.eventValue || 0));
    if (event.eventName === "purchase") entryRevenue += value;
    else if (event.eventName === "workshop_purchase") workshopRevenue += value;
    else if (event.eventName === "close_convert_lead") coreRevenue += value;
    else if (event.eventName === "refund") refundValue += value;
  }

  const grossRevenue = entryRevenue + workshopRevenue + coreRevenue;
  return {
    entryRevenue,
    workshopRevenue,
    coreRevenue,
    refundValue,
    grossRevenue,
    netRevenue: Math.max(0, grossRevenue - refundValue),
  };
}

export function latestTimestamp(
  events: Array<{ createdAt: Date | string }>,
  payments: Array<{ createdAt: Date | string; paidAt?: Date | string | null }>,
  fallback: Date | string
) {
  const values = [
    new Date(fallback).getTime(),
    ...events.map((item) => new Date(item.createdAt).getTime()),
    ...payments.flatMap((item) => [
      new Date(item.createdAt).getTime(),
      item.paidAt ? new Date(item.paidAt).getTime() : 0,
    ]),
  ].filter((value) => Number.isFinite(value));
  return new Date(Math.max(...values)).toISOString();
}

export function isAllowedValue(value: unknown, allowed: readonly string[]) {
  return typeof value === "string" && allowed.includes(value);
}
