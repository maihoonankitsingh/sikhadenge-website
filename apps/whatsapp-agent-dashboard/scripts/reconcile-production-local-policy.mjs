import { readFileSync, writeFileSync } from "node:fs";

const repositoryPath = "apps/whatsapp-agent-dashboard/lib/inbox/conversation-repository.ts";
const envPath = "apps/whatsapp-agent-dashboard/.env.example";

let source = readFileSync(repositoryPath, "utf8");

function replaceOnce(input, before, after, label) {
  const first = input.indexOf(before);
  if (first < 0 || input.indexOf(before, first + before.length) >= 0) {
    throw new Error(`Expected exactly one ${label} anchor.`);
  }
  return input.slice(0, first) + after + input.slice(first + before.length);
}

source = replaceOnce(
  source,
  'import { prisma } from "../db/prisma";\nimport type {',
  'import { prisma } from "../db/prisma";\nimport {\n  inboxConversationTimeFilter,\n  renderWhatsAppTemplateText,\n  type InboxConversationScope,\n} from "./conversation-read-policy";\nimport type {',
  "read-policy import",
);

const renderStart = source.indexOf("function renderTemplateText(");
const resolveStart = source.indexOf("function resolveTemplateMessageText(");
if (renderStart < 0 || resolveStart <= renderStart) {
  throw new Error("Template renderer anchors were not found in order.");
}
source = source.slice(0, renderStart) + source.slice(resolveStart);
source = replaceOnce(
  source,
  "return renderTemplateText(\n    body,\n    parameters,\n  ) || input.text;",
  "return renderWhatsAppTemplateText(\n    body,\n    parameters,\n  ) || input.text;",
  "template render call",
);

source = replaceOnce(
  source,
  'export type InboxConversationScope =\n  | "ALL"\n  | "RECENT"\n  | "HISTORY";\n\n',
  "",
  "legacy scope type",
);

source = replaceOnce(
  source,
  '  const cutoff = new Date(\n    Date.now() - 24 * 60 * 60 * 1000,\n  );\n\n  const where:\n    Prisma.WhatsAppConversationWhereInput\n    | undefined =\n    scope === "RECENT"\n      ? {\n          lastMessageAt: {\n            gte: cutoff,\n          },\n        }\n      : scope === "HISTORY"\n        ? {\n            lastMessageAt: {\n              lt: cutoff,\n            },\n          }\n        : undefined;',
  '  const timeFilter = inboxConversationTimeFilter(scope);\n  const where: Prisma.WhatsAppConversationWhereInput | undefined =\n    timeFilter ? { lastMessageAt: timeFilter } : undefined;',
  "24-hour scope query",
);

writeFileSync(repositoryPath, source);

let envSource = readFileSync(envPath, "utf8");
if (!envSource.includes('WHATSAPP_ANALYTICS_TOKEN=""')) {
  envSource = replaceOnce(
    envSource,
    'APP_URL="https://whatsapp.sikhadenge.in"\n',
    'APP_URL="https://whatsapp.sikhadenge.in"\n\n# Optional server-to-server read-only analytics bearer tokens. Keep real values only in production secrets.\nWHATSAPP_ANALYTICS_TOKEN=""\nWHATSAPP_AGENT_ANALYTICS_TOKEN=""\n',
    "analytics token env",
  );
  writeFileSync(envPath, envSource);
}
