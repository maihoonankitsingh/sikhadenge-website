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
  const endpoint = String(process.env.WHATSAPP_FUNNEL_WEBHOOK_URL || "").trim();
  const token = String(process.env.WHATSAPP_FUNNEL_WEBHOOK_TOKEN || "").trim();
  if (!endpoint || !token) throw new Error("WhatsApp outbound endpoint/token not configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        event: "integration_healthcheck",
        source: "sikhadenge-funnel-v2",
        dryRun: true,
        occurredAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`WhatsApp webhook returned HTTP ${response.status}`);
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
        return res.status(409).json({ ok: false, error: "Phase 10 Razorpay diagnostic requires an rzp_test_ key. Live keys are refused." });
      }
      if (!readiness.razorpay.safeForTestDiagnostics) {
        return res.status(409).json({ ok: false, error: "Razorpay Test Mode credentials/webhook secret are incomplete." });
      }
      const order = await createRazorpayOrder({
        amountPaise: 100,
        receipt: `p10_${Date.now()}`,
        notes: { purpose: "phase10_diagnostic", safe: "test_mode_only" },
      });
      return res.status(200).json({ ok: true, provider, mode: "test", orderId: order.id, amountPaise: order.amount, currency: order.currency });
    }

    if (provider === "meta") {
      if (!readiness.meta.readyForTestEvents) {
        return res.status(409).json({ ok: false, error: "Meta Pixel, CAPI token and META_TEST_EVENT_CODE are required." });
      }
      const eventId = `phase10_${crypto.randomUUID()}`;
      const result = await sendMetaCapiEvent({
        eventName: "ViewContent",
        eventId,
        eventSourceUrl: readiness.site.publicSiteUrl || "https://sikhadenge.in",
        clientIp: clientIp(req),
        clientUserAgent: String(req.headers["user-agent"] || "phase10-diagnostic").slice(0, 500),
        externalId: `phase10_${String((admin as any).username || "admin")}`,
        contentName: "phase10_integration_diagnostic",
        customData: { diagnostic: true },
      });
      if (!result.attempted || !result.ok) {
        return res.status(502).json({ ok: false, provider, error: result.error || "Meta CAPI test event failed", status: result.status || null });
      }
      return res.status(200).json({ ok: true, provider, eventId, status: result.status || 200 });
    }

    if (provider === "whatsapp") {
      if (!readiness.whatsapp.readyForConnectivityTest) {
        return res.status(409).json({ ok: false, error: "WhatsApp outbound/status integration variables are incomplete." });
      }
      const result = await testWhatsAppConnectivity();
      return res.status(200).json({ ok: true, provider, status: result.status });
    }

    return res.status(400).json({ ok: false, error: "Unknown provider" });
  } catch (error) {
    console.error("Phase 10 integration diagnostic failed:", provider, error);
    return res.status(502).json({ ok: false, provider, error: error instanceof Error ? error.message : "Integration diagnostic failed" });
  }
}
