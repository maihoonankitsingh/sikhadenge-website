import crypto from "crypto";

export type MetaCapiEventName =
  | "Lead"
  | "ViewContent"
  | "InitiateCheckout"
  | "Purchase"
  | "CompleteRegistration"
  | string;

type MetaCapiInput = {
  eventName: MetaCapiEventName;
  eventId: string;
  eventSourceUrl: string;
  email?: string | null;
  phone?: string | null;
  clientIp?: string | null;
  clientUserAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  externalId?: string | null;
  value?: number | null;
  currency?: string | null;
  contentName?: string | null;
  customData?: Record<string, string | number | boolean | null | undefined>;
};

type MetaCapiResult = {
  attempted: boolean;
  ok: boolean;
  status?: number;
  error?: string;
};

function normalizeEmail(value?: string | null) {
  return String(value || "").trim().toLowerCase();
}

function normalizePhone(value?: string | null) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";

  const countryCode = String(process.env.DEFAULT_PHONE_COUNTRY_CODE || "91").replace(/\D/g, "");
  if (digits.length === 10 && countryCode) return `${countryCode}${digits}`;
  return digits;
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function compact<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== "")
  );
}

export async function sendMetaCapiEvent(input: MetaCapiInput): Promise<MetaCapiResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN || "";

  if (!pixelId || !accessToken) {
    return { attempted: false, ok: false };
  }

  const apiVersion = process.env.META_GRAPH_API_VERSION || "v25.0";
  const endpoint = `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(pixelId)}/events`;

  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const externalId = String(input.externalId || "").trim();

  const userData = compact({
    em: email ? [sha256(email)] : undefined,
    ph: phone ? [sha256(phone)] : undefined,
    external_id: externalId ? [sha256(externalId)] : undefined,
    client_ip_address: input.clientIp || undefined,
    client_user_agent: input.clientUserAgent || undefined,
    fbp: input.fbp || undefined,
    fbc: input.fbc || undefined,
  });

  if (Object.keys(userData).length === 0) {
    return { attempted: false, ok: false, error: "No Meta user matching data available" };
  }

  const customData = compact({
    value: typeof input.value === "number" ? input.value : undefined,
    currency: input.currency || (typeof input.value === "number" ? "INR" : undefined),
    content_name: input.contentName || undefined,
    ...(input.customData || {}),
  });

  const payload: Record<string, unknown> = {
    data: [
      compact({
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: Object.keys(customData).length ? customData : undefined,
      }),
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);

    const response = await fetch(`${endpoint}?access_token=${encodeURIComponent(accessToken)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return {
        attempted: true,
        ok: false,
        status: response.status,
        error: body.slice(0, 600) || `Meta CAPI HTTP ${response.status}`,
      };
    }

    return { attempted: true, ok: true, status: response.status };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      error: error instanceof Error ? error.message : "Meta CAPI request failed",
    };
  }
}
