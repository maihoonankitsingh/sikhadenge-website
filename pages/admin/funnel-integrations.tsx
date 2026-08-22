import React, { useEffect, useState } from "react";

type Readiness = {
  overall: "ready" | "partial" | "blocked";
  generatedAt: string;
  razorpay: any;
  meta: any;
  whatsapp: any;
  site: any;
  blockers: string[];
};

const pill: Record<string, React.CSSProperties> = {
  ready: { background: "#dcfce7", color: "#166534" },
  partial: { background: "#fef3c7", color: "#92400e" },
  blocked: { background: "#fee2e2", color: "#991b1b" },
};

export default function FunnelIntegrationsPage() {
  const [readiness, setReadiness] = useState<Readiness | null>(null);
  const [error, setError] = useState("");
  const [running, setRunning] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  async function load() {
    const response = await fetch("/api/admin/funnel-integrations");
    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const body = await response.json().catch(() => null);
    if (!response.ok || !body?.ok) throw new Error(body?.error || "Unable to load readiness");
    setReadiness(body.readiness);
  }

  useEffect(() => {
    load().catch((e) => setError(e instanceof Error ? e.message : "Unable to load readiness"));
  }, []);

  async function run(provider: string) {
    setRunning(provider);
    setResults((old) => ({ ...old, [provider]: "Running diagnostic…" }));
    try {
      const response = await fetch("/api/admin/funnel-integrations-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.ok) throw new Error(body?.error || `HTTP ${response.status}`);
      setResults((old) => ({ ...old, [provider]: `PASS — ${JSON.stringify(body)}` }));
      await load();
    } catch (e) {
      setResults((old) => ({ ...old, [provider]: `FAIL — ${e instanceof Error ? e.message : "Diagnostic failed"}` }));
    } finally {
      setRunning(null);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#07111f", color: "#e5eef8", padding: "36px 18px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <a href="/admin" style={{ color: "#7dd3fc", textDecoration: "none", fontWeight: 800 }}>← Admin</a>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "#67e8f9", fontWeight: 900 }}>Phase 12A</div>
            <h1 style={{ margin: "8px 0 6px", fontSize: 34 }}>Existing Integration Console</h1>
            <p style={{ margin: 0, maxWidth: 820, color: "#9fb0c3", lineHeight: 1.65 }}>Masked, admin-only readiness for the existing SikhaDenge Razorpay, Meta and WhatsApp integrations. This console does not create or reveal a duplicate provider credential stack.</p>
          </div>
          {readiness ? <span style={{ ...pill[readiness.overall], alignSelf: "flex-start", padding: "8px 12px", borderRadius: 999, fontWeight: 900, textTransform: "uppercase", fontSize: 12 }}>{readiness.overall}</span> : null}
        </div>

        {error ? <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: "#3f1218", color: "#fecaca" }}>{error}</div> : null}
        {!readiness && !error ? <div style={{ marginTop: 24 }}>Loading integration readiness…</div> : null}

        {readiness ? (
          <>
            <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
              <ProviderCard title="Razorpay" status={readiness.razorpay.level} rows={[
                ["Key mode", readiness.razorpay.keyMode],
                ["Existing Key ID", readiness.razorpay.keyIdMasked || "missing"],
                ["Existing Key Secret", readiness.razorpay.keySecretConfigured ? "available" : "missing"],
                ["Signed webhook secret", readiness.razorpay.webhookSecretConfigured ? "configured" : "missing"],
              ]} missing={readiness.razorpay.missing} onTest={() => run("razorpay")} disabled={!readiness.razorpay.safeForTestDiagnostics || running !== null} result={results.razorpay} />

              <ProviderCard title="Meta" status={readiness.meta.level} rows={[
                ["Existing Pixel", readiness.meta.pixelIdMasked || "missing"],
                ["Server CAPI", readiness.meta.capiConfigured ? "available" : "not detected"],
                ["Test Event Code", readiness.meta.testEventCodeConfigured ? "configured" : "not configured"],
                ["Graph API", readiness.meta.graphApiVersion],
              ]} missing={readiness.meta.missing} onTest={() => run("meta")} disabled={!readiness.meta.readyForTestEvents || running !== null} result={results.meta} />

              <ProviderCard title="WhatsApp" status={readiness.whatsapp.level} rows={[
                ["Masterclass agent", readiness.whatsapp.registrationEndpointSource === "existing-default" ? "existing whatsapp.sikhadenge.in" : "explicit endpoint"],
                ["Registration secret", readiness.whatsapp.registrationSecretConfigured ? "available" : "missing"],
                ["Status callback auth", readiness.whatsapp.statusCallbackSecretConfigured ? "available" : "missing"],
                ["Runtime bridge", readiness.whatsapp.runtimeReady ? "ready" : "blocked"],
                ["Safe health diagnostic", readiness.whatsapp.safeHealthDiagnosticConfigured ? "available" : "optional / not detected"],
              ]} missing={readiness.whatsapp.missing} onTest={() => run("whatsapp")} disabled={!readiness.whatsapp.readyForConnectivityTest || running !== null} result={results.whatsapp} />
            </div>

            <section style={{ marginTop: 18, background: "#0d1b2b", border: "1px solid #20344a", borderRadius: 18, padding: 18 }}>
              <h2 style={{ marginTop: 0 }}>Release blockers</h2>
              {readiness.blockers.length ? <ul style={{ color: "#c6d3df", lineHeight: 1.8 }}>{readiness.blockers.map((item) => <li key={item}>{item}</li>)}</ul> : <div style={{ color: "#86efac", fontWeight: 800 }}>Existing provider runtime configuration is available. Controlled real-provider evidence is still required before production activation.</div>}
              <div style={{ marginTop: 12, fontSize: 13, color: "#8294a8" }}>Public site: {readiness.site.publicSiteUrl || "not configured"} · Checkout signing secret: {readiness.site.checkoutSigningSecretConfigured ? "configured" : "missing"}</div>
              {!readiness.whatsapp.safeHealthDiagnosticConfigured && readiness.whatsapp.runtimeReady ? <div style={{ marginTop: 10, fontSize: 12, color: "#fcd34d", lineHeight: 1.55 }}>WhatsApp runtime can be ready even when the optional safe-health button is disabled. In that case, validate the existing agent with one controlled learner; never send a fake registration payload as a healthcheck.</div> : null}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

function ProviderCard(props: { title: string; status: string; rows: [string, any][]; missing: string[]; onTest: () => void; disabled: boolean; result?: string }) {
  return <section style={{ background: "#0d1b2b", border: "1px solid #20344a", borderRadius: 18, padding: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}><h2 style={{ margin: 0 }}>{props.title}</h2><span style={{ ...pill[props.status], padding: "6px 10px", borderRadius: 999, fontSize: 11, fontWeight: 900, textTransform: "uppercase" }}>{props.status}</span></div>
    <div style={{ marginTop: 16, display: "grid", gap: 8 }}>{props.rows.map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 8, borderBottom: "1px solid #1b2d40" }}><span style={{ color: "#8fa1b5" }}>{k}</span><strong style={{ textAlign: "right" }}>{String(v)}</strong></div>)}</div>
    {props.missing.length ? <div style={{ marginTop: 14, fontSize: 12, color: "#fca5a5", lineHeight: 1.6 }}>Missing / additional validation: {props.missing.join(", ")}</div> : null}
    <button onClick={props.onTest} disabled={props.disabled} style={{ marginTop: 16, width: "100%", padding: "11px 14px", borderRadius: 12, border: 0, background: props.disabled ? "#334155" : "#0ea5e9", color: "white", fontWeight: 900, cursor: props.disabled ? "not-allowed" : "pointer" }}>Run safe diagnostic</button>
    {props.result ? <div style={{ marginTop: 12, fontSize: 12, color: props.result.startsWith("PASS") ? "#86efac" : props.result.startsWith("FAIL") ? "#fca5a5" : "#cbd5e1", wordBreak: "break-word", lineHeight: 1.5 }}>{props.result}</div> : null}
  </section>;
}
