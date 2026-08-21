export type IntegrationLevel = "ready" | "partial" | "blocked";

export type IntegrationReadiness = {
  generatedAt: string;
  overall: IntegrationLevel;
  razorpay: {
    level: IntegrationLevel;
    configured: boolean;
    keyMode: "test" | "live" | "unknown" | "missing";
    keyIdMasked: string | null;
    keySecretConfigured: boolean;
    webhookSecretConfigured: boolean;
    safeForTestDiagnostics: boolean;
    missing: string[];
  };
  meta: {
    level: IntegrationLevel;
    pixelConfigured: boolean;
    pixelIdMasked: string | null;
    capiConfigured: boolean;
    testEventCodeConfigured: boolean;
    graphApiVersion: string;
    readyForTestEvents: boolean;
    missing: string[];
  };
  whatsapp: {
    level: IntegrationLevel;
    registrationEndpointSource: "explicit" | "existing-default";
    registrationSecretConfigured: boolean;
    statusCallbackSecretConfigured: boolean;
    runtimeReady: boolean;
    safeHealthDiagnosticConfigured: boolean;
    readyForConnectivityTest: boolean;
    missing: string[];
  };
  site: {
    publicSiteUrlConfigured: boolean;
    publicSiteUrl: string | null;
    checkoutSigningSecretConfigured: boolean;
  };
  blockers: string[];
};

const DEFAULT_WHATSAPP_AGENT_BASE_URL = "https://whatsapp.sikhadenge.in";

function value(name: string) {
  return String(process.env[name] || "").trim();
}

function mask(input: string, visible = 4) {
  if (!input) return null;
  if (input.length <= visible * 2) return `${input.slice(0, 2)}***`;
  return `${input.slice(0, visible)}…${input.slice(-visible)}`;
}

export function classifyRazorpayKey(keyId: string): "test" | "live" | "unknown" | "missing" {
  if (!keyId) return "missing";
  if (keyId.startsWith("rzp_test_")) return "test";
  if (keyId.startsWith("rzp_live_")) return "live";
  return "unknown";
}

function level(required: boolean, partial: boolean): IntegrationLevel {
  if (required) return "ready";
  return partial ? "partial" : "blocked";
}

export function getIntegrationReadiness(): IntegrationReadiness {
  // Reuse the admission system's existing Razorpay Key ID + Secret. The signed
  // webhook adds callback-loss recovery on the same Razorpay account.
  const razorpayKeyId = value("RAZORPAY_KEY_ID") || value("NEXT_PUBLIC_RAZORPAY_KEY_ID");
  const razorpaySecret = value("RAZORPAY_KEY_SECRET");
  const razorpayWebhookSecret = value("RAZORPAY_WEBHOOK_SECRET");
  const razorpayMode = classifyRazorpayKey(razorpayKeyId);
  const razorpayConfigured = Boolean(razorpayKeyId && razorpaySecret);
  const razorpayTestReady = razorpayConfigured && Boolean(razorpayWebhookSecret) && razorpayMode === "test";
  const razorpayMissing: string[] = [];
  if (!razorpayKeyId) razorpayMissing.push("RAZORPAY_KEY_ID");
  if (!razorpaySecret) razorpayMissing.push("RAZORPAY_KEY_SECRET");
  if (!razorpayWebhookSecret) razorpayMissing.push("RAZORPAY_WEBHOOK_SECRET (same-account webhook signing secret)");
  if (razorpayKeyId && razorpayMode === "unknown") razorpayMissing.push("Recognized Razorpay key prefix");
  if (razorpayMode === "live") razorpayMissing.push("Test Mode key required only for non-production payment diagnostics");

  // Reuse the existing website Pixel. CAPI/Test Events are additional server-side
  // validation capabilities and must not be assumed present just because Pixel works.
  const pixelId = value("NEXT_PUBLIC_META_PIXEL_ID");
  const metaToken = value("META_CAPI_ACCESS_TOKEN");
  const metaTestCode = value("META_TEST_EVENT_CODE");
  const metaReady = Boolean(pixelId && metaToken && metaTestCode);
  const metaMissing: string[] = [];
  if (!pixelId) metaMissing.push("NEXT_PUBLIC_META_PIXEL_ID");
  if (!metaToken) metaMissing.push("META_CAPI_ACCESS_TOKEN (only if existing server-side CAPI is available)");
  if (!metaTestCode) metaMissing.push("META_TEST_EVENT_CODE (non-production validation only)");

  // Reuse the existing SikhaDenge masterclass agent. Runtime registration already
  // defaults to whatsapp.sikhadenge.in/api/webhooks/masterclass-registration, so a
  // second generic webhook URL/token must not be required just to report readiness.
  const explicitRegistrationUrl = value("WHATSAPP_FUNNEL_WEBHOOK_URL") || value("WHATSAPP_AGENT_REGISTRATION_URL");
  const agentBaseUrl = value("WHATSAPP_AGENT_BASE_URL") || DEFAULT_WHATSAPP_AGENT_BASE_URL;
  const registrationEndpointAvailable = Boolean(explicitRegistrationUrl || agentBaseUrl);
  const registrationSecret = value("MASTERCLASS_REGISTRATION_WEBHOOK_SECRET") || value("WHATSAPP_FUNNEL_WEBHOOK_TOKEN");
  const statusCallbackSecret = value("WHATSAPP_FUNNEL_STATUS_TOKEN") || registrationSecret;
  const whatsappRuntimeReady = Boolean(registrationEndpointAvailable && registrationSecret && statusCallbackSecret);

  // Safe health diagnostics are optional and side-effect free. Never POST a fake
  // learner payload to the registration webhook merely to test connectivity.
  const whatsappHealthUrl = value("WHATSAPP_AGENT_STATUS_URL");
  const whatsappHealthToken = value("DEVELOPER_API_TOKEN") || value("WHATSAPP_AGENT_STATUS_TOKEN");
  const safeHealthDiagnosticReady = Boolean(whatsappHealthUrl && whatsappHealthToken);
  const whatsappMissing: string[] = [];
  if (!registrationSecret) {
    whatsappMissing.push("MASTERCLASS_REGISTRATION_WEBHOOK_SECRET (or legacy WHATSAPP_FUNNEL_WEBHOOK_TOKEN)");
  }
  if (!statusCallbackSecret) whatsappMissing.push("WhatsApp status callback shared secret");

  const siteUrl = value("PUBLIC_SITE_URL") || value("NEXT_PUBLIC_SITE_URL");
  const signingSecret = value("FUNNEL_CHECKOUT_SECRET");

  const blockers: string[] = [];
  if (!razorpayConfigured) blockers.push("Existing Razorpay Key ID/Secret are not available to this runtime");
  if (!razorpayWebhookSecret) blockers.push("Razorpay signed webhook secret is not configured for callback-loss recovery");
  if (!pixelId) blockers.push("Existing Meta Pixel ID is not available to this runtime");
  if (!whatsappRuntimeReady) blockers.push("Existing SikhaDenge WhatsApp masterclass registration/status bridge is not fully ready");
  if (!signingSecret) blockers.push("FUNNEL_CHECKOUT_SECRET is not configured as a dedicated checkout signing secret");
  if (!siteUrl) blockers.push("PUBLIC_SITE_URL/NEXT_PUBLIC_SITE_URL is not configured");

  const fullyReady = blockers.length === 0;
  const anythingConfigured =
    razorpayConfigured ||
    Boolean(pixelId || metaToken) ||
    Boolean(registrationSecret || statusCallbackSecret);

  return {
    generatedAt: new Date().toISOString(),
    overall: fullyReady ? "ready" : anythingConfigured ? "partial" : "blocked",
    razorpay: {
      level: level(razorpayConfigured && Boolean(razorpayWebhookSecret), Boolean(razorpayKeyId || razorpaySecret || razorpayWebhookSecret)),
      configured: razorpayConfigured,
      keyMode: razorpayMode,
      keyIdMasked: mask(razorpayKeyId, 6),
      keySecretConfigured: Boolean(razorpaySecret),
      webhookSecretConfigured: Boolean(razorpayWebhookSecret),
      safeForTestDiagnostics: razorpayTestReady,
      missing: razorpayMissing,
    },
    meta: {
      level: level(Boolean(pixelId), Boolean(pixelId || metaToken || metaTestCode)),
      pixelConfigured: Boolean(pixelId),
      pixelIdMasked: mask(pixelId, 3),
      capiConfigured: Boolean(metaToken),
      testEventCodeConfigured: Boolean(metaTestCode),
      graphApiVersion: value("META_GRAPH_API_VERSION") || "v25.0",
      readyForTestEvents: metaReady,
      missing: metaMissing,
    },
    whatsapp: {
      level: level(whatsappRuntimeReady, Boolean(registrationSecret || statusCallbackSecret || explicitRegistrationUrl)),
      registrationEndpointSource: explicitRegistrationUrl ? "explicit" : "existing-default",
      registrationSecretConfigured: Boolean(registrationSecret),
      statusCallbackSecretConfigured: Boolean(statusCallbackSecret),
      runtimeReady: whatsappRuntimeReady,
      safeHealthDiagnosticConfigured: safeHealthDiagnosticReady,
      readyForConnectivityTest: safeHealthDiagnosticReady,
      missing: whatsappMissing,
    },
    site: {
      publicSiteUrlConfigured: Boolean(siteUrl),
      publicSiteUrl: siteUrl || null,
      checkoutSigningSecretConfigured: Boolean(signingSecret),
    },
    blockers,
  };
}
