import "server-only";

export type PartnerFundingMode =
  | "PARTNER_FUNDED"
  | "LEARNER_FUNDED"
  | "MIXED"
  | "NO_FEE"
  | "UNKNOWN";

export type PartnerIntakeConfig = {
  displayName: string;
  programLabel: string;
  organizationSlug: string;
  programCode: string;
  batchCode?: string;
  fundingMode: PartnerFundingMode;
  apiKeyEnv: string;
  noticeVersion: string;
};

const SLUG_RE = /^[a-z0-9-]{2,80}$/;
const CODE_RE = /^[A-Za-z0-9._:-]{2,120}$/;
const KEY_ENV_RE = /^B2B_INTAKE_[A-Z0-9_]+_API_KEY$/;
const FUNDING_MODES = new Set<PartnerFundingMode>([
  "PARTNER_FUNDED",
  "LEARNER_FUNDED",
  "MIXED",
  "NO_FEE",
  "UNKNOWN",
]);

let cache: Record<string, PartnerIntakeConfig> | null = null;

function parseConfig(): Record<string, PartnerIntakeConfig> {
  if (cache) return cache;

  const raw = process.env.B2B_INTAKE_PARTNERS_JSON;
  if (!raw) return (cache = {});

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("B2B_INTAKE_PARTNERS_JSON is not valid JSON.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("B2B_INTAKE_PARTNERS_JSON must be an object keyed by partner slug.");
  }

  const output: Record<string, PartnerIntakeConfig> = {};
  for (const [slug, rawValue] of Object.entries(parsed as Record<string, unknown>)) {
    if (!SLUG_RE.test(slug) || !rawValue || typeof rawValue !== "object" || Array.isArray(rawValue)) {
      throw new Error(`Invalid B2B intake partner configuration: ${slug}`);
    }

    const item = rawValue as Record<string, unknown>;
    const fundingMode = String(item.fundingMode || "UNKNOWN").trim() as PartnerFundingMode;
    const config: PartnerIntakeConfig = {
      displayName: String(item.displayName || "").trim(),
      programLabel: String(item.programLabel || "").trim(),
      organizationSlug: String(item.organizationSlug || "").trim(),
      programCode: String(item.programCode || "").trim(),
      batchCode: item.batchCode ? String(item.batchCode).trim() : undefined,
      fundingMode,
      apiKeyEnv: String(item.apiKeyEnv || "").trim(),
      noticeVersion: String(item.noticeVersion || "").trim(),
    };

    if (
      config.displayName.length < 2 ||
      config.displayName.length > 180 ||
      config.programLabel.length < 2 ||
      config.programLabel.length > 180 ||
      !SLUG_RE.test(config.organizationSlug) ||
      !CODE_RE.test(config.programCode) ||
      (config.batchCode && !CODE_RE.test(config.batchCode)) ||
      !FUNDING_MODES.has(config.fundingMode) ||
      !KEY_ENV_RE.test(config.apiKeyEnv) ||
      config.noticeVersion.length < 1 ||
      config.noticeVersion.length > 80
    ) {
      throw new Error(`Incomplete or unsafe B2B intake partner configuration: ${slug}`);
    }

    output[slug] = config;
  }

  cache = output;
  return output;
}

export function getPartnerPublicConfig(slug: string) {
  const config = parseConfig()[slug];
  if (!config) return null;
  return {
    slug,
    displayName: config.displayName,
    programLabel: config.programLabel,
    noticeVersion: config.noticeVersion,
  };
}

export function getPartnerRuntimeConfig(slug: string) {
  const config = parseConfig()[slug];
  if (!config) return null;

  const apiKey = process.env[config.apiKeyEnv]?.trim();
  if (!apiKey) throw new Error(`Missing partner intake API key: ${config.apiKeyEnv}`);

  const baseUrlRaw = process.env.B2B_OS_API_BASE_URL?.trim();
  if (!baseUrlRaw) throw new Error("B2B_OS_API_BASE_URL is not configured.");

  const baseUrl = new URL(baseUrlRaw);
  if (process.env.NODE_ENV === "production" && baseUrl.protocol !== "https:") {
    throw new Error("Production B2B_OS_API_BASE_URL must use HTTPS.");
  }

  return { ...config, apiKey, baseUrl: baseUrl.origin };
}
