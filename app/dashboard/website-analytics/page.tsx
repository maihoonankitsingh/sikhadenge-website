"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

type OverviewData = {
  todayVisitors: number;
  todayViews: number;
  todayAvgDurationSec: number;
  todayAvgDurationText: string;
  todayEngagedSessions: number;
  todayNewUsers: number;
  yesterdayVisitors: number;
  last7Visitors: number;
  last7Views: number;
  monthVisitors: number;
  monthViews: number;
  monthAvgDurationSec: number;
  monthAvgDurationText: string;
  monthEngagedSessions: number;
  monthNewUsers: number;
};

type RealtimePage = {
  page: string;
  activeUsers: number;
  views: number;
};

type TopPage = {
  pagePath: string;
  views: number;
  users: number;
  avgDurationSec: number;
  avgDurationText: string;
  engagedSessions: number;
};

type TrendRow = {
  date: string;
  visitors: number;
  views: number;
};

function Card({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string | number;
  subtext?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <div className="text-sm text-[#9CA3AF]">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
      {subtext ? <div className="mt-1 text-xs text-[#B0B7C3]">{subtext}</div> : null}
    </div>
  );
}

export default function WebsiteAnalyticsPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [realtime, setRealtime] = useState<{ totalActiveUsers: number; pages: RealtimePage[] } | null>(null);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [trend, setTrend] = useState<TrendRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    try {
      const [overviewRes, realtimeRes, topPagesRes, trendRes] = await Promise.all([
        fetch("/api/analytics/overview", { cache: "no-store" }),
        fetch("/api/analytics/realtime", { cache: "no-store" }),
        fetch("/api/analytics/top-pages", { cache: "no-store" }),
        fetch("/api/analytics/trend", { cache: "no-store" }),
      ]);

      const overviewJson = await overviewRes.json();
      const realtimeJson = await realtimeRes.json();
      const topPagesJson = await topPagesRes.json();
      const trendJson = await trendRes.json();

      setOverview(overviewJson.data || null);
      setRealtime(realtimeJson.data || null);
      setTopPages(topPagesJson.data || []);
      setTrend(trendJson.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    const interval = setInterval(() => {
      fetch("/api/analytics/realtime", { cache: "no-store" })
        .then((r) => r.json())
        .then((json) => setRealtime(json.data || null))
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1220] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Website Analytics</h1>
          <p className="mt-2 text-sm text-[#B0B7C3]">
            Live users, visitor trends, top pages, and engagement overview.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 text-sm text-[#B0B7C3]">
            Loading analytics...
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card
                title="Live Active Users"
                value={realtime?.totalActiveUsers || 0}
                subtext="Auto refresh every 30 sec"
              />
              <Card
                title="Today Visitors"
                value={overview?.todayVisitors || 0}
                subtext={`Views: ${overview?.todayViews || 0}`}
              />
              <Card
                title="Yesterday Visitors"
                value={overview?.yesterdayVisitors || 0}
              />
              <Card
                title="Last 7 Days Visitors"
                value={overview?.last7Visitors || 0}
                subtext={`Views: ${overview?.last7Views || 0}`}
              />
              <Card
                title="This Month Visitors"
                value={overview?.monthVisitors || 0}
                subtext={`Views: ${overview?.monthViews || 0}`}
              />
              <Card
                title="Avg Session Duration"
                value={overview?.monthAvgDurationText || "0s"}
                subtext="Based on last 30 days"
              />
              <Card
                title="Engaged Sessions"
                value={overview?.monthEngagedSessions || 0}
              />
              <Card
                title="New Users"
                value={overview?.monthNewUsers || 0}
              />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
                <div className="mb-4 text-lg font-semibold">Last 7 Days Trend</div>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trend}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Line type="monotone" dataKey="visitors" stroke="#2563EB" strokeWidth={2} />
                      <Line type="monotone" dataKey="views" stroke="#F5B301" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
                <div className="mb-4 text-lg font-semibold">Realtime Pages</div>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={realtime?.pages || []}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="page" stroke="#9CA3AF" hide />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="activeUsers" fill="#2563EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-5">
              <div className="mb-4 text-lg font-semibold">Top Pages (Last 30 Days)</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-[#9CA3AF]">
                      <th className="px-3 py-3">Page</th>
                      <th className="px-3 py-3">Views</th>
                      <th className="px-3 py-3">Users</th>
                      <th className="px-3 py-3">Avg Time</th>
                      <th className="px-3 py-3">Engaged Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((item) => (
                      <tr key={item.pagePath} className="border-b border-white/5">
                        <td className="px-3 py-3 text-white">{item.pagePath}</td>
                        <td className="px-3 py-3 text-[#B0B7C3]">{item.views}</td>
                        <td className="px-3 py-3 text-[#B0B7C3]">{item.users}</td>
                        <td className="px-3 py-3 text-[#B0B7C3]">{item.avgDurationText}</td>
                        <td className="px-3 py-3 text-[#B0B7C3]">{item.engagedSessions}</td>
                      </tr>
                    ))}
                    {!topPages.length ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-6 text-center text-[#9CA3AF]">
                          No page data found yet.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
