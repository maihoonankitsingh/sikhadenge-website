export const revalidate = 0;
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { DASHBOARD_AUTH_COOKIE } from "@/lib/dashboard-auth";

type Metrics = {
  ok: boolean;
  date: string;
  counts: {
    total: number;
    laptop_yes: number;
    laptop_no: number;
    will_arrange_soon_or_unknown: number;
  };
  topSources: Array<{ key: string; count: number }>;
  topPages: Array<{ key: string; count: number }>;
  recent: Array<{
    name: string;
    phone: string;
    email: string | null;
    laptop: boolean | null;
    source: string | null;
    page: string | null;
    createdAt: string;
  }>;
  error?: string;
};

function labelLaptop(value: boolean | null) {
  if (value === true) return "Laptop: Yes";
  if (value === false) return "Laptop: No";
  return "Will arrange soon / Unknown";
}

function todayIST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function getMetrics(date: string, authCookie: string) {
  const qs = new URLSearchParams({ date });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/masterclass-metrics?${qs.toString()}`,
    {
      cache: "no-store",
      headers: authCookie
        ? { cookie: `${DASHBOARD_AUTH_COOKIE}=${authCookie}` }
        : {},
    },
  ).catch(() => null);

  if (!res) return null;
  return (await res.json().catch(() => null)) as Metrics | null;
}

function shiftDate(date: string, days: number) {
  const value = new Date(`${date}T00:00:00.000+05:30`);
  value.setDate(value.getDate() + days);
  return value.toISOString().slice(0, 10);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(DASHBOARD_AUTH_COOKIE)?.value || "";
  const date =
    typeof searchParams?.date === "string" && searchParams.date
      ? searchParams.date
      : todayIST();

  const data = await getMetrics(date, authCookie);
  const counts = data?.counts || {
    total: 0,
    laptop_yes: 0,
    laptop_no: 0,
    will_arrange_soon_or_unknown: 0,
  };

  const prevStr = shiftDate(date, -1);
  const nextStr = shiftDate(date, 1);
  const baseCard = "rounded-2xl border border-white/10 bg-[#111827] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]";
  const title = "text-xl font-semibold tracking-tight text-white";
  const sub = "text-sm text-[#B0B7C3]";

  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className={title}>Masterclass Leads Dashboard</div>
            <div className={sub}>Date (IST): {date}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href={`/admin/masterclass-dashboard?date=${prevStr}`}>← Prev</a>
            <a className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href={`/admin/masterclass-dashboard?date=${todayIST()}`}>Today</a>
            <a className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" href={`/admin/masterclass-dashboard?date=${nextStr}`}>Next →</a>
            <form className="ml-0 flex items-center gap-2 md:ml-2" action="/admin/masterclass-dashboard" method="get">
              <input type="date" name="date" defaultValue={date} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none" />
              <button className="rounded-xl bg-[#2563EB] px-3 py-2 text-sm font-medium hover:bg-[#1D4ED8]" type="submit">Go</button>
            </form>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className={baseCard}><div className="text-sm text-[#B0B7C3]">Total leads</div><div className="mt-1 text-3xl font-semibold">{counts.total}</div></div>
          <div className={baseCard}><div className="text-sm text-[#B0B7C3]">Laptop: Yes</div><div className="mt-1 text-3xl font-semibold">{counts.laptop_yes}</div></div>
          <div className={baseCard}><div className="text-sm text-[#B0B7C3]">Laptop: No</div><div className="mt-1 text-3xl font-semibold">{counts.laptop_no}</div></div>
          <div className={baseCard}><div className="text-sm text-[#B0B7C3]">Will arrange soon / Unknown</div><div className="mt-1 text-3xl font-semibold">{counts.will_arrange_soon_or_unknown}</div></div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <div className={baseCard}>
            <div className="text-sm font-semibold">Top Sources</div>
            <div className="mt-3 space-y-2">
              {(data?.topSources || []).length ? (
                data!.topSources.map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="truncate text-sm text-white/90">{item.key}</div>
                    <div className="text-sm font-medium">{item.count}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-[#9CA3AF]">No data</div>
              )}
            </div>
          </div>

          <div className={baseCard}>
            <div className="text-sm font-semibold">Top Pages</div>
            <div className="mt-3 space-y-2">
              {(data?.topPages || []).length ? (
                data!.topPages.map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="truncate text-sm text-white/90">{item.key}</div>
                    <div className="text-sm font-medium">{item.count}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-[#9CA3AF]">No data</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Recent leads (max 50)</div>
            <div className="text-xs text-[#9CA3AF]">Private session • createdAt desc</div>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="text-[#B0B7C3]">
                  <th className="py-2 pr-3">Time</th><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Phone</th><th className="py-2 pr-3">Email</th><th className="py-2 pr-3">Laptop</th><th className="py-2 pr-3">Source</th><th className="py-2 pr-3">Page</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {(data?.recent || []).length ? (
                  data!.recent.map((row, index) => (
                    <tr key={`${row.phone}_${index}`} className="border-t border-white/10">
                      <td className="py-2 pr-3 text-[#B0B7C3]">{new Date(row.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}</td>
                      <td className="py-2 pr-3">{row.name}</td>
                      <td className="py-2 pr-3 font-mono">{row.phone}</td>
                      <td className="py-2 pr-3 text-white/90">{row.email || "-"}</td>
                      <td className="py-2 pr-3">{labelLaptop(row.laptop)}</td>
                      <td className="py-2 pr-3 text-white/90">{row.source || "-"}</td>
                      <td className="py-2 pr-3 text-white/90">{row.page || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td className="py-4 text-[#9CA3AF]" colSpan={7}>No leads for this date</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {!data?.ok ? (
            <div className="mt-3 text-xs text-[#9CA3AF]">
              Metrics API returned no data{data?.error ? ` (${data.error})` : ""}.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
