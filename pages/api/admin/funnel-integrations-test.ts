import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../lib/auth";
import { createRazorpayOrder, getRazorpayPublicKey } from "../../../lib/funnel/razorpay";
import { sendMetaCapiEvent } from "../../../lib/funnel/metaCapi";
import { getIntegrationReadiness } from "../../../lib/funnel/integrationReadiness";

function clientIp(req: NextApiRequest) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) return xff.split(",")[0]?.trim() || null;
  return req.socket.remoteAddress || null;
}

async function testWhatsAppConnectivity() {
  const endpoint = String(process.env.WHATSAPP_AGENT_STATUS_URL || "").trim();
  const token = String(process.env.DEVELOPER_API_TOKEN || process.env.WHATSAPP_AGENT_STATUS_TOKEN || "").trim();
  if (!endpoint || !token) {
    throw new Error("No side-effect-free WhatsApp agent health/status diagnostic is configured. Use the controlled learner test instead.");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`WhatsApp agent status endpoint returned HTTP ${response.status}`);
    return { status: response.status };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const provider = String(req.body?.provider || "").trim().toLowerCase();
  const readiness = getIntegrationReadiness();

  try {
    if (provider === "razorpay") {
      const keyId = getRazorpayPublicKey();
      if (!keyId.startsWith("rzp_test_")) {
        return res.status(409).json({ ok: false, error: "Razorpay diagnostic requires an rzp_test_ key. Live keys are refused." });
      }
      if (!readiness.razorpay.safeForTestDiagnostics) {
        return res.status(409).json({ ok: false, error: "Razorpay Test Mode credentials or same-account webhook signing secret are incomplete." });
      }
      const order = await createRazorpayOrder({
        amountPaise: 100,
        receipt: `p12_${Date.now()}`,
        notes: { purpose: "integration_diagnostic", safe: "test_mode_only" },
      });
      return res.status(200).json({ ok: true, provider, mode: "test", orderId: order.id, amountPaise: order.amount, currency: order.currency });
    }

    if (provider === "meta") {
      if (!readiness.meta.readyForTestEvents) {
        return res.status(409).json({ ok: false, error: "Existing Pixel plus server-side CAPI token and META_TEST_EVENT_CODE are required for this diagnostic." });
      }
      const eventId = `integration_${crypto.randomUUID()}`;
      const result = await sendMetaCapiEvent({
        eventName: "ViewContent",
        eventId,
        eventSourceUrl: readiness.site.publicSiteUrl || "https://sikhadenge.in",
        clientIp: clientIp(req),
        clientUserAgent: String(req.headers["user-agent"] || "integration-diagnostic").slice(0, 500),
        externalId: `integration_${String((admin as any).username || "admin")}`,
        contentName: "funnel_integration_diagnostic",
        customData: { diagnostic: true },
      });
      if (!result.attempted || !result.ok) {
        return res.status(502).json({ ok: false, provider, error: result.error || "Meta CAPI test event failed", status: result.status || null });
      }
      return res.status(200).json({ ok: true, provider, eventId, status: result.status || 200 });
    }

    if (provider === "whatsapp") {
      if (!readiness.whatsapp.runtimeReady) {
        return res.status(409).json({ ok: false, error: "Existing SikhaDenge WhatsApp masterclass bridge is not runtime-ready." });
      }
      if (!readiness.whatsapp.readyForConnectivityTest) {
        return res.status(409).json({
          ok: false,
          error: "The real registration bridge may be ready, but no side-effect-free WhatsApp health/status diagnostic is configured. Validate it with the controlled learner flow instead.",
        });
      }
      const result = await testWhatsAppConnectivity();
      return res.status(200).json({ ok: true, provider, status: result.status, sideEffectFree: true });
    }

    return res.status(400).json({ ok: false, error: "Unknown provider" });
  } catch (error) {
    console.error("Funnel integration diagnostic failed:", provider, error);
    return res.status(502).json({ ok: false, provider, error: error instanceof Error ? error.message : "Integration diagnostic failed" });
  }
}
