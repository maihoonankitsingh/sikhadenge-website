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
          width: "min(980px, 100%)",
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Card title="Influencers" desc="Create/disable promo codes, reset passwords" href="/admin/influencers" />
            <Card title="Leads" desc="View leads, promo attribution, update status" href="/admin/leads" />
          </div>

          <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
            Next: admissions + payout reports
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

