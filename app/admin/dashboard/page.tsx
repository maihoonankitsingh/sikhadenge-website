export const revalidate = 0;
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import AdminPushControls from "../../../components/admin/AdminPushControls";
import { DASHBOARD_AUTH_COOKIE } from "@/lib/dashboard-auth";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type RowAny = Record<string, any>;
type ApiRes = {
  ok: boolean;
  model: string;
  total: number;
  take: number;
  skip: number;
  rows: RowAny[];
  error?: string;
};

const MODELS = [
  "MasterclassLead",
  "Lead",
  "Admission",
  "Payment",
  "PhoneOtp",
  "Blog",
  "Influencer",
  "InfluencerSession",
  "Enrollment",
  "ClassSession",
  "Attendance",
  "Batch",
] as const;

function todayIST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function buildQS(p: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    if (v && v.trim()) qs.set(k, v.trim());
  });
  return qs.toString();
}

async function fetchTable(
  params: { model: string; from?: string; to?: string; q?: string; take?: string; skip?: string },
  authCookie: string,
) {
  const qs = buildQS(params);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/table?${qs}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: authCookie
      ? { cookie: `${DASHBOARD_AUTH_COOKIE}=${encodeURIComponent(authCookie)}` }
      : {},
  }).catch(() => null);

  if (!res) return null;
  return (await res.json().catch(() => null)) as ApiRes | null;
}

function colKeys(rows: RowAny[]) {
  const set = new Set<string>();
  for (const row of rows.slice(0, 30)) {
    Object.keys(row || {}).forEach((key) => set.add(key));
  }

  const preferred = ["id", "name", "phone", "email", "status", "createdAt", "updatedAt"];
  const keys = Array.from(set);
  const first = preferred.filter((key) => keys.includes(key));
  const rest = keys.filter((key) => !first.includes(key)).sort();
  return [...first, ...rest].slice(0, 20);
}

function fmtVal(value: any) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string") return value.length > 120 ? `${value.slice(0, 120)}…` : value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    const text = JSON.stringify(value);
    return text.length > 140 ? `${text.slice(0, 140)}…` : text;
  }
  return String(value);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(DASHBOARD_AUTH_COOKIE)?.value || "";

  const model =
    typeof searchParams?.model === "string" && MODELS.includes(searchParams.model as any)
      ? (searchParams.model as (typeof MODELS)[number])
      : "MasterclassLead";

  const from = typeof searchParams?.from === "string" ? searchParams.from : "";
  const to = typeof searchParams?.to === "string" ? searchParams.to : "";
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const take = typeof searchParams?.take === "string" ? searchParams.take : "50";
  const skip = typeof searchParams?.skip === "string" ? searchParams.skip : "0";

  const data = await fetchTable({ model, from, to, q, take, skip }, authCookie);
  const rows = data?.rows || [];
  const keys = colKeys(rows);

  const skipN = Number(skip) || 0;
  const takeN = Number(take) || 50;
  const total = data?.total || 0;
  const prevSkip = Math.max(skipN - takeN, 0);
  const nextSkip = skipN + takeN;

  const shell = "min-h-screen bg-[#0B1220] text-white";
  const card = "rounded-2xl border border-white/10 bg-[#111827] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]";
  const btn = "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10";
  const btnP = "rounded-xl bg-[#2563EB] px-3 py-2 text-sm font-medium hover:bg-[#1D4ED8]";

  const baseParams = (extra: Record<string, string>) =>
    buildQS({ model, from, to, q, take, ...extra });

  return (
    <main className={shell}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-2xl font-semibold tracking-tight">Admin Dashboard (Read-only)</div>
        <div className="mt-1 text-sm text-[#B0B7C3]">Model-wise data + filters (IST date)</div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <AdminPushControls model={model} take={Math.min(Math.max(takeN, 1), 2000)} />
          <div className="text-xs text-[#9CA3AF]">Protected by the private dashboard session.</div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
          <aside className={`${card} p-3`}>
            <div className="px-2 py-2 text-sm font-semibold">Models</div>
            <div className="mt-1 space-y-1">
              {MODELS.map((item) => (
                <a
                  key={item}
                  className={
                    "block rounded-xl px-3 py-2 text-sm " +
                    (item === model ? "border border-white/10 bg-white/10" : "hover:bg-white/5")
                  }
                  href={`/admin/dashboard?${baseParams({ model: item, skip: "0" })}`}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-[#9CA3AF]">
              Authentication is stored in an HttpOnly session cookie. No admin token is placed in the URL.
            </div>
          </aside>

          <section className="space-y-4">
            <div className={`${card} p-4`}>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-semibold">{model}</div>
                  <div className="text-xs text-[#9CA3AF]">Total: {total}</div>
                </div>

                <form className="flex flex-wrap items-end gap-2" action="/admin/dashboard" method="get">
                  <input type="hidden" name="model" value={model} />

                  <div>
                    <div className="mb-1 text-xs text-[#9CA3AF]">From</div>
                    <input className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" type="date" name="from" defaultValue={from} />
                  </div>

                  <div>
                    <div className="mb-1 text-xs text-[#9CA3AF]">To</div>
                    <input className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" type="date" name="to" defaultValue={to} />
                  </div>

                  <div className="min-w-[220px]">
                    <div className="mb-1 text-xs text-[#9CA3AF]">Search</div>
                    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" name="q" defaultValue={q} placeholder="phone / name / utm / id..." />
                  </div>

                  <div>
                    <div className="mb-1 text-xs text-[#9CA3AF]">Rows</div>
                    <select className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" name="take" defaultValue={take}>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                  </div>

                  <input type="hidden" name="skip" value="0" />
                  <button className={btnP} type="submit">Apply</button>
                  <a className={btn} href={`/admin/dashboard?${baseParams({ from: todayIST(), to: todayIST(), skip: "0" })}`}>Today</a>
                  <a className={btn} href={`/admin/dashboard?${baseParams({ from: "", to: "", q: "", skip: "0" })}`}>Reset</a>
                </form>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-[#9CA3AF]">
                Showing {total ? Math.min(skipN + 1, total) : 0}–{Math.min(skipN + takeN, total)} of {total}
              </div>
              <div className="flex items-center gap-2">
                <a className={btn} href={`/admin/dashboard?${baseParams({ skip: String(prevSkip) })}`}>← Prev</a>
                <a className={btn} href={`/admin/dashboard?${baseParams({ skip: String(nextSkip) })}`}>Next →</a>
              </div>
            </div>

            <div className={`${card} p-4`}>
              {!data?.ok ? (
                <div className="text-sm text-[#9CA3AF]">
                  Data fetch failed. {data?.error ? `Error: ${data.error}` : ""}
                </div>
              ) : null}

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead>
                    <tr className="text-[#B0B7C3]">
                      {keys.map((key) => (
                        <th key={key} className="py-2 pr-3">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    {rows.length ? (
                      rows.map((row, index) => (
                        <tr key={`${row.id || index}_${index}`} className="border-t border-white/10">
                          {keys.map((key) => (
                            <td key={key} className="py-2 pr-3 text-white/90">{fmtVal(row[key])}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-4 text-[#9CA3AF]" colSpan={keys.length || 1}>No rows</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-xs text-[#9CA3AF]">
                Read-only view. No create/update/delete actions included.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
