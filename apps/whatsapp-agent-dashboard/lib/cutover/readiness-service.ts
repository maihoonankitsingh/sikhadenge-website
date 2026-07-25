import { AgentMode, DashboardRole, MessageStatus, TemplateStatus } from "@prisma/client";

import { prisma } from "../db/prisma";

function configured(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

function configuredAny(...names: string[]): boolean {
  return names.some((name) => configured(name));
}

function enabled(name: string, fallback = false): boolean {
  const value = process.env[name]?.trim().toLowerCase();
  if (!value) return fallback;
  if (["1", "true", "yes", "on", "enabled", "live"].includes(value)) return true;
  if (["0", "false", "no", "off", "disabled"].includes(value)) return false;
  return fallback;
}

export async function getCutoverReadiness() {
  const [
    approvedTemplates,
    queuedMessages,
    failedMessages,
    reviewRequired,
    activeAdmins,
    webhookMessages,
    webhookStatuses,
    pendingCampaigns,
    activeAutomationFlows,
  ] = await Promise.all([
    prisma.whatsAppTemplate.count({ where: { status: TemplateStatus.APPROVED } }),
    prisma.whatsAppMessage.count({ where: { status: MessageStatus.QUEUED } }),
    prisma.whatsAppMessage.count({ where: { status: MessageStatus.FAILED } }),
    prisma.whatsAppConversation.count({ where: { agentMode: AgentMode.REVIEW_REQUIRED } }),
    prisma.dashboardUser.count({ where: { role: DashboardRole.ADMIN, isActive: true } }),
    prisma.webhookEvent.count({ where: { eventType: "message" } }),
    prisma.webhookEvent.count({ where: { eventType: "status" } }),
    prisma.webhookEvent.count({ where: { eventType: "campaign_plan", processedAt: null } }),
    prisma.webhookEvent.count({ where: { eventType: "automation_flow", processingError: null } }),
  ]);

  const wabaConfigured = configuredAny(
    "WHATSAPP_BUSINESS_ACCOUNT_ID",
    "META_WHATSAPP_BUSINESS_ACCOUNT_ID",
    "META_WABA_ID",
  );
  const phoneConfigured = configuredAny(
    "WHATSAPP_PHONE_NUMBER_ID",
    "META_WHATSAPP_PHONE_NUMBER_ID",
  );
  const tokenConfigured = configuredAny(
    "WHATSAPP_ACCESS_TOKEN",
    "META_WHATSAPP_ACCESS_TOKEN",
  );
  const graphConfigured = configuredAny(
    "WHATSAPP_GRAPH_VERSION",
    "META_GRAPH_API_VERSION",
  );
  const outboundMode = process.env.WHATSAPP_OUTBOUND_MODE?.trim().toLowerCase() || "disabled";
  const checks = [
    {
      id: "waba",
      group: "Meta account",
      label: "WABA ID configured",
      status: wabaConfigured ? "PASS" : "BLOCKED",
      detail: "Business account identifier is stored in the environment.",
    },
    {
      id: "phone",
      group: "Meta account",
      label: "Phone Number ID configured",
      status: phoneConfigured ? "PASS" : "BLOCKED",
      detail: "Production phone-number identifier is stored in the environment.",
    },
    {
      id: "token",
      group: "Meta account",
      label: "System-user access token configured",
      status: tokenConfigured ? "PASS" : "BLOCKED",
      detail: "Token value is never displayed by the dashboard.",
    },
    {
      id: "graph",
      group: "Meta account",
      label: "Graph API version configured",
      status: graphConfigured ? "PASS" : "BLOCKED",
      detail: "Production Meta requests use the configured Graph API version.",
    },
    {
      id: "signature",
      group: "Webhooks",
      label: "App secret and verify token configured",
      status:
        configured("WHATSAPP_APP_SECRET") && configured("WHATSAPP_VERIFY_TOKEN")
          ? "PASS"
          : "BLOCKED",
      detail: "Webhook verification and signature validation are available.",
    },
    {
      id: "subscription",
      group: "Webhooks",
      label: "WABA app subscription",
      status: wabaConfigured ? "MANUAL" : "BLOCKED",
      detail: "Reconfirm the production app subscription immediately before cutover.",
    },
    {
      id: "inbound",
      group: "Webhooks",
      label: "Real inbound webhook evidence",
      status: webhookMessages > 0 ? "PASS" : "PENDING",
      detail: `${webhookMessages} inbound message event(s) and ${webhookStatuses} status event(s) stored.`,
    },
    {
      id: "sim",
      group: "Phone migration",
      label: "SIM receives Meta SMS or voice verification",
      status: "MANUAL",
      detail: "Confirm on the phone during the supervised migration window. Never paste the code into chat.",
    },
    {
      id: "registration",
      group: "Phone migration",
      label: "Phone registration and two-step PIN",
      status: "MANUAL",
      detail: "Registration must be completed through Meta with a private six-digit two-step PIN.",
    },
    {
      id: "aisensy",
      group: "Provider ownership",
      label: "AiSensy production ownership removed",
      status: "MANUAL",
      detail: "Disconnect only after Cloud API registration succeeds and rollback evidence is captured.",
    },
    {
      id: "templates",
      group: "Messaging",
      label: "Approved fallback templates",
      status: approvedTemplates > 0 ? "PASS" : "PENDING",
      detail: `${approvedTemplates} Meta-approved template(s) available.`,
    },
    {
      id: "outbound-lock",
      group: "Messaging",
      label: "Outbound remains locked before cutover",
      status: outboundMode !== "live" ? "PASS" : "BLOCKED",
      detail: `Current outbound mode: ${outboundMode}.`,
    },
    {
      id: "ai-lock",
      group: "Messaging",
      label: "AI auto-reply locks remain off",
      status:
        !enabled("AGENT_AUTO_REPLY_ENABLED") && !enabled("AGENT_IMMEDIATE_DISPATCH_ENABLED")
          ? "PASS"
          : "BLOCKED",
      detail: "Both AI reply and immediate dispatch require explicit final activation.",
    },
    {
      id: "bulk-lock",
      group: "Messaging",
      label: "Campaign and automation external actions remain off",
      status:
        !enabled("WHATSAPP_CAMPAIGNS_ENABLED") &&
        !enabled("AUTOMATION_ACTIONS_ENABLED") &&
        !enabled("INTEGRATION_EXTERNAL_WRITES_ENABLED")
          ? "PASS"
          : "BLOCKED",
      detail: "Bulk and external writes stay disabled until post-cutover smoke tests pass.",
    },
    {
      id: "queue",
      group: "Operations",
      label: "Outbound queue reviewed",
      status: queuedMessages === 0 ? "PASS" : "PENDING",
      detail: `${queuedMessages} queued message(s); ${failedMessages} historical failed message(s).`,
    },
    {
      id: "review",
      group: "Operations",
      label: "Human review queue understood",
      status: "PASS",
      detail: `${reviewRequired} conversation(s) currently require review.`,
    },
    {
      id: "admins",
      group: "Access",
      label: "Active administrator access",
      status: activeAdmins > 0 ? "PASS" : "BLOCKED",
      detail: `${activeAdmins} active administrator account(s).`,
    },
    {
      id: "login",
      group: "Access",
      label: "Final login consolidation",
      status: "PENDING",
      detail: "Existing login remains unchanged until Meta cutover and production verification are complete.",
    },
  ] as const;

  const blocked = checks.filter((check) => check.status === "BLOCKED").length;
  const pending = checks.filter((check) => check.status === "PENDING").length;
  const manual = checks.filter((check) => check.status === "MANUAL").length;
  const passed = checks.filter((check) => check.status === "PASS").length;

  return {
    readyForSupervisedCutover: blocked === 0,
    readyForAutomaticCutover: false,
    cutoverExecuted: false,
    checks,
    summary: { passed, pending, manual, blocked },
    inventory: {
      approvedTemplates,
      queuedMessages,
      failedMessages,
      reviewRequired,
      activeAdmins,
      webhookMessages,
      webhookStatuses,
      pendingCampaigns,
      activeAutomationFlows,
    },
    constraints: {
      aiSensyStillOwnsLiveTraffic: true,
      outboundMustRemainDisabled: true,
      otpMustRemainPrivate: true,
      twoStepPinMustRemainPrivate: true,
      externalChangesRequireExplicitApproval: true,
    },
    generatedAt: new Date().toISOString(),
  };
}
