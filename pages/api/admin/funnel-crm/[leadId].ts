import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";
import {
  CRM_ADVISOR_STATUSES,
  CRM_LOST_REASONS,
  CRM_PIPELINE_STAGES,
  CRM_PRIORITIES,
  CRM_QUALIFICATIONS,
  deriveLifecycle,
  deriveRevenue,
  isAllowedValue,
  parseFunnelSource,
  parseLeadNotes,
} from "../../../../lib/funnel/crm";

function text(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function nullableText(value: unknown, max = 500) {
  if (value === null || value === "") return null;
  const result = text(value, max);
  return result || null;
}

function dateOrNull(value: unknown) {
  if (value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed : undefined;
}

function serial(value: unknown) {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const leadId = text(req.query.leadId, 120);
  if (!leadId) return res.status(400).json({ ok: false, error: "Invalid lead id" });

  if (req.method === "GET") {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
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
          funnelCrmActivities: {
            orderBy: { createdAt: "desc" },
            take: 100,
          },
        },
      });
      if (!lead || !String(lead.source || "").startsWith("funnel:")) {
        return res.status(404).json({ ok: false, error: "Funnel learner not found" });
      }

      const [events, payments] = await Promise.all([
        prisma.funnelEvent.findMany({
          where: { leadId },
          orderBy: { createdAt: "desc" },
          take: 300,
        }),
        prisma.funnelPayment.findMany({
          where: { leadId },
          orderBy: { createdAt: "desc" },
          take: 100,
        }),
      ]);

      const notes = parseLeadNotes(lead.notes);
      const source = parseFunnelSource(lead.source);
      const lifecycle = deriveLifecycle([...events].reverse(), [...payments].reverse());
      const revenue = deriveRevenue(events);
      const attribution = notes.attribution && typeof notes.attribution === "object" ? notes.attribution : {};

      const timeline = [
        ...events.map((event) => ({
          id: `event:${event.id}`,
          type: "funnel_event",
          title: event.eventName,
          at: event.createdAt.toISOString(),
          value: event.eventValue,
          metadata: event.metadata,
        })),
        ...payments.map((payment) => ({
          id: `payment:${payment.id}`,
          type: "payment",
          title: `${payment.purpose}:${payment.status}`,
          at: (payment.paidAt || payment.failedAt || payment.refundedAt || payment.createdAt).toISOString(),
          value: payment.amountPaise / 100,
          metadata: {
            provider: payment.provider,
            purpose: payment.purpose,
            status: payment.status,
            orderId: payment.providerOrderId,
            paymentId: payment.providerPaymentId,
            failureCode: payment.failureCode,
            failureReason: payment.failureReason,
          },
        })),
        ...lead.funnelCrmActivities.map((activity) => ({
          id: `crm:${activity.id}`,
          type: "crm_activity",
          title: activity.activityType,
          at: activity.createdAt.toISOString(),
          value: null,
          metadata: {
            field: activity.field,
            oldValue: activity.oldValue,
            newValue: activity.newValue,
            note: activity.note,
            adminId: activity.adminId,
            extra: activity.metadata,
          },
        })),
      ]
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, 300);

      return res.status(200).json({
        ok: true,
        learner: {
          id: lead.id,
          name: lead.name || "Unnamed learner",
          phone: lead.phone || "",
          email: typeof notes.email === "string" ? notes.email : "",
          source,
          rawStatus: lead.status || "",
          createdAt: lead.createdAt.toISOString(),
          updatedAt: lead.updatedAt.toISOString(),
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
            utmSource: attribution.utmSource || "",
            utmMedium: attribution.utmMedium || "",
            utmCampaign: attribution.utmCampaign || "",
            utmContent: attribution.utmContent || "",
            utmTerm: attribution.utmTerm || "",
            campaignId: attribution.campaignId || "",
            adsetId: attribution.adsetId || "",
            adId: attribution.adId || "",
            fbclid: attribution.fbclid || "",
            gclid: attribution.gclid || "",
            landingVariant: attribution.landingVariant || "",
          },
          registration: {
            occupation: notes.occupation || "",
            goal: notes.goal || "",
            laptop: notes.laptop || "",
            batchId: notes.batchId || "",
            offerMode: notes.offerMode || source.offerMode,
          },
        },
        payments,
        events,
        activities: lead.funnelCrmActivities,
        timeline,
        options: {
          pipelineStages: CRM_PIPELINE_STAGES,
          priorities: CRM_PRIORITIES,
          advisorStatuses: CRM_ADVISOR_STATUSES,
          qualifications: CRM_QUALIFICATIONS,
          lostReasons: CRM_LOST_REASONS,
        },
      });
    } catch (error) {
      console.error("Funnel CRM learner detail failed:", error);
      return res.status(500).json({ ok: false, error: "Unable to load learner" });
    }
  }

  if (req.method === "PATCH") {
    const body = req.body || {};
    const updates: Record<string, any> = {};

    if (body.pipelineStage !== undefined) {
      if (!isAllowedValue(body.pipelineStage, CRM_PIPELINE_STAGES)) return res.status(400).json({ ok: false, error: "Invalid pipeline stage" });
      updates.pipelineStage = body.pipelineStage;
    }
    if (body.priority !== undefined) {
      if (!isAllowedValue(body.priority, CRM_PRIORITIES)) return res.status(400).json({ ok: false, error: "Invalid priority" });
      updates.priority = body.priority;
    }
    if (body.advisorStatus !== undefined) {
      if (!isAllowedValue(body.advisorStatus, CRM_ADVISOR_STATUSES)) return res.status(400).json({ ok: false, error: "Invalid advisor status" });
      updates.advisorStatus = body.advisorStatus;
    }
    if (body.qualification !== undefined) {
      if (body.qualification !== null && body.qualification !== "" && !isAllowedValue(body.qualification, CRM_QUALIFICATIONS)) {
        return res.status(400).json({ ok: false, error: "Invalid qualification" });
      }
      updates.qualification = nullableText(body.qualification, 40);
    }
    if (body.lostReason !== undefined) {
      if (body.lostReason !== null && body.lostReason !== "" && !isAllowedValue(body.lostReason, CRM_LOST_REASONS)) {
        return res.status(400).json({ ok: false, error: "Invalid lost reason" });
      }
      updates.lostReason = nullableText(body.lostReason, 60);
    }
    if (body.owner !== undefined) updates.owner = nullableText(body.owner, 120);

    if (body.nextFollowUpAt !== undefined) {
      const parsed = dateOrNull(body.nextFollowUpAt);
      if (parsed === undefined) return res.status(400).json({ ok: false, error: "Invalid follow-up date" });
      updates.nextFollowUpAt = parsed;
    }
    if (body.lastContactAt !== undefined) {
      const parsed = dateOrNull(body.lastContactAt);
      if (parsed === undefined) return res.status(400).json({ ok: false, error: "Invalid contact date" });
      updates.lastContactAt = parsed;
    }
    if (body.markContacted === true) updates.lastContactAt = new Date();

    const note = nullableText(body.note, 2000);
    if (!Object.keys(updates).length && !note) {
      return res.status(400).json({ ok: false, error: "Nothing to update" });
    }

    try {
      const lead = await prisma.lead.findUnique({ where: { id: leadId }, select: { id: true, source: true } });
      if (!lead || !String(lead.source || "").startsWith("funnel:")) {
        return res.status(404).json({ ok: false, error: "Funnel learner not found" });
      }

      const result = await prisma.$transaction(async (tx) => {
        const existing = await tx.funnelCrmProfile.findUnique({ where: { leadId } });
        const before: Record<string, any> = existing || {
          pipelineStage: "new_lead",
          owner: null,
          priority: "normal",
          advisorStatus: "not_started",
          qualification: null,
          lostReason: null,
          nextFollowUpAt: null,
          lastContactAt: null,
        };

        const profile = await tx.funnelCrmProfile.upsert({
          where: { leadId },
          update: { ...updates, updatedBy: admin.sub },
          create: { leadId, ...updates, updatedBy: admin.sub },
        });

        const activityRows: Prisma.FunnelCrmActivityCreateManyInput[] = [];
        for (const [field, nextValue] of Object.entries(updates)) {
          const oldValue = before[field];
          if (serial(oldValue) === serial(nextValue)) continue;
          activityRows.push({
            leadId,
            activityType: "field_changed",
            field,
            oldValue: serial(oldValue),
            newValue: serial(nextValue),
            adminId: admin.sub,
          });
        }
        if (note) {
          activityRows.push({
            leadId,
            activityType: "note_added",
            note,
            adminId: admin.sub,
          });
        }
        if (activityRows.length) await tx.funnelCrmActivity.createMany({ data: activityRows });
        return profile;
      });

      return res.status(200).json({ ok: true, crm: result });
    } catch (error) {
      console.error("Funnel CRM learner update failed:", error);
      return res.status(500).json({ ok: false, error: "Unable to update learner" });
    }
  }

  res.setHeader("Allow", "GET, PATCH");
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
