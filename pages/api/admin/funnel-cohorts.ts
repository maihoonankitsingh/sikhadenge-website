import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

type Registration = {
  leadId: string;
  createdAt: Date;
  funnel: string;
  offerMode: string;
  source: string;
  medium: string;
  campaign: string;
  campaignId: string;
  adId: string;
};

type LeadOutcome = {
  entryPurchase: boolean;
  masterclassJoined: boolean;
  masterclass60m: boolean;
  workshopPurchase: boolean;
  workshopAttended: boolean;
  corePurchase: boolean;
  lost: boolean;
  refundEvents: number;
  entryRevenue: number;
  workshopRevenue: number;
  coreRevenue: number;
  refundValue: number;
};

type Aggregate = {
  leads: Set<string>;
  entryPurchases: Set<string>;
  masterclassJoined: Set<string>;
  masterclass60m: Set<string>;
  workshopPurchases: Set<string>;
  workshopAttended: Set<string>;
  corePurchases: Set<string>;
  lostLeads: Set<string>;
  refundLeads: Set<string>;
  entryRevenue: number;
  workshopRevenue: number;
  coreRevenue: number;
  refundValue: number;
  agesDays: number[];
  age7dPlus: number;
  age14dPlus: number;
  age30dPlus: number;
};

function emptyAggregate(): Aggregate {
  return {
    leads: new Set<string>(), entryPurchases: new Set<string>(), masterclassJoined: new Set<string>(), masterclass60m: new Set<string>(), workshopPurchases: new Set<string>(), workshopAttended: new Set<string>(), corePurchases: new Set<string>(), lostLeads: new Set<string>(), refundLeads: new Set<string>(),
    entryRevenue: 0, workshopRevenue: 0, coreRevenue: 0, refundValue: 0, agesDays: [], age7dPlus: 0, age14dPlus: 0, age30dPlus: 0,
  };
}

function percent(n: number, d: number) {
  return d ? Number(((n / d) * 100).toFixed(2)) : 0;
}
function ratio(n: number, d: number) {
  return d ? Number((n / d).toFixed(2)) : 0;
}
function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return Number((sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2).toFixed(1));
}

function finalise(aggregate: Aggregate) {
  const leads = aggregate.leads.size;
  const grossRevenue = aggregate.entryRevenue + aggregate.workshopRevenue + aggregate.coreRevenue;
  const netRevenue = Math.max(0, grossRevenue - aggregate.refundValue);
  return {
    leads,
    entryPurchases: aggregate.entryPurchases.size,
    masterclassJoined: aggregate.masterclassJoined.size,
    masterclass60m: aggregate.masterclass60m.size,
    workshopPurchases: aggregate.workshopPurchases.size,
    workshopAttended: aggregate.workshopAttended.size,
    corePurchases: aggregate.corePurchases.size,
    lostLeads: aggregate.lostLeads.size,
    refundLeads: aggregate.refundLeads.size,
    entryPurchaseRate: percent(aggregate.entryPurchases.size, leads),
    showUpRate: percent(aggregate.masterclassJoined.size, leads),
    retention60Rate: percent(aggregate.masterclass60m.size, aggregate.masterclassJoined.size),
    leadToWorkshopRate: percent(aggregate.workshopPurchases.size, leads),
    workshopAttendanceRate: percent(aggregate.workshopAttended.size, aggregate.workshopPurchases.size),
    workshopToCoreRate: percent(aggregate.corePurchases.size, aggregate.workshopPurchases.size),
    leadToCoreRate: percent(aggregate.corePurchases.size, leads),
    entryRevenue: aggregate.entryRevenue,
    workshopRevenue: aggregate.workshopRevenue,
    coreRevenue: aggregate.coreRevenue,
    grossRevenue,
    refundValue: aggregate.refundValue,
    refundRate: percent(aggregate.refundValue, grossRevenue),
    netRevenue,
    revenuePerLead: ratio(netRevenue, leads),
    medianLeadAgeDays: median(aggregate.agesDays),
    age7dPlus: aggregate.age7dPlus,
    age14dPlus: aggregate.age14dPlus,
    age30dPlus: aggregate.age30dPlus,
  };
}

function applyLead(aggregate: Aggregate, leadId: string, registration: Registration, outcome: LeadOutcome, now: Date) {
  aggregate.leads.add(leadId);
  if (outcome.entryPurchase) aggregate.entryPurchases.add(leadId);
  if (outcome.masterclassJoined) aggregate.masterclassJoined.add(leadId);
  if (outcome.masterclass60m) aggregate.masterclass60m.add(leadId);
  if (outcome.workshopPurchase) aggregate.workshopPurchases.add(leadId);
  if (outcome.workshopAttended) aggregate.workshopAttended.add(leadId);
  if (outcome.corePurchase) aggregate.corePurchases.add(leadId);
  if (outcome.lost) aggregate.lostLeads.add(leadId);
  if (outcome.refundEvents > 0) aggregate.refundLeads.add(leadId);
  aggregate.entryRevenue += outcome.entryRevenue;
  aggregate.workshopRevenue += outcome.workshopRevenue;
  aggregate.coreRevenue += outcome.coreRevenue;
  aggregate.refundValue += outcome.refundValue;
  const age = Math.max(0, (now.getTime() - registration.createdAt.getTime()) / 86400000);
  aggregate.agesDays.push(age);
  if (age >= 7) aggregate.age7dPlus += 1;
  if (age >= 14) aggregate.age14dPlus += 1;
  if (age >= 30) aggregate.age30dPlus += 1;
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

  try {
    const registrationEvents = await prisma.funnelEvent.findMany({
      where: { eventName: "generate_lead", createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
      select: { leadId: true, createdAt: true, funnel: true, offerMode: true, source: true, medium: true, campaign: true, campaignId: true, adId: true },
      take: 50000,
    });

    const registrations = new Map<string, Registration>();
    for (const event of registrationEvents) {
      if (!event.leadId || registrations.has(event.leadId)) continue;
      registrations.set(event.leadId, {
        leadId: event.leadId,
        createdAt: event.createdAt,
        funnel: event.funnel || "unknown",
        offerMode: event.offerMode || "unknown",
        source: event.source || "unattributed",
        medium: event.medium || "unknown",
        campaign: event.campaign || "Unattributed",
        campaignId: event.campaignId || "",
        adId: event.adId || "",
      });
    }

    const outcomes = new Map<string, LeadOutcome>();
    const leadIds = Array.from(registrations.keys());
    for (const leadId of leadIds) outcomes.set(leadId, { entryPurchase: false, masterclassJoined: false, masterclass60m: false, workshopPurchase: false, workshopAttended: false, corePurchase: false, lost: false, refundEvents: 0, entryRevenue: 0, workshopRevenue: 0, coreRevenue: 0, refundValue: 0 });

    for (let i = 0; i < leadIds.length; i += 3000) {
      const chunk = leadIds.slice(i, i + 3000);
      const events = await prisma.funnelEvent.findMany({
        where: { leadId: { in: chunk } },
        select: { leadId: true, eventName: true, eventValue: true, createdAt: true },
        orderBy: { createdAt: "asc" },
        take: 100000,
      });
      for (const event of events) {
        if (!event.leadId) continue;
        const outcome = outcomes.get(event.leadId);
        if (!outcome) continue;
        const value = Math.max(0, event.eventValue || 0);
        if (event.eventName === "purchase") { outcome.entryPurchase = true; outcome.entryRevenue += value; }
        else if (event.eventName === "masterclass_joined") outcome.masterclassJoined = true;
        else if (event.eventName === "masterclass_60m") outcome.masterclass60m = true;
        else if (event.eventName === "workshop_purchase") { outcome.workshopPurchase = true; outcome.workshopRevenue += value; }
        else if (event.eventName === "workshop_attended") outcome.workshopAttended = true;
        else if (event.eventName === "close_convert_lead") { outcome.corePurchase = true; outcome.coreRevenue += value; }
        else if (event.eventName === "close_unconvert_lead") outcome.lost = true;
        else if (event.eventName === "refund") { outcome.refundEvents += 1; outcome.refundValue += value; }
      }
    }

    const global = emptyAggregate();
    const cohorts = new Map<string, Aggregate>();
    const campaigns = new Map<string, Aggregate>();
    const campaignMeta = new Map<string, { source:string;medium:string;campaign:string;campaignId:string }>();
    const ads = new Map<string, Aggregate>();
    const adMeta = new Map<string, { adId:string;campaign:string;campaignId:string;source:string }>();

    for (const [leadId, registration] of registrations) {
      const outcome = outcomes.get(leadId)!;
      applyLead(global, leadId, registration, outcome, now);

      const cohortKey = `${registration.funnel}:${registration.offerMode}`;
      const cohort = cohorts.get(cohortKey) || emptyAggregate();
      applyLead(cohort, leadId, registration, outcome, now);
      cohorts.set(cohortKey, cohort);

      const campaignKey = `${registration.campaignId || registration.campaign}::${registration.source}::${registration.medium}`;
      const campaign = campaigns.get(campaignKey) || emptyAggregate();
      applyLead(campaign, leadId, registration, outcome, now);
      campaigns.set(campaignKey, campaign);
      campaignMeta.set(campaignKey, { source: registration.source, medium: registration.medium, campaign: registration.campaign, campaignId: registration.campaignId });

      if (registration.adId) {
        const adKey = `${registration.adId}::${campaignKey}`;
        const ad = ads.get(adKey) || emptyAggregate();
        applyLead(ad, leadId, registration, outcome, now);
        ads.set(adKey, ad);
        adMeta.set(adKey, { adId: registration.adId, campaign: registration.campaign, campaignId: registration.campaignId, source: registration.source });
      }
    }

    const rows = Array.from(cohorts.entries()).map(([key, aggregate]) => {
      const [funnel, offerMode] = key.split(":");
      return { funnel, offerMode, ...finalise(aggregate) };
    }).sort((a, b) => `${a.funnel}:${a.offerMode}`.localeCompare(`${b.funnel}:${b.offerMode}`));

    const campaignRows = Array.from(campaigns.entries()).map(([key, aggregate]) => ({ ...campaignMeta.get(key)!, ...finalise(aggregate) }))
      .sort((a, b) => b.netRevenue - a.netRevenue || b.corePurchases - a.corePurchases || b.leads - a.leads).slice(0, 50);
    const adRows = Array.from(ads.entries()).map(([key, aggregate]) => ({ ...adMeta.get(key)!, ...finalise(aggregate) }))
      .sort((a, b) => b.netRevenue - a.netRevenue || b.corePurchases - a.corePurchases || b.leads - a.leads).slice(0, 50);

    return res.status(200).json({
      ok: true,
      acquisitionWindowDays: days,
      since: since.toISOString(),
      generatedAt: now.toISOString(),
      summary: finalise(global),
      rows,
      campaigns: campaignRows,
      ads: adRows,
      note: "Cohort Economics selects leads by generate_lead date inside the chosen acquisition window, then follows those same lead IDs through all downstream first-party events available up to now. Revenue is lifetime-to-date revenue from that acquisition cohort, not cash collected only inside the selected calendar window. Maturity counts (7d/14d/30d+) are shown because recent cohorts have had less time to reach workshop or AI Expert conversion.",
    });
  } catch (error) {
    console.error("Funnel cohort analytics failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to load cohort economics" });
  }
}
