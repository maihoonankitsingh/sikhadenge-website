import React, { useEffect, useState } from "react";
import Link from "next/link";

type Kpis = {
  students: number;
  publishedCourses: number;
  enrollments: number;
  revenueTotal: number;
  revenueThisMonth: number;
  paidCount: number;
  certificates: number;
  pendingSubmissions: number;
  openDoubts: number;
  liveClasses: number;
};
type TopCourse = { id: string; title: string; priceInr: number; isPublished: boolean; enrollments: number };
type Payment = { amountInr: number; couponCode: string | null; createdAt: string; studentName: string; courseTitle: string };
type Coupon = { code: string | null; count: number; revenue: number };

export default function AdminAnalytics() {
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/admin/lms/analytics");
      if (r.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const j = await r.json().catch(() => null);
      if (j?.ok) {
        setKpis(j.kpis);
        setTopCourses(j.topCourses || []);
        setPayments(j.recentPayments || []);
        setCoupons(j.topCoupons || []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900 }}>Analytics</h1>
        <Link href="/admin/lms" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>← Courses</Link>
      </div>

      {loading || !kpis ? (
        <div style={{ marginTop: 20 }}>Loading…</div>
      ) : (
        <>
          {/* Revenue highlight */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 18 }}>
            <Kpi label="Total Revenue" value={`₹${kpis.revenueTotal.toLocaleString("en-IN")}`} accent />
            <Kpi label="This Month" value={`₹${kpis.revenueThisMonth.toLocaleString("en-IN")}`} accent />
            <Kpi label="Paid Orders" value={kpis.paidCount} />
            <Kpi label="Students" value={kpis.students} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginTop: 12 }}>
            <Kpi label="Enrollments" value={kpis.enrollments} />
            <Kpi label="Published Courses" value={kpis.publishedCourses} />
            <Kpi label="Live Classes" value={kpis.liveClasses} />
            <Kpi label="Certificates" value={kpis.certificates} />
          </div>

          {/* Pending work */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 12 }}>
            <ActionKpi label="Submissions to grade" value={kpis.pendingSubmissions} href="/admin/lms/submissions" />
            <ActionKpi label="Open doubts" value={kpis.openDoubts} href="/admin/lms/doubts" />
          </div>

          {/* Top courses */}
          <h2 style={h2}>Top Courses (by enrollment)</h2>
          {topCourses.length === 0 ? (
            <Empty />
          ) : (
            <div style={{ display: "grid", gap: 6 }}>
              {topCourses.map((c) => (
                <Link key={c.id} href={`/admin/lms/${c.id}`} style={rowLink}>
                  <span style={{ fontWeight: 700, fontSize: 13.5 }}>{c.title}{!c.isPublished && <span style={{ color: "#92400e", fontSize: 11, marginLeft: 6 }}>(draft)</span>}</span>
                  <span style={{ fontSize: 13, color: "#334155" }}>{c.enrollments} enrolled</span>
                </Link>
              ))}
            </div>
          )}

          {/* Recent payments */}
          <h2 style={h2}>Recent Payments</h2>
          {payments.length === 0 ? (
            <Empty />
          ) : (
            <div style={{ display: "grid", gap: 6 }}>
              {payments.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", border: "1px solid #eef2f7", borderRadius: 10, fontSize: 13, flexWrap: "wrap", gap: 4 }}>
                  <span><b>{p.studentName}</b> · {p.courseTitle}{p.couponCode ? <span style={{ color: "#3730a3", marginLeft: 6, fontSize: 11.5 }}>{p.couponCode}</span> : null}</span>
                  <span style={{ fontWeight: 800, color: "#16a34a" }}>₹{p.amountInr.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          )}

          {/* Coupons (influencer attribution) */}
          {coupons.length > 0 && (
            <>
              <h2 style={h2}>Top Coupons (influencer sales)</h2>
              <div style={{ display: "grid", gap: 6 }}>
                {coupons.map((c) => (
                  <div key={c.code || "-"} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", border: "1px solid #eef2f7", borderRadius: 10, fontSize: 13 }}>
                    <span style={{ fontWeight: 700 }}>{c.code}</span>
                    <span style={{ color: "#334155" }}>{c.count} sales · ₹{c.revenue.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </Shell>
  );
}

function Kpi({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{ padding: 16, borderRadius: 14, background: accent ? "linear-gradient(135deg,#fff1ee,#ffe6e1)" : "#f8fafc", border: "1px solid #eef2f7" }}>
      <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, marginTop: 4, color: accent ? "#ff5a45" : "#0f172a" }}>{value}</div>
    </div>
  );
}

function ActionKpi({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{ padding: 16, borderRadius: 14, background: value > 0 ? "#fef3c7" : "#f8fafc", border: "1px solid #eef2f7" }}>
        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 900, marginTop: 4, color: value > 0 ? "#b45309" : "#0f172a" }}>{value} →</div>
      </div>
    </Link>
  );
}

function Empty() {
  return <div style={{ fontSize: 13, color: "#94a3b8", padding: "8px 0" }}>No data yet.</div>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: 16, color: "#0f172a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,.08)" }}>
        {children}
      </div>
    </div>
  );
}

const h2: React.CSSProperties = { fontSize: 15, fontWeight: 800, margin: "26px 0 10px" };
const rowLink: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", border: "1px solid #eef2f7", borderRadius: 10, textDecoration: "none", color: "#0f172a", background: "#fff" };
