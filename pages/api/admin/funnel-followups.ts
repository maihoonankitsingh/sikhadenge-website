import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

type Step = {
  messageType: string;
  journeyStage: string;
  templateName: string;
  messages: Set<string>;
  leads: Set<string>;
  sent: Set<string>;
  delivered: Set<string>;
  read: Set<string>;
  failed: Set<string>;
  sendDelays: number[];
};

function textFromMetadata(metadata: unknown, key: string) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return "";
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" ? value.trim() : "";
}

function percent(n: number, d: number) {
  return d ? Number(((n / d) * 100).toFixed(2)) : 0;
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const value = sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  return Number(value.toFixed(1));
}

function stepLabel(value: string) {
  const labels: Record<string, string> = {
    registration_confirmation: "Registration confirmation",
    reminder_24h: "Masterclass T-24h reminder",
    reminder_2h: "Masterclass T-2h reminder",
    reminder_15m: "Masterclass T-15m reminder",
    live_join_link: "Live joining link",
    post_live_workshop_offer: "Post-live workshop offer",
    workshop_confirmation: "Workshop confirmation",
    workshop_reminder_24h: "Workshop T-24h reminder",
    workshop_reminder_2h: "Workshop T-2h reminder",
    workshop_reminder_15m: "Workshop T-15m reminder",
    advisor_followup: "AI Expert advisor follow-up",
    core_enrollment_confirmation: "AI Expert enrollment confirmation",
  };
  return labels[value] || value.replaceAll("_", " ");
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
  const sendSlaMinutes = Math.max(1, Number.parseInt(process.env.FUNNEL_REMINDER_SEND_SLA_MINUTES || "5", 10) || 5);

  try {
    const events = await prisma.funnelEvent.findMany({
      where: {
        createdAt: { gte: since },
        eventName: { in: ["whatsapp_message_queued", "whatsapp_message_sent", "whatsapp_delivered", "whatsapp_read", "whatsapp_failed"] },
      },
      select: { eventName: true, leadId: true, metadata: true, createdAt: true },
      orderBy: { createdAt: "asc" },
      take: 100000,
    });

    const groups = new Map<string, Step>();
    const allMessages = new Set<string>();
    const classifiedMessages = new Set<string>();

    for (const event of events) {
      const providerMessageId = textFromMetadata(event.metadata, "providerMessageId");
      if (!providerMessageId) continue;
      allMessages.add(providerMessageId);
      const messageType = textFromMetadata(event.metadata, "messageType").toLowerCase() || "unclassified";
      const journeyStage = textFromMetadata(event.metadata, "journeyStage").toLowerCase() || "unknown";
      const templateName = textFromMetadata(event.metadata, "templateName");
      if (messageType !== "unclassified") classifiedMessages.add(providerMessageId);
      const key = `${messageType}::${journeyStage}::${templateName}`;
      const group = groups.get(key) || {
        messageType, journeyStage, templateName,
        messages: new Set<string>(), leads: new Set<string>(), sent: new Set<string>(), delivered: new Set<string>(), read: new Set<string>(), failed: new Set<string>(), sendDelays: [],
      };
      group.messages.add(providerMessageId);
      if (event.leadId) group.leads.add(event.leadId);

      if (["whatsapp_message_sent", "whatsapp_delivered", "whatsapp_read"].includes(event.eventName)) group.sent.add(providerMessageId);
      if (["whatsapp_delivered", "whatsapp_read"].includes(event.eventName)) group.delivered.add(providerMessageId);
      if (event.eventName === "whatsapp_read") group.read.add(providerMessageId);
      if (event.eventName === "whatsapp_failed") group.failed.add(providerMessageId);

      if (event.eventName === "whatsapp_message_sent") {
        const scheduledFor = textFromMetadata(event.metadata, "scheduledFor");
        if (scheduledFor) {
          const scheduled = new Date(scheduledFor);
          if (Number.isFinite(scheduled.getTime())) {
            const delay = (event.createdAt.getTime() - scheduled.getTime()) / 60000;
            if (delay >= -60 && delay <= 1440) group.sendDelays.push(Math.max(0, delay));
          }
        }
      }
      groups.set(key, group);
    }

    const steps = Array.from(groups.values()).map((group) => ({
      messageType: group.messageType,
      label: stepLabel(group.messageType),
      journeyStage: group.journeyStage,
      templateName: group.templateName || null,
      uniqueMessages: group.messages.size,
      uniqueLeads: group.leads.size,
      sent: group.sent.size,
      delivered: group.delivered.size,
      read: group.read.size,
      failed: group.failed.size,
      deliveryRate: percent(group.delivered.size, group.sent.size),
      readRate: percent(group.read.size, group.delivered.size),
      failureRate: percent(group.failed.size, group.messages.size),
      medianSendDelayMinutes: median(group.sendDelays),
      sentWithinSlaRate: percent(group.sendDelays.filter((value) => value <= sendSlaMinutes).length, group.sendDelays.length),
    })).sort((a, b) => {
      if (a.messageType === "unclassified") return 1;
      if (b.messageType === "unclassified") return -1;
      return b.uniqueMessages - a.uniqueMessages || a.label.localeCompare(b.label);
    });

    return res.status(200).json({
      ok: true,
      rangeDays: days,
      sendSlaMinutes,
      classificationCoverageRate: percent(classifiedMessages.size, allMessages.size),
      totalMessages: allMessages.size,
      classifiedMessages: classifiedMessages.size,
      unclassifiedMessages: Math.max(0, allMessages.size - classifiedMessages.size),
      steps,
      note: "Message-step analytics is backward-compatible. Existing callbacks without messageType remain visible as unclassified. To unlock reminder-level decisions, the WhatsApp agent should pass messageType/journeyStage/templateName/scheduledFor with its existing authenticated status callback.",
    });
  } catch (error) {
    console.error("Funnel follow-up analytics failed:", error);
    return res.status(500).json({ ok: false, error: "Unable to load follow-up analytics" });
  }
}
