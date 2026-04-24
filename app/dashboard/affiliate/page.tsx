"use client";

import { useEffect, useMemo, useState } from "react";

type StatsResponse = {
  ok: boolean;
  summary?: {
    totalAffiliates: number;
    pendingAffiliates: number;
    approvedAffiliates: number;
    rejectedAffiliates: number;
    blockedAffiliates: number;
    totalClicks: number;
  };
  clicksByAffiliate?: Array<{
    affiliatePartnerId: string;
    affiliateCode: string | null;
    clicks: number;
    affiliate: {
      id: string;
      fullName: string;
      status: string;
      phone: string | null;
      email: string | null;
    } | null;
  }>;
  latestClicks?: Array<{
    id: string;
    affiliateCode: string | null;
    landingPage: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    createdAt: string;
    affiliatePartner: {
      fullName: string;
      status: string;
    } | null;
  }>;
};

type AffiliatesResponse = {
  ok: boolean;
  summary?: {
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
    BLOCKED: number;
    TOTAL: number;
  };
  items?: Array<{
    id: string;
    fullName: string;
    phone: string;
    email: string | null;
    city: string | null;
    sourceType: string | null;
    audienceType: string | null;
    status: string;
    affiliateCode: string | null;
    referralLink: string | null;
    approvedAt: string | null;
    rejectedAt: string | null;
    createdAt: string;
  }>;
};

type ClicksResponse = {
  ok: boolean;
  items?: Array<{
    id: string;
    affiliateCode: string | null;
    landingPage: string | null;
    referrerUrl: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    createdAt: string;
    affiliatePartner: {
      fullName: string;
      phone: string | null;
      email: string | null;
      status: string;
    } | null;
  }>;
};

type LeadCapturesResponse = {
  ok: boolean;
  items?: Array<{
    id: string;
    affiliateCode: string | null;
    fullName: string | null;
    phone: string | null;
    email: string | null;
    courseInterest: string | null;
    sourcePage: string | null;
    captureSource: string | null;
    createdAt: string;
    affiliatePartner: {
      fullName: string;
      phone: string | null;
      email: string | null;
      status: string;
    } | null;
  }>;
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN");
}

export default function AffiliateDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [affiliates, setAffiliates] = useState<AffiliatesResponse | null>(null);
  const [clicks, setClicks] = useState<ClicksResponse | null>(null);
  const [leadCaptures, setLeadCaptures] = useState<LeadCapturesResponse | null>(null);

  async function loadAll() {
    setLoading(true);
    setError("");

    try {
      const [statsRes, affiliatesRes, clicksRes, capturesRes] = await Promise.all([
        fetch("/api/admin/affiliate/stats", { cache: "no-store" }),
        fetch("/api/admin/affiliate/list?limit=20", { cache: "no-store" }),
        fetch("/api/admin/affiliate/clicks?limit=20", { cache: "no-store" }),
        fetch("/api/admin/affiliate/lead-captures?limit=20", { cache: "no-store" }),
      ]);

      const [statsJson, affiliatesJson, clicksJson, capturesJson] = await Promise.all([
        statsRes.json(),
        affiliatesRes.json(),
        clicksRes.json(),
        capturesRes.json(),
      ]);

      if (!statsRes.ok || !statsJson?.ok) throw new Error("Failed to load affiliate stats.");
      if (!affiliatesRes.ok || !affiliatesJson?.ok) throw new Error("Failed to load affiliate list.");
      if (!clicksRes.ok || !clicksJson?.ok) throw new Error("Failed to load affiliate clicks.");
      if (!capturesRes.ok || !capturesJson?.ok) throw new Error("Failed to load affiliate lead captures.");

      setStats(statsJson);
      setAffiliates(affiliatesJson);
      setClicks(clicksJson);
      setLeadCaptures(capturesJson);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load affiliate dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  const summaryCards = useMemo(() => {
    const s = stats?.summary;
    if (!s) return [];
    return [
      { label: "Total Affiliates", value: s.totalAffiliates },
      { label: "Pending", value: s.pendingAffiliates },
      { label: "Approved", value: s.approvedAffiliates },
      { label: "Rejected", value: s.rejectedAffiliates },
      { label: "Blocked", value: s.blockedAffiliates },
      { label: "Total Clicks", value: s.totalClicks },
    ];
  }, [stats]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                Dashboard / Affiliate
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">Affiliate Command Center</h1>
              <p className="mt-2 text-sm text-slate-600">
                Monitor affiliate applications, clicks, and lead captures from one place.
              </p>
            </div>

            <button
              onClick={loadAll}
              className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
            Loading affiliate dashboard...
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              {summaryCards.map((card) => (
                <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {card.label}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-slate-900">{card.value}</div>
                </div>
              ))}
            </div>

            <SectionCard title="Affiliates (Latest 20)">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Phone</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Code</th>
                      <th className="px-4 py-3 font-semibold">Source</th>
                      <th className="px-4 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(affiliates?.items || []).map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 align-top">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{item.fullName}</div>
                          <div className="text-xs text-slate-500">{item.email || "-"}</div>
                        </td>
                        <td className="px-4 py-3">{item.phone}</td>
                        <td className="px-4 py-3">{item.status}</td>
                        <td className="px-4 py-3 break-all">{item.affiliateCode || "-"}</td>
                        <td className="px-4 py-3">{item.sourceType || "-"}</td>
                        <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Clicks (Latest 20)">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3 font-semibold">Affiliate</th>
                      <th className="px-4 py-3 font-semibold">Code</th>
                      <th className="px-4 py-3 font-semibold">Landing Page</th>
                      <th className="px-4 py-3 font-semibold">UTM</th>
                      <th className="px-4 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(clicks?.items || []).map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 align-top">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{item.affiliatePartner?.fullName || "-"}</div>
                          <div className="text-xs text-slate-500">{item.affiliatePartner?.status || "-"}</div>
                        </td>
                        <td className="px-4 py-3">{item.affiliateCode || "-"}</td>
                        <td className="px-4 py-3 break-all">{item.landingPage || "-"}</td>
                        <td className="px-4 py-3">
                          <div>{item.utmSource || "-"}</div>
                          <div className="text-xs text-slate-500">
                            {item.utmMedium || "-"} / {item.utmCampaign || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Lead Captures (Latest 20)">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-4 py-3 font-semibold">Lead Name</th>
                      <th className="px-4 py-3 font-semibold">Phone</th>
                      <th className="px-4 py-3 font-semibold">Affiliate Code</th>
                      <th className="px-4 py-3 font-semibold">Course</th>
                      <th className="px-4 py-3 font-semibold">Source</th>
                      <th className="px-4 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(leadCaptures?.items || []).map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 align-top">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{item.fullName || "-"}</div>
                          <div className="text-xs text-slate-500">{item.email || "-"}</div>
                        </td>
                        <td className="px-4 py-3">{item.phone || "-"}</td>
                        <td className="px-4 py-3">{item.affiliateCode || "-"}</td>
                        <td className="px-4 py-3">{item.courseInterest || "-"}</td>
                        <td className="px-4 py-3">{item.captureSource || "-"}</td>
                        <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>
        )}
      </section>
    </main>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="p-2 sm:p-4">{children}</div>
    </section>
  );
}
