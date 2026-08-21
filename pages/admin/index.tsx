import React, { useEffect, useState } from "react";

type MeOk = { ok: true; user: { username: string } };

export default function AdminDashboard() {
  const [me, setMe] = useState<MeOk | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/me");
      if (!res.ok) {
        window.location.href = "/admin/login";
        return;
      }
      const j = (await res.json().catch(() => null)) as MeOk | null;
      if (!j || j.ok !== true) {
        window.location.href = "/admin/login";
        return;
      }
      setMe(j);
    })();
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/admin/login";
  }

  if (!me) return <div style={{ padding: 16, color: "#fff" }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", padding: 16 }}>
      <div
        style={{
          width: "min(1080px, 100%)",
          margin: "0 auto",
          background: "rgba(255,255,255,.96)",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 18px 50px rgba(0,0,0,.20)",
          border: "1px solid rgba(15,23,42,.12)",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Admin Dashboard</div>
            <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
              Signed in as <b>{me.user.username}</b>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              height: 42,
              padding: "0 14px",
              borderRadius: 12,
              border: "1px solid rgba(15,23,42,.14)",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            <Card title="Funnel CRM" desc="Learner lifecycle, advisor workflow, follow-ups, revenue and audit trail" href="/admin/funnel-crm" />
            <Card title="Decision Intelligence" desc="Executive economics, cohort conversion, campaign/ad revenue and operational bottlenecks" href="/admin/funnel-dashboard" />
            <Card title="Follow-up Intelligence" desc="Reminder-by-reminder WhatsApp sent, delivered, read, failure and send-delay telemetry" href="/admin/funnel-followups" />
            <Card title="Integration Console" desc="Safe readiness diagnostics for existing Razorpay, Meta and SikhaDenge WhatsApp integrations" href="/admin/funnel-integrations" />
            <Card title="Influencers" desc="Create/disable promo codes, reset passwords" href="/admin/influencers" />
            <Card title="Leads" desc="Legacy lead view, promo attribution and generic status updates" href="/admin/leads" />
          </div>

          <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
            Funnel CRM is the operational workspace. Verified FunnelEvent and FunnelPayment records remain the source of truth for conversion and commercial metrics; missing spend or message-step data is shown as missing rather than estimated.
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "#0f172a",
        border: "1px solid rgba(15,23,42,.12)",
        borderRadius: 16,
        padding: 14,
        background: "rgba(255,255,255,.92)",
        display: "grid",
        gap: 6,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
      <div style={{ fontSize: 12, color: "rgba(15,23,42,.68)", lineHeight: 1.4 }}>{desc}</div>
      <div style={{ fontWeight: 900, fontSize: 12.5, marginTop: 6, color: "rgba(15,23,42,.78)" }}>
        Open →
      </div>
    </a>
  );
}
