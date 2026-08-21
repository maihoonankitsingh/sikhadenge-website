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
    outboundUrlConfigured: boolean;
    outboundTokenConfigured: boolean;
    statusTokenConfigured: boolean;
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
  const razorpayKeyId = value("RAZORPAY_KEY_ID") || value("NEXT_PUBLIC_RAZORPAY_KEY_ID");
  const razorpaySecret = value("RAZORPAY_KEY_SECRET");
  const razorpayWebhookSecret = value("RAZORPAY_WEBHOOK_SECRET");
  const razorpayMode = classifyRazorpayKey(razorpayKeyId);
  const razorpayConfigured = Boolean(razorpayKeyId && razorpaySecret);
  const razorpayTestReady = razorpayConfigured && Boolean(razorpayWebhookSecret) && razorpayMode === "test";
  const razorpayMissing: string[] = [];
  if (!razorpayKeyId) razorpayMissing.push("RAZORPAY_KEY_ID");
  if (!razorpaySecret) razorpayMissing.push("RAZORPAY_KEY_SECRET");
  if (!razorpayWebhookSecret) razorpayMissing.push("RAZORPAY_WEBHOOK_SECRET");
  if (razorpayKeyId && razorpayMode === "unknown") razorpayMissing.push("Recognized Razorpay test key prefix (rzp_test_)");
  if (razorpayMode === "live") razorpayMissing.push("Test Mode key required for Phase 10 diagnostics");

  const pixelId = value("NEXT_PUBLIC_META_PIXEL_ID");
  const metaToken = value("META_CAPI_ACCESS_TOKEN");
  const metaTestCode = value("META_TEST_EVENT_CODE");
  const metaReady = Boolean(pixelId && metaToken && metaTestCode);
  const metaMissing: string[] = [];
  if (!pixelId) metaMissing.push("NEXT_PUBLIC_META_PIXEL_ID");
  if (!metaToken) metaMissing.push("META_CAPI_ACCESS_TOKEN");
  if (!metaTestCode) metaMissing.push("META_TEST_EVENT_CODE");

  const whatsappUrl = value("WHATSAPP_FUNNEL_WEBHOOK_URL");
  const whatsappToken = value("WHATSAPP_FUNNEL_WEBHOOK_TOKEN");
  const whatsappStatusToken = value("WHATSAPP_FUNNEL_STATUS_TOKEN");
  const whatsappReady = Boolean(whatsappUrl && whatsappToken && whatsappStatusToken);
  const whatsappMissing: string[] = [];
  if (!whatsappUrl) whatsappMissing.push("WHATSAPP_FUNNEL_WEBHOOK_URL");
  if (!whatsappToken) whatsappMissing.push("WHATSAPP_FUNNEL_WEBHOOK_TOKEN");
  if (!whatsappStatusToken) whatsappMissing.push("WHATSAPP_FUNNEL_STATUS_TOKEN");

  const siteUrl = value("PUBLIC_SITE_URL") || value("NEXT_PUBLIC_SITE_URL");
  const signingSecret = value("FUNNEL_CHECKOUT_SIGNING_SECRET");

  const blockers: string[] = [];
  if (!razorpayTestReady) blockers.push("Razorpay Test Mode is not fully ready");
  if (!metaReady) blockers.push("Meta Test Events is not fully ready");
  if (!whatsappReady) blockers.push("WhatsApp outbound/status bridge is not fully ready");
  if (!signingSecret) blockers.push("FUNNEL_CHECKOUT_SIGNING_SECRET is not configured");
  if (!siteUrl) blockers.push("PUBLIC_SITE_URL/NEXT_PUBLIC_SITE_URL is not configured");

  const fullyReady = blockers.length === 0;
  const anythingConfigured = razorpayConfigured || Boolean(pixelId || metaToken) || Boolean(whatsappUrl || whatsappToken || whatsappStatusToken);

  return {
    generatedAt: new Date().toISOString(),
    overall: fullyReady ? "ready" : anythingConfigured ? "partial" : "blocked",
    razorpay: {
      level: level(razorpayTestReady, Boolean(razorpayKeyId || razorpaySecret || razorpayWebhookSecret)),
      configured: razorpayConfigured,
      keyMode: razorpayMode,
      keyIdMasked: mask(razorpayKeyId, 6),
      keySecretConfigured: Boolean(razorpaySecret),
      webhookSecretConfigured: Boolean(razorpayWebhookSecret),
      safeForTestDiagnostics: razorpayTestReady,
      missing: razorpayMissing,
    },
    meta: {
      level: level(metaReady, Boolean(pixelId || metaToken || metaTestCode)),
      pixelConfigured: Boolean(pixelId),
      pixelIdMasked: mask(pixelId, 3),
      capiConfigured: Boolean(metaToken),
      testEventCodeConfigured: Boolean(metaTestCode),
      graphApiVersion: value("META_GRAPH_API_VERSION") || "v25.0",
      readyForTestEvents: metaReady,
      missing: metaMissing,
    },
    whatsapp: {
      level: level(whatsappReady, Boolean(whatsappUrl || whatsappToken || whatsappStatusToken)),
      outboundUrlConfigured: Boolean(whatsappUrl),
      outboundTokenConfigured: Boolean(whatsappToken),
      statusTokenConfigured: Boolean(whatsappStatusToken),
      readyForConnectivityTest: whatsappReady,
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
