import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

type StageName =
  | "views" | "ctaClicks" | "leads" | "whatsappSent" | "whatsappDelivered" | "whatsappRead" | "whatsappFailed" | "communityJoined"
  | "checkoutStarts" | "entryPurchases" | "masterclassJoined" | "masterclass30m" | "masterclass60m" | "masterclassOfferSeen"
  | "workshopOfferViews" | "workshopCtaClicks" | "workshopCheckoutStarts" | "workshopPurchases" | "workshopAttended"
  | "qualifiedLeads" | "workingLeads" | "coreOfferSeen" | "advisorClicks" | "coreCheckoutStarts" | "corePurchases" | "lostLeads" | "refunds";

type Group = {
  funnel: string;
  offerMode: string;
  uniqueVisitors: Set<string>;
  leadIds: Set<string>;
  stages: Record<StageName, Set<string>>;
  entryRevenue: number;
  workshopRevenue: number;
  coreRevenue: number;
  refundValue: number;
};

type Timeline = {
  generateLead?: Date;
  whatsappSent?: Date;
  workingLead?: Date;
  entryPurchase?: Date;
};

type CampaignGroup = {
  key: string;
  source: string;
  medium: string;
  campaign: string;
  campaignId: string;
  visitors: Set<string>;
  leads: Set<string>;
  entryPurchases: Set<string>;
  workshopPurchases: Set<string>;
  corePurchases: Set<string>;
  grossRevenue: number;
  refundValue: number;
};

type AdGroup = CampaignGroup & { adId: string };

const stageNames: StageName[] = [
  "views", "ctaClicks", "leads", "whatsappSent", "whatsappDelivered", "whatsappRead", "whatsappFailed", "communityJoined", "checkoutStarts", "entryPurchases",
  "masterclassJoined", "masterclass30m", "masterclass60m", "masterclassOfferSeen", "workshopOfferViews", "workshopCtaClicks", "workshopCheckoutStarts", "workshopPurchases", "workshopAttended",
  "qualifiedLeads", "workingLeads", "coreOfferSeen", "advisorClicks", "coreCheckoutStarts", "corePurchases", "lostLeads", "refunds",
];

const terminalPipelineStages = new Set(["converted", "closed", "closed_won", "closed_lost", "lost", "refunded"]);

function emptyStages(): Record<StageName, Set<string>> {
  return Object.fromEntries(stageNames.map((name) => [name, new Set<string>()])) as Record<StageName, Set<string>>;
}

function emptyGroup(funnel: string, offerMode: string): Group {
  return { funnel, offerMode, uniqueVisitors: new Set<string>(), leadIds: new Set<string>(), stages: emptyStages(), entryRevenue: 0, workshopRevenue: 0, coreRevenue: 0, refundValue: 0 };
}

function percent(n: number, d: number) {
  return d ? Number(((n / d) * 100).toFixed(2)) : 0;
}

function ratio(n: number, d: number) {
  return d ? Number((n / d).toFixed(2)) : 0;
}

function identity(e: { id: string; eventId: string | null; leadId: string | null; visitorId: string | null }) {
  return e.leadId || e.visitorId || e.eventId || e.id;
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
    case "workshop_offer_viewed": return "workshopOfferViews";
    case "workshop_cta_click": return "workshopCtaClicks";
    case "workshop_checkout_started": return "workshopCheckoutStarts";
    case "workshop_purchase": return "workshopPurchases";
    case "workshop_attended": return "workshopAttended";
    case "qualify_lead": return "qualifiedLeads";
    case "working_lead": return "workingLeads";
    case "core_offer_seen": return "coreOfferSeen";
    case "advisor_cta_click": return "advisorClicks";
    case "core_checkout_started": return "coreCheckoutStarts";
    case "close_convert_lead": return "corePurchases";
    case "close_unconvert_lead": return "lostLeads";
    case "refund": return "refunds";
    default: return null;
  }
}

function setEarliest(current: Date | undefined, next: Date): Date {
  return !current || next < current ? next : current;
}

function minutesBetween(start?: Date, end?: Date): number | null {
  if (!start || !end || end < start) return null;
  return (end.getTime() - start.getTime()) / 60000;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const value = sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  return Number(value.toFixed(1));
}

function bottleneckFor(stages: Record<StageName, number>) {
  const pairs: Array<{ label: string; from: StageName; to: StageName }> = [
    { label: "Visitor → registration", from: "views", to: "leads" },
    { label: "Lead → WhatsApp sent", from: "leads", to: "whatsappSent" },
    { label: "WhatsApp sent → delivered", from: "whatsappSent", to: "whatsappDelivered" },
    { label: "Lead → live joined", from: "leads", to: "masterclassJoined" },
    { label: "Live joined → 60m retained", from: "masterclassJoined", to: "masterclass60m" },
    { label: "Live offer → workshop page", from: "masterclassOfferSeen", to: "workshopOfferViews" },
    { label: "Workshop page → checkout", from: "workshopOfferViews", to: "workshopCheckoutStarts" },
    { label: "Workshop checkout → purchase", from: "workshopCheckoutStarts", to: "workshopPurchases" },
    { label: "Workshop purchase → attended", from: "workshopPurchases", to: "workshopAttended" },
    { label: "Core offer → checkout", from: "coreOfferSeen", to: "coreCheckoutStarts" },
    { label: "Core checkout → enrollment", from: "coreCheckoutStarts", to: "corePurchases" },
  ];
  const eligible = pairs
    .map((pair) => ({ ...pair, denominator: stages[pair.from], numerator: stages[pair.to], rate: percent(stages[pair.to], stages[pair.from]) }))
    .filter((item) => item.denominator >= 5)
    .sort((a, b) => a.rate - b.rate || (b.denominator - b.numerator) - (a.denominator - a.numerator));
  if (!eligible.length) return null;
  const item = eligible[0];
  return { label: item.label, rate: item.rate, from: item.denominator, to: item.numerator, drop: Math.max(0, item.denominator - item.numerator) };
}

function attributionGroup(event: {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  campaignId: string | null;
}): { key: string; source: string; medium: string; campaign: string; campaignId: string } {
  const source = event.source || "unattributed";
  const medium = event.medium || "unknown";
  const campaign = event.campaign || "Unattributed";
  const campaignId = event.campaignId || "";
  return { key: `${campaignId || campaign}::${source}::${medium}`, source, medium, campaign, campaignId };
}

function updateAttributionGroup(group: CampaignGroup, event: { eventName: string; eventValue: number | null; visitorId: string | null; leadId: string | null; id: string; eventId: string | null }) {
  const entity = identity(event);
  if (event.visitorId) group.visitors.add(event.visitorId);
  if (event.eventName === "generate_lead") group.leads.add(entity);
  else if (event.eventName === "purchase") group.entryPurchases.add(entity);
  else if (event.eventName === "workshop_purchase") group.workshopPurchases.add(entity);
  else if (event.eventName === "close_convert_lead") group.corePurchases.add(entity);
  const value = Math.max(0, event.eventValue || 0);
  if (["purchase", "workshop_purchase", "close_convert_lead"].includes(event.eventName)) group.grossRevenue += value;
  else if (event.eventName === "refund") group.refundValue += value;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const days = Math.min(180, Math.max(1, Number.parseInt(String(req.query.days || "30"), 10) || 30));
  const since = new Date(Date.now() - days * 86400000);
  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const firstContactSlaMinutes = Math.max(1, Number.parseInt(process.env.FUNNEL_FIRST_CONTACT_SLA_MINUTES || "15", 10) || 15);
  const whatsappSlaMinutes = Math.max(1, Number.parseInt(process.env.FUNNEL_WHATSAPP_SLA_MINUTES || "5", 10) || 5);

  try {
    const [events, payments] = await Promise.all([
      prisma.funnelEvent.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: "asc" },
        select: {
          id: true, eventId: true, eventName: true, visitorId: true, leadId: true, funnel: true, offerMode: true, eventValue: true, createdAt: true,
          source: true, medium: true, campaign: true, campaignId: true, adId: true,
        },
        take: 100000,
      }),
      prisma.funnelPayment.findMany({
        where: { createdAt: { gte: since } },
        select: { purpose: true, status: true, failureReason: true, failureCode: true, amountPaise: true, funnel: true, offerMode: true, createdAt: true },
        orderBy: { createdAt: "asc" },
        take: 100000,
      }),
    ]);

    const eventLeadIds = Array.from(new Set(events.flatMap((event) => event.leadId ? [event.leadId] : [])));
    const profiles: Array<{
      leadId: string; pipelineStage: string; owner: string | null; priority: string; advisorStatus: string; qualification: string | null; lostReason: string | null; nextFollowUpAt: Date | null; lastContactAt: Date | null;
    }> = [];
    for (let i = 0; i < eventLeadIds.length; i += 5000) {
      const chunk = eventLeadIds.slice(i, i + 5000);
      profiles.push(...await prisma.funnelCrmProfile.findMany({
        where: { leadId: { in: chunk } },
        select: { leadId: true, pipelineStage: true, owner: true, priority: true, advisorStatus: true, qualification: true, lostReason: true, nextFollowUpAt: true, lastContactAt: true },
      }));
    }

    const groups = new Map<string, Group>();
    const globalVisitors = new Set<string>();
    const globalStages = emptyStages();
    const globalRevenue = { entry: 0, workshop: 0, core: 0, refunds: 0 };
    const timelines = new Map<string, Timeline>();
    const campaignGroups = new Map<string, CampaignGroup>();
    const adGroups = new Map<string, AdGroup>();

    for (const event of events) {
      const funnel = event.funnel || "unknown";
      const offerMode = event.offerMode || "unknown";
      const key = `${funnel}:${offerMode}`;
      const group = groups.get(key) || emptyGroup(funnel, offerMode);
      const entity = identity(event);
      if (event.visitorId) {
        group.uniqueVisitors.add(event.visitorId);
        globalVisitors.add(event.visitorId);
      }
      if (event.leadId) group.leadIds.add(event.leadId);

      const stage = stageForEvent(event.eventName);
      if (stage) {
        group.stages[stage].add(entity);
        globalStages[stage].add(entity);
      }

      const value = Math.max(0, event.eventValue || 0);
      if (event.eventName === "purchase") { group.entryRevenue += value; globalRevenue.entry += value; }
      else if (event.eventName === "workshop_purchase") { group.workshopRevenue += value; globalRevenue.workshop += value; }
      else if (event.eventName === "close_convert_lead") { group.coreRevenue += value; globalRevenue.core += value; }
      else if (event.eventName === "refund") { group.refundValue += value; globalRevenue.refunds += value; }
      groups.set(key, group);

      if (event.leadId) {
        const timeline = timelines.get(event.leadId) || {};
        if (event.eventName === "generate_lead") timeline.generateLead = setEarliest(timeline.generateLead, event.createdAt);
        else if (event.eventName === "whatsapp_message_sent") timeline.whatsappSent = setEarliest(timeline.whatsappSent, event.createdAt);
        else if (event.eventName === "working_lead") timeline.workingLead = setEarliest(timeline.workingLead, event.createdAt);
        else if (event.eventName === "purchase") timeline.entryPurchase = setEarliest(timeline.entryPurchase, event.createdAt);
        timelines.set(event.leadId, timeline);
      }

      const attr = attributionGroup(event);
      const campaign = campaignGroups.get(attr.key) || { ...attr, visitors: new Set<string>(), leads: new Set<string>(), entryPurchases: new Set<string>(), workshopPurchases: new Set<string>(), corePurchases: new Set<string>(), grossRevenue: 0, refundValue: 0 };
      updateAttributionGroup(campaign, event);
      campaignGroups.set(attr.key, campaign);

      if (event.adId) {
        const adKey = `${event.adId}::${attr.key}`;
        const ad = adGroups.get(adKey) || { ...attr, key: adKey, adId: event.adId, visitors: new Set<string>(), leads: new Set<string>(), entryPurchases: new Set<string>(), workshopPurchases: new Set<string>(), corePurchases: new Set<string>(), grossRevenue: 0, refundValue: 0 };
        updateAttributionGroup(ad, event);
        adGroups.set(adKey, ad);
      }
    }

    const profileByLead = new Map(profiles.map((profile) => [profile.leadId, profile]));
    const timingsForLeadIds = (leadIds: Set<string>) => {
      const whatsappMinutes: number[] = [];
      const workingMinutes: number[] = [];
      const entryPurchaseMinutes: number[] = [];
      for (const leadId of leadIds) {
        const timeline = timelines.get(leadId);
        if (!timeline) continue;
        const wa = minutesBetween(timeline.generateLead, timeline.whatsappSent);
        const working = minutesBetween(timeline.generateLead, timeline.workingLead);
        const purchase = minutesBetween(timeline.generateLead, timeline.entryPurchase);
        if (wa !== null) whatsappMinutes.push(wa);
        if (working !== null) workingMinutes.push(working);
        if (purchase !== null) entryPurchaseMinutes.push(purchase);
      }
      return {
        medianLeadToWhatsappMinutes: median(whatsappMinutes),
        whatsappWithinSlaRate: percent(whatsappMinutes.filter((value) => value <= whatsappSlaMinutes).length, whatsappMinutes.length),
        medianLeadToWorkingMinutes: median(workingMinutes),
        firstContactWithinSlaRate: percent(workingMinutes.filter((value) => value <= firstContactSlaMinutes).length, workingMinutes.length),
        medianLeadToEntryPurchaseMinutes: median(entryPurchaseMinutes),
      };
    };

    const followupForLeadIds = (leadIds: Set<string>) => {
      let unassigned = 0;
      let overdue = 0;
      let dueNext24h = 0;
      let highPriorityOpen = 0;
      let advisorPending = 0;
      let neverContacted = 0;
      for (const leadId of leadIds) {
        const profile = profileByLead.get(leadId);
        if (!profile) {
          neverContacted += 1;
          unassigned += 1;
          continue;
        }
        const pipeline = profile.pipelineStage.toLowerCase();
        const open = !profile.lostReason && !terminalPipelineStages.has(pipeline);
        if (!open) continue;
        if (!profile.owner) unassigned += 1;
        if (profile.nextFollowUpAt && profile.nextFollowUpAt < now) overdue += 1;
        if (profile.nextFollowUpAt && profile.nextFollowUpAt >= now && profile.nextFollowUpAt <= next24h) dueNext24h += 1;
        if (["high", "urgent"].includes(profile.priority.toLowerCase())) highPriorityOpen += 1;
        if (["requested", "scheduled", "in_progress", "follow_up", "pending"].includes(profile.advisorStatus.toLowerCase())) advisorPending += 1;
        if (!profile.lastContactAt && !timelines.get(leadId)?.workingLead) neverContacted += 1;
      }
      return { unassigned, overdue, dueNext24h, highPriorityOpen, advisorPending, neverContacted };
    };

    const rows = Array.from(groups.values()).map((group) => {
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
        whatsappFailureRate: percent(s.whatsappFailed, s.whatsappSent),
        communityJoinFromReadRate: percent(s.communityJoined, s.whatsappRead),
        communityJoinFromLeadRate: percent(s.communityJoined, s.leads),
        checkoutConversionRate: percent(s.entryPurchases, s.checkoutStarts),
        entryCheckoutAbandonRate: percent(Math.max(0, s.checkoutStarts - s.entryPurchases), s.checkoutStarts),
        showUpRate: percent(s.masterclassJoined, s.leads),
        retention30Rate: percent(s.masterclass30m, s.masterclassJoined),
        retention60Rate: percent(s.masterclass60m, s.masterclassJoined),
        liveOfferToWorkshopPageRate: percent(s.workshopOfferViews, s.masterclassOfferSeen),
        workshopPageToCheckoutRate: percent(s.workshopCheckoutStarts, s.workshopOfferViews),
        workshopCheckoutConversionRate: percent(s.workshopPurchases, s.workshopCheckoutStarts),
        workshopCheckoutAbandonRate: percent(Math.max(0, s.workshopCheckoutStarts - s.workshopPurchases), s.workshopCheckoutStarts),
        workshopBuyerRate: percent(s.workshopPurchases, s.masterclassOfferSeen),
        leadToWorkshopPurchaseRate: percent(s.workshopPurchases, s.leads),
        workshopAttendanceRate: percent(s.workshopAttended, s.workshopPurchases),
        advisorClickRate: percent(s.advisorClicks, s.coreOfferSeen),
        coreOfferToCheckoutRate: percent(s.coreCheckoutStarts, s.coreOfferSeen),
        coreCheckoutConversionRate: percent(s.corePurchases, s.coreCheckoutStarts),
        coreCheckoutAbandonRate: percent(Math.max(0, s.coreCheckoutStarts - s.corePurchases), s.coreCheckoutStarts),
        coreOfferConversionRate: percent(s.corePurchases, s.coreOfferSeen),
        leadToCorePurchaseRate: percent(s.corePurchases, s.leads),
        workshopBuyerToCoreRate: percent(s.corePurchases, s.workshopPurchases),
        workshopAttendeeToCoreRate: percent(s.corePurchases, s.workshopAttended),
        entryRevenue: group.entryRevenue,
        workshopRevenue: group.workshopRevenue,
        coreRevenue: group.coreRevenue,
        grossRevenue,
        refundValue: group.refundValue,
        refundRate: percent(group.refundValue, grossRevenue),
        netRevenue,
        revenuePerLead: ratio(netRevenue, s.leads),
        revenuePerVisitor: ratio(netRevenue, group.uniqueVisitors.size),
        ...timingsForLeadIds(group.leadIds),
        followup: followupForLeadIds(group.leadIds),
        bottleneck: bottleneckFor(s),
      };
    }).sort((a, b) => `${a.funnel}:${a.offerMode}`.localeCompare(`${b.funnel}:${b.offerMode}`));

    const globalStageCounts = Object.fromEntries(stageNames.map((name) => [name, globalStages[name].size])) as Record<StageName, number>;
    const globalLeadIds = new Set<string>(eventLeadIds);
    const grossRevenue = globalRevenue.entry + globalRevenue.workshop + globalRevenue.core;
    const netRevenue = Math.max(0, grossRevenue - globalRevenue.refunds);
    const globalTimings = timingsForLeadIds(globalLeadIds);
    const followup = followupForLeadIds(globalLeadIds);

    const summary = {
      uniqueVisitors: globalVisitors.size,
      ...globalStageCounts,
      entryRevenue: globalRevenue.entry,
      workshopRevenue: globalRevenue.workshop,
      coreRevenue: globalRevenue.core,
      grossRevenue,
      refundValue: globalRevenue.refunds,
      refundRate: percent(globalRevenue.refunds, grossRevenue),
      netRevenue,
      revenuePerLead: ratio(netRevenue, globalStageCounts.leads),
      revenuePerVisitor: ratio(netRevenue, globalVisitors.size),
      leadConversionRate: percent(globalStageCounts.leads, globalStageCounts.views),
      showUpRate: percent(globalStageCounts.masterclassJoined, globalStageCounts.leads),
      leadToWorkshopPurchaseRate: percent(globalStageCounts.workshopPurchases, globalStageCounts.leads),
      leadToCorePurchaseRate: percent(globalStageCounts.corePurchases, globalStageCounts.leads),
      workshopBuyerToCoreRate: percent(globalStageCounts.corePurchases, globalStageCounts.workshopPurchases),
      whatsappDeliveryRate: percent(globalStageCounts.whatsappDelivered, globalStageCounts.whatsappSent),
      whatsappReadRate: percent(globalStageCounts.whatsappRead, globalStageCounts.whatsappDelivered),
      ...globalTimings,
      followup,
      bottleneck: bottleneckFor(globalStageCounts),
    };

    const campaigns = Array.from(campaignGroups.values()).map((group) => {
      const net = Math.max(0, group.grossRevenue - group.refundValue);
      return {
        source: group.source,
        medium: group.medium,
        campaign: group.campaign,
        campaignId: group.campaignId,
        visitors: group.visitors.size,
        leads: group.leads.size,
        entryPurchases: group.entryPurchases.size,
        workshopPurchases: group.workshopPurchases.size,
        corePurchases: group.corePurchases.size,
        leadConversionRate: percent(group.leads.size, group.visitors.size),
        leadToCorePurchaseRate: percent(group.corePurchases.size, group.leads.size),
        grossRevenue: group.grossRevenue,
        refundValue: group.refundValue,
        netRevenue: net,
        revenuePerLead: ratio(net, group.leads.size),
        revenuePerVisitor: ratio(net, group.visitors.size),
      };
    }).filter((row) => row.visitors || row.leads || row.netRevenue).sort((a, b) => b.netRevenue - a.netRevenue || b.corePurchases - a.corePurchases || b.leads - a.leads).slice(0, 50);

    const ads = Array.from(adGroups.values()).map((group) => {
      const net = Math.max(0, group.grossRevenue - group.refundValue);
      return {
        adId: group.adId,
        campaign: group.campaign,
        campaignId: group.campaignId,
        source: group.source,
        visitors: group.visitors.size,
        leads: group.leads.size,
        entryPurchases: group.entryPurchases.size,
        workshopPurchases: group.workshopPurchases.size,
        corePurchases: group.corePurchases.size,
        leadToCorePurchaseRate: percent(group.corePurchases.size, group.leads.size),
        netRevenue: net,
        revenuePerLead: ratio(net, group.leads.size),
      };
    }).sort((a, b) => b.netRevenue - a.netRevenue || b.corePurchases - a.corePurchases || b.leads - a.leads).slice(0, 50);

    const paymentByPurpose = new Map<string, { attempts: number; captured: number; failed: number; refunded: number; pending: number; amountAttempted: number }>();
    const failureReasons = new Map<string, number>();
    for (const payment of payments) {
      const stats = paymentByPurpose.get(payment.purpose) || { attempts: 0, captured: 0, failed: 0, refunded: 0, pending: 0, amountAttempted: 0 };
      stats.attempts += 1;
      stats.amountAttempted += payment.amountPaise / 100;
      const status = payment.status.toLowerCase();
      if (status === "captured" || status === "paid") stats.captured += 1;
      else if (status.includes("refund")) stats.refunded += 1;
      else if (status === "failed") stats.failed += 1;
      else stats.pending += 1;
      paymentByPurpose.set(payment.purpose, stats);
      if (status === "failed") {
        const reason = payment.failureReason || payment.failureCode || "Unspecified payment failure";
        failureReasons.set(reason, (failureReasons.get(reason) || 0) + 1);
      }
    }
    const paymentHealth = Array.from(paymentByPurpose.entries()).map(([purpose, stats]) => ({
      purpose,
      ...stats,
      captureRate: percent(stats.captured, stats.attempts),
      failureRate: percent(stats.failed, stats.attempts),
    })).sort((a, b) => a.purpose.localeCompare(b.purpose));
    const topPaymentFailures = Array.from(failureReasons.entries()).map(([reason, count]) => ({ reason, count })).sort((a, b) => b.count - a.count).slice(0, 10);

    return res.status(200).json({
      ok: true,
      rangeDays: days,
      since: since.toISOString(),
      generatedAt: now.toISOString(),
      sla: { firstContactMinutes: firstContactSlaMinutes, whatsappMinutes: whatsappSlaMinutes },
      spendConnected: false,
      summary,
      rows,
      campaigns,
      ads,
      paymentHealth,
      topPaymentFailures,
      note: "Decision Intelligence uses first-party FunnelEvent, FunnelPayment and Funnel CRM data. Visitors are globally deduplicated across cohorts. Revenue/lead and revenue/visitor are tracked net revenue metrics. Meta spend, CPL, CAC and ROAS are intentionally not shown until a verified Meta Ads reporting source is connected; no spend figures are fabricated.",
    });
  } catch (error) {
    console.error("Funnel dashboard failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to load funnel dashboard" });
  }
}
