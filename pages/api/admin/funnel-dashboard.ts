import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

type StageName =
  | "views"
  | "ctaClicks"
  | "leads"
  | "whatsappSent"
  | "whatsappDelivered"
  | "whatsappRead"
  | "whatsappFailed"
  | "communityJoined"
  | "checkoutStarts"
  | "entryPurchases"
  | "masterclassJoined"
  | "masterclass30m"
  | "masterclass60m"
  | "masterclassOfferSeen"
  | "workshopCtaClicks"
  | "workshopCheckoutStarts"
  | "workshopPurchases"
  | "workshopAttended"
  | "qualifiedLeads"
  | "workingLeads"
  | "coreOfferSeen"
  | "corePurchases"
  | "lostLeads"
  | "refunds";

type Group = {
  funnel: string;
  offerMode: string;
  uniqueVisitors: Set<string>;
  stages: Record<StageName, Set<string>>;
  entryRevenue: number;
  workshopRevenue: number;
  coreRevenue: number;
  refundValue: number;
};

const stageNames: StageName[] = [
  "views",
  "ctaClicks",
  "leads",
  "whatsappSent",
  "whatsappDelivered",
  "whatsappRead",
  "whatsappFailed",
  "communityJoined",
  "checkoutStarts",
  "entryPurchases",
  "masterclassJoined",
  "masterclass30m",
  "masterclass60m",
  "masterclassOfferSeen",
  "workshopCtaClicks",
  "workshopCheckoutStarts",
  "workshopPurchases",
  "workshopAttended",
  "qualifiedLeads",
  "workingLeads",
  "coreOfferSeen",
  "corePurchases",
  "lostLeads",
  "refunds",
];

function emptyStages(): Record<StageName, Set<string>> {
  return Object.fromEntries(stageNames.map((name) => [name, new Set<string>()])) as Record<
    StageName,
    Set<string>
  >;
}

function emptyGroup(funnel: string, offerMode: string): Group {
  return {
    funnel,
    offerMode,
    uniqueVisitors: new Set<string>(),
    stages: emptyStages(),
    entryRevenue: 0,
    workshopRevenue: 0,
    coreRevenue: 0,
    refundValue: 0,
  };
}

function percent(numerator: number, denominator: number) {
  if (!denominator) return 0;
  return Number(((numerator / denominator) * 100).toFixed(2));
}

function identity(event: {
  id: string;
  eventId: string | null;
  leadId: string | null;
  visitorId: string | null;
}) {
  return event.leadId || event.visitorId || event.eventId || event.id;
}

function stageForEvent(eventName: string): StageName | null {
  switch (eventName) {
    case "view_masterclass_offer": return "views";
    case "masterclass_cta_click": return "ctaClicks";
    case "generate_lead": return "leads";
    case "whatsapp_message_sent": return "whatsappSent";
    case "whatsapp_delivered": return "whatsappDelivered";
    case "whatsapp_read": return "whatsappRead";
    case "whatsapp_failed": return "whatsappFailed";
    case "community_joined":
    case "join_group": return "communityJoined";
    case "begin_checkout": return "checkoutStarts";
    case "purchase": return "entryPurchases";
    case "masterclass_joined": return "masterclassJoined";
    case "masterclass_30m": return "masterclass30m";
    case "masterclass_60m": return "masterclass60m";
    case "masterclass_offer_seen": return "masterclassOfferSeen";
    case "workshop_cta_click": return "workshopCtaClicks";
    case "workshop_checkout_started": return "workshopCheckoutStarts";
    case "workshop_purchase": return "workshopPurchases";
    case "workshop_attended": return "workshopAttended";
    case "qualify_lead": return "qualifiedLeads";
    case "working_lead": return "workingLeads";
    case "core_offer_seen": return "coreOfferSeen";
    case "close_convert_lead": return "corePurchases";
    case "close_unconvert_lead": return "lostLeads";
    case "refund": return "refunds";
    default: return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const days = Math.min(180, Math.max(1, Number.parseInt(String(req.query.days || "30"), 10) || 30));
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const events = await prisma.funnelEvent.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        eventId: true,
        eventName: true,
        visitorId: true,
        leadId: true,
        funnel: true,
        offerMode: true,
        eventValue: true,
        createdAt: true,
      },
      take: 100000,
    });

    const groups = new Map<string, Group>();

    for (const event of events) {
      const funnel = event.funnel || "unknown";
      const offerMode = event.offerMode || "unknown";
      const key = `${funnel}:${offerMode}`;
      const group = groups.get(key) || emptyGroup(funnel, offerMode);
      const entity = identity(event);

      if (event.visitorId) group.uniqueVisitors.add(event.visitorId);
      const stage = stageForEvent(event.eventName);
      if (stage) group.stages[stage].add(entity);

      const value = Math.max(0, event.eventValue || 0);
      if (event.eventName === "purchase") group.entryRevenue += value;
      else if (event.eventName === "workshop_purchase") group.workshopRevenue += value;
      else if (event.eventName === "close_convert_lead") group.coreRevenue += value;
      else if (event.eventName === "refund") group.refundValue += value;

      groups.set(key, group);
    }

    const rows = Array.from(groups.values())
      .map((group) => {
        const s = Object.fromEntries(stageNames.map((name) => [name, group.stages[name].size])) as Record<StageName, number>;
        const grossRevenue = group.entryRevenue + group.workshopRevenue + group.coreRevenue;
        const netRevenue = Math.max(0, grossRevenue - group.refundValue);

        return {
          funnel: group.funnel,
          offerMode: group.offerMode,
          uniqueVisitors: group.uniqueVisitors.size,
          ...s,
          leadConversionRate: percent(s.leads, s.views),
          whatsappSendRate: percent(s.whatsappSent, s.leads),
          whatsappDeliveryRate: percent(s.whatsappDelivered, s.whatsappSent),
          whatsappReadRate: percent(s.whatsappRead, s.whatsappDelivered),
          communityJoinFromReadRate: percent(s.communityJoined, s.whatsappRead),
          communityJoinFromLeadRate: percent(s.communityJoined, s.leads),
          checkoutConversionRate: percent(s.entryPurchases, s.checkoutStarts),
          showUpRate: percent(s.masterclassJoined, s.leads),
          retention30Rate: percent(s.masterclass30m, s.masterclassJoined),
          retention60Rate: percent(s.masterclass60m, s.masterclassJoined),
          workshopOfferToCheckoutRate: percent(s.workshopCheckoutStarts, s.masterclassOfferSeen),
          workshopCheckoutConversionRate: percent(s.workshopPurchases, s.workshopCheckoutStarts),
          workshopBuyerRate: percent(s.workshopPurchases, s.masterclassOfferSeen),
          workshopAttendanceRate: percent(s.workshopAttended, s.workshopPurchases),
          coreOfferConversionRate: percent(s.corePurchases, s.coreOfferSeen),
          leadToCorePurchaseRate: percent(s.corePurchases, s.leads),
          entryRevenue: group.entryRevenue,
          workshopRevenue: group.workshopRevenue,
          coreRevenue: group.coreRevenue,
          grossRevenue,
          refundValue: group.refundValue,
          netRevenue,
        };
      })
      .sort((a, b) => `${a.funnel}:${a.offerMode}`.localeCompare(`${b.funnel}:${b.offerMode}`));

    const summary = rows.reduce(
      (acc, row) => {
        acc.uniqueVisitors += row.uniqueVisitors;
        acc.views += row.views;
        acc.leads += row.leads;
        acc.whatsappSent += row.whatsappSent;
        acc.whatsappDelivered += row.whatsappDelivered;
        acc.whatsappRead += row.whatsappRead;
        acc.communityJoined += row.communityJoined;
        acc.masterclassJoined += row.masterclassJoined;
        acc.workshopCheckoutStarts += row.workshopCheckoutStarts;
        acc.workshopPurchases += row.workshopPurchases;
        acc.corePurchases += row.corePurchases;
        acc.grossRevenue += row.grossRevenue;
        acc.refundValue += row.refundValue;
        acc.netRevenue += row.netRevenue;
        return acc;
      },
      {
        uniqueVisitors: 0,
        views: 0,
        leads: 0,
        whatsappSent: 0,
        whatsappDelivered: 0,
        whatsappRead: 0,
        communityJoined: 0,
        masterclassJoined: 0,
        workshopCheckoutStarts: 0,
        workshopPurchases: 0,
        corePurchases: 0,
        grossRevenue: 0,
        refundValue: 0,
        netRevenue: 0,
      }
    );

    return res.status(200).json({
      ok: true,
      rangeDays: days,
      since: since.toISOString(),
      summary,
      rows,
      note:
        "First-party funnel events only. WhatsApp metrics require authenticated private-service callbacks. Workshop checkout and purchase stages preserve the original Free/Paid acquisition cohort. Meta ad spend, CPL, CAC and ROAS remain excluded until a verified Meta Ads reporting source is connected.",
    });
  } catch (error) {
    console.error("Funnel dashboard failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to load funnel dashboard" });
  }
}
