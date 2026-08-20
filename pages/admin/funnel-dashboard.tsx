"use client";

import { useEffect, useMemo, useState } from "react";

type DashboardRow = {
  funnel: string;
  offerMode: string;
  uniqueVisitors: number;
  views: number;
  ctaClicks: number;
  leads: number;
  checkoutStarts: number;
  entryPurchases: number;
  masterclassJoined: number;
  masterclass30m: number;
  masterclass60m: number;
  masterclassOfferSeen: number;
  workshopCtaClicks: number;
  workshopPurchases: number;
  workshopAttended: number;
  qualifiedLeads: number;
  workingLeads: number;
  coreOfferSeen: number;
  corePurchases: number;
  lostLeads: number;
  refunds: number;
  leadConversionRate: number;
  checkoutConversionRate: number;
  showUpRate: number;
  retention30Rate: number;
  retention60Rate: number;
  workshopBuyerRate: number;
  workshopAttendanceRate: number;
  coreOfferConversionRate: number;
  leadToCorePurchaseRate: number;
  entryRevenue: number;
  workshopRevenue: number;
  coreRevenue: number;
  grossRevenue: number;
  refundValue: number;
  netRevenue: number;
};

type DashboardData = {
  ok: true;
  rangeDays: number;
  summary: {
    uniqueVisitors: number;
    views: number;
    leads: number;
    masterclassJoined: number;
    workshopPurchases: number;
    corePurchases: number;
    grossRevenue: number;
    refundValue: number;
    netRevenue: number;
  };
  rows: DashboardRow[];
  note: string;
};

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function pct(value: number) {
  return `${Number(value || 0).toFixed(1)}%`;
}

const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 20,
} as const;

const thStyle = {
  padding: "12px 14px",
  borderBottom: "1px solid #e2e8f0",
  whiteSpace: "nowrap",
} as const;

const tdStyle = {
  padding: "13px 14px",
  borderBottom: "1px solid #eef2f7",
  whiteSpace: "nowrap",
} as const;

export default function FunnelDashboardPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/admin/funnel-dashboard?days=${days}`);
        if (response.status === 401) {
          window.location.href = "/admin/login";
          return;
        }

        const body = await response.json();
        if (!response.ok || !body?.ok) {
          if (active) setError(body?.error || "Unable to load dashboard");
          return;
        }

        if (active) setData(body);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load dashboard");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [days]);

  const summaryRates = useMemo(() => {
    if (!data) return { showUp: 0, workshop: 0, core: 0 };
    const s = data.summary;
    return {
      showUp: s.leads ? (s.masterclassJoined / s.leads) * 100 : 0,
      workshop: s.masterclassJoined ? (s.workshopPurchases / s.masterclassJoined) * 100 : 0,
      core: s.leads ? (s.corePurchases / s.leads) * 100 : 0,
    };
  }, [data]);

  return (
    <main style={{ minHeight: "100vh", background: "#f6f8fb", color: "#0f172a", padding: "40px 18px 70px" }}>
      <div style={{ width: "min(1380px, 100%)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, color: "#2563eb", fontSize: 12, fontWeight: 900, letterSpacing: ".12em" }}>
              SIKHADENGE • FIRST-PARTY FUNNEL ANALYTICS
            </p>
            <h1 style={{ margin: "8px 0 0", fontSize: 38, letterSpacing: "-.04em" }}>
              AI Masterclass Funnel Dashboard
            </h1>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>
              ChatGPT vs Claude • Free vs Paid • Masterclass → Workshop → Core Program
            </p>
          </div>

          <label style={{ display: "grid", gap: 6, fontSize: 12, fontWeight: 800 }}>
            Reporting window
            <select
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
              style={{ minHeight: 42, border: "1px solid #d7dee8", borderRadius: 10, padding: "0 12px", background: "white" }}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={60}>Last 60 days</option>
              <option value={90}>Last 90 days</option>
              <option value={180}>Last 180 days</option>
            </select>
          </label>
        </div>

        {error ? (
          <div style={{ marginTop: 24, padding: 16, borderRadius: 12, border: "1px solid #fecaca", background: "#fff1f2", color: "#991b1b" }}>
            {error}
          </div>
        ) : null}

        {loading ? (
          <div style={{ marginTop: 24, padding: 16, borderRadius: 12, border: "1px solid #dbeafe", background: "#eff6ff", color: "#1e3a8a" }}>
            Loading funnel events…
          </div>
        ) : null}

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 14, marginTop: 30 }}>
          {[
            ["Unique visitors", data?.summary.uniqueVisitors ?? 0],
            ["Registrations", data?.summary.leads ?? 0],
            ["Live attendees", data?.summary.masterclassJoined ?? 0],
            ["Show-up rate", pct(summaryRates.showUp)],
            ["Workshop buyers", data?.summary.workshopPurchases ?? 0],
            ["Attendee → workshop", pct(summaryRates.workshop)],
            ["Core buyers", data?.summary.corePurchases ?? 0],
            ["Lead → core", pct(summaryRates.core)],
            ["Net tracked revenue", money(data?.summary.netRevenue ?? 0)],
          ].map(([label, value]) => (
            <article key={String(label)} style={cardStyle}>
              <span style={{ color: "#64748b", fontSize: 12, fontWeight: 800 }}>{label}</span>
              <strong style={{ display: "block", marginTop: 9, fontSize: 27, letterSpacing: "-.03em" }}>{value}</strong>
            </article>
          ))}
        </section>

        <section style={{ marginTop: 26, display: "grid", gap: 18 }}>
          {(data?.rows || []).map((row) => (
            <article key={`${row.funnel}:${row.offerMode}`} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <strong style={{ textTransform: "capitalize", fontSize: 18 }}>{row.funnel} • {row.offerMode}</strong>
                  <div style={{ marginTop: 4, color: "#64748b", fontSize: 12 }}>
                    {row.uniqueVisitors} unique visitors • {money(row.netRevenue)} net tracked revenue
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[`Lead CVR ${pct(row.leadConversionRate)}`, `Show-up ${pct(row.showUpRate)}`, `60m retention ${pct(row.retention60Rate)}`, `Lead → core ${pct(row.leadToCorePurchaseRate)}`].map((item) => (
                    <span key={item} style={{ padding: "7px 10px", borderRadius: 999, background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 800 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))", gap: 10 }}>
                  {[
                    ["Views", row.views],
                    ["CTA clicks", row.ctaClicks],
                    ["Leads", row.leads],
                    ["Checkout", row.checkoutStarts],
                    ["Entry paid", row.entryPurchases],
                    ["Live joined", row.masterclassJoined],
                    ["30 min", row.masterclass30m],
                    ["60 min", row.masterclass60m],
                    ["Offer seen", row.masterclassOfferSeen],
                    ["Workshop CTA", row.workshopCtaClicks],
                    ["Workshop paid", row.workshopPurchases],
                    ["Workshop attended", row.workshopAttended],
                    ["Qualified", row.qualifiedLeads],
                    ["Core offer", row.coreOfferSeen],
                    ["Core paid", row.corePurchases],
                  ].map(([label, value]) => (
                    <div key={String(label)} style={{ padding: 12, border: "1px solid #eef2f7", borderRadius: 12, background: "#fbfdff" }}>
                      <span style={{ color: "#64748b", fontSize: 10, fontWeight: 800 }}>{label}</span>
                      <strong style={{ display: "block", marginTop: 5, fontSize: 20 }}>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section style={{ marginTop: 26, overflow: "hidden", borderRadius: 18, border: "1px solid #e2e8f0", background: "white" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
            <strong>Commercial comparison</strong>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1250 }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#64748b", textAlign: "left", fontSize: 11 }}>
                  {["Funnel", "Entry", "Leads", "Show-up", "60m retention", "Workshop buyers", "Workshop buy rate", "Core offers", "Core buyers", "Core close rate", "Gross revenue", "Refunds", "Net revenue"].map((head) => (
                    <th key={head} style={thStyle}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(data?.rows || []).map((row) => (
                  <tr key={`commercial:${row.funnel}:${row.offerMode}`} style={{ fontSize: 13 }}>
                    <td style={{ ...tdStyle, fontWeight: 900, textTransform: "capitalize" }}>{row.funnel}</td>
                    <td style={{ ...tdStyle, textTransform: "capitalize" }}>{row.offerMode}</td>
                    <td style={tdStyle}>{row.leads}</td>
                    <td style={tdStyle}>{pct(row.showUpRate)}</td>
                    <td style={tdStyle}>{pct(row.retention60Rate)}</td>
                    <td style={tdStyle}>{row.workshopPurchases}</td>
                    <td style={tdStyle}>{pct(row.workshopBuyerRate)}</td>
                    <td style={tdStyle}>{row.coreOfferSeen}</td>
                    <td style={tdStyle}>{row.corePurchases}</td>
                    <td style={tdStyle}>{pct(row.coreOfferConversionRate)}</td>
                    <td style={tdStyle}>{money(row.grossRevenue)}</td>
                    <td style={tdStyle}>{money(row.refundValue)}</td>
                    <td style={{ ...tdStyle, fontWeight: 900 }}>{money(row.netRevenue)}</td>
                  </tr>
                ))}
                {data && data.rows.length === 0 ? (
                  <tr><td colSpan={13} style={{ padding: 28, textAlign: "center", color: "#64748b" }}>No funnel events in this reporting window yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <div style={{ marginTop: 20, borderRadius: 14, background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e3a8a", padding: 16, fontSize: 12, lineHeight: 1.6 }}>
          {data?.note || "Loading attribution note…"}
        </div>
      </div>
    </main>
  );
}
