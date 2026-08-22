import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";
import {
  CRM_ADVISOR_STATUSES,
  CRM_PIPELINE_STAGES,
  CRM_PRIORITIES,
  deriveLifecycle,
  deriveRevenue,
  latestTimestamp,
  parseFunnelSource,
  parseLeadNotes,
} from "../../../lib/funnel/crm";

function value(input: unknown, max = 120) {
  return typeof input === "string" ? input.trim().slice(0, max) : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const q = value(req.query.q, 160);
  const funnel = value(req.query.funnel, 20);
  const offerMode = value(req.query.offerMode, 20);
  const pipelineStage = value(req.query.pipelineStage, 40);
  const owner = value(req.query.owner, 120);
  const priority = value(req.query.priority, 20);
  const advisorStatus = value(req.query.advisorStatus, 40);
  const followUp = value(req.query.followUp, 20);
  const take = Math.min(100, Math.max(10, Number.parseInt(String(req.query.take || "40"), 10) || 40));
  const skip = Math.max(0, Number.parseInt(String(req.query.skip || "0"), 10) || 0);

  const where: any = { source: { startsWith: "funnel:" } };

  if (["chatgpt", "claude"].includes(funnel) && ["free", "paid"].includes(offerMode)) {
    where.source = `funnel:${funnel}:${offerMode}`;
  } else if (["chatgpt", "claude"].includes(funnel)) {
    where.source = { startsWith: `funnel:${funnel}:` };
  } else if (["free", "paid"].includes(offerMode)) {
    where.OR = [
      { source: `funnel:chatgpt:${offerMode}` },
      { source: `funnel:claude:${offerMode}` },
    ];
  }

  if (q) {
    const search = [
      { name: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { notes: { contains: q, mode: "insensitive" } },
    ];
    if (where.OR) {
      where.AND = [{ OR: where.OR }, { OR: search }];
      delete where.OR;
      delete where.source;
    } else {
      where.OR = search;
    }
  }

  const profileFilters: any = {};
  if (CRM_PRIORITIES.includes(priority as any)) profileFilters.priority = priority;
  if (CRM_ADVISOR_STATUSES.includes(advisorStatus as any)) profileFilters.advisorStatus = advisorStatus;
  if (owner) profileFilters.owner = owner;

  const now = new Date();
  if (followUp === "overdue") profileFilters.nextFollowUpAt = { lt: now };
  if (followUp === "next_24h") {
    profileFilters.nextFollowUpAt = { gte: now, lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) };
  }
  if (followUp === "none") profileFilters.nextFollowUpAt = null;

  if (CRM_PIPELINE_STAGES.includes(pipelineStage as any)) {
    if (pipelineStage === "new_lead" && !Object.keys(profileFilters).length) {
      where.AND = [
        ...(Array.isArray(where.AND) ? where.AND : []),
        { OR: [{ funnelCrmProfile: null }, { funnelCrmProfile: { pipelineStage: "new_lead" } }] },
      ];
    } else {
      profileFilters.pipelineStage = pipelineStage;
    }
  }

  if (Object.keys(profileFilters).length) where.funnelCrmProfile = profileFilters;

  try {
    const [items, total, overdueFollowUps, urgentLeads, enrolledCore] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
        select: {
          id: true,
          name: true,
          phone: true,
          source: true,
          status: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
          funnelCrmProfile: true,
        },
      }),
      prisma.lead.count({ where }),
      prisma.funnelCrmProfile.count({
        where: { nextFollowUpAt: { lt: now }, lead: { source: { startsWith: "funnel:" } } },
      }),
      prisma.funnelCrmProfile.count({
        where: { priority: "urgent", lead: { source: { startsWith: "funnel:" } } },
      }),
      prisma.lead.count({ where: { source: { startsWith: "funnel:" }, status: "enrolled_ai_expert" } }),
    ]);

    const leadIds = items.map((item) => item.id);
    const [events, payments] = leadIds.length
      ? await Promise.all([
          prisma.funnelEvent.findMany({
            where: { leadId: { in: leadIds } },
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              leadId: true,
              eventName: true,
              eventValue: true,
              campaign: true,
              campaignId: true,
              adsetId: true,
              adId: true,
              createdAt: true,
            },
          }),
          prisma.funnelPayment.findMany({
            where: { leadId: { in: leadIds } },
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              leadId: true,
              purpose: true,
              status: true,
              amountPaise: true,
              paidAt: true,
              createdAt: true,
            },
          }),
        ])
      : [[], []];

    const eventsByLead = new Map<string, typeof events>();
    const paymentsByLead = new Map<string, typeof payments>();
    for (const event of events) {
      if (!event.leadId) continue;
      const group = eventsByLead.get(event.leadId) || [];
      group.push(event);
      eventsByLead.set(event.leadId, group);
    }
    for (const payment of payments) {
      const group = paymentsByLead.get(payment.leadId) || [];
      group.push(payment);
      paymentsByLead.set(payment.leadId, group);
    }

    const rows = items.map((lead) => {
      const leadEvents = eventsByLead.get(lead.id) || [];
      const leadPayments = paymentsByLead.get(lead.id) || [];
      const notes = parseLeadNotes(lead.notes);
      const source = parseFunnelSource(lead.source);
      const lifecycle = deriveLifecycle(leadEvents, leadPayments);
      const revenue = deriveRevenue(leadEvents);
      const latestAt = latestTimestamp(leadEvents, leadPayments, lead.updatedAt);
      const attribution = notes.attribution && typeof notes.attribution === "object" ? notes.attribution : {};
      const latestAttributedEvent = [...leadEvents].reverse().find((event) => event.campaignId || event.adId || event.campaign);

      return {
        id: lead.id,
        name: lead.name || "Unnamed learner",
        phone: lead.phone || "",
        email: typeof notes.email === "string" ? notes.email : "",
        source,
        rawStatus: lead.status || "",
        createdAt: lead.createdAt.toISOString(),
        latestAt,
        lifecycle,
        revenue,
        crm: lead.funnelCrmProfile || {
          pipelineStage: "new_lead",
          owner: null,
          priority: "normal",
          advisorStatus: "not_started",
          qualification: null,
          lostReason: null,
          nextFollowUpAt: null,
          lastContactAt: null,
          updatedBy: null,
        },
        attribution: {
          source: attribution.utmSource || "",
          medium: attribution.utmMedium || "",
          campaign: latestAttributedEvent?.campaign || attribution.utmCampaign || "",
          campaignId: latestAttributedEvent?.campaignId || attribution.campaignId || "",
          adsetId: latestAttributedEvent?.adsetId || attribution.adsetId || "",
          adId: latestAttributedEvent?.adId || attribution.adId || "",
        },
      };
    });

    return res.status(200).json({
      ok: true,
      total,
      take,
      skip,
      summary: { overdueFollowUps, urgentLeads, enrolledCore },
      items: rows,
      filters: {
        pipelineStages: CRM_PIPELINE_STAGES,
        priorities: CRM_PRIORITIES,
        advisorStatuses: CRM_ADVISOR_STATUSES,
      },
    });
  } catch (error) {
    console.error("Funnel CRM list failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to load funnel CRM" });
  }
}
