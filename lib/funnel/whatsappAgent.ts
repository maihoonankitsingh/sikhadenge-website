export type WhatsAppAgentRegistration = {
  registrationId: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  source: string;
  consent: boolean;
};

export type WhatsAppAgentRegistrationResult = {
  attempted: boolean;
  ok: boolean;
  status?: number;
  error?: string;
};

const DEFAULT_AGENT_BASE_URL = "https://whatsapp.sikhadenge.in";

function value(name: string) {
  return String(process.env[name] || "").trim();
}

export function getWhatsAppAgentRegistrationEndpoint() {
  const explicit = value("WHATSAPP_FUNNEL_WEBHOOK_URL") || value("WHATSAPP_AGENT_REGISTRATION_URL");
  if (explicit) return explicit;
  const base = (value("WHATSAPP_AGENT_BASE_URL") || DEFAULT_AGENT_BASE_URL).replace(/\/$/, "");
  return `${base}/api/webhooks/masterclass-registration`;
}

export function getWhatsAppAgentSharedSecret() {
  return value("MASTERCLASS_REGISTRATION_WEBHOOK_SECRET") || value("WHATSAPP_FUNNEL_WEBHOOK_TOKEN");
}

export function getWhatsAppStatusSharedSecret() {
  return value("WHATSAPP_FUNNEL_STATUS_TOKEN") || getWhatsAppAgentSharedSecret();
}

export async function sendRegistrationToWhatsAppAgent(
  input: WhatsAppAgentRegistration
): Promise<WhatsAppAgentRegistrationResult> {
  const secret = getWhatsAppAgentSharedSecret();
  if (!secret) {
    return { attempted: false, ok: false, error: "Existing WhatsApp masterclass registration secret is not configured" };
  }
  if (!input.consent) {
    return { attempted: false, ok: false, error: "WhatsApp consent was not granted" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(getWhatsAppAgentRegistrationEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        registrationId: input.registrationId,
        name: input.name,
        phone: input.phone,
        email: input.email,
        city: input.city || "",
        source: input.source,
        consent: true,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return {
        attempted: true,
        ok: false,
        status: response.status,
        error: body.slice(0, 600) || `WhatsApp agent HTTP ${response.status}`,
      };
    }

    return { attempted: true, ok: true, status: response.status };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      error: error instanceof Error ? error.message : "WhatsApp agent registration failed",
    };
  } finally {
    clearTimeout(timer);
  }
}
