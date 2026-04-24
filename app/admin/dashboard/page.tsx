export const revalidate = 0;
import AdminPushControls from "../../../components/admin/AdminPushControls";
export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type RowAny = Record<string, any>;
type ApiRes = { ok: boolean; model: string; total: number; take: number; skip: number; rows: RowAny[]; error?: string };

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
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

function buildQS(p: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    if (v && v.trim()) qs.set(k, v.trim());
  });
  return qs.toString();
}

async function fetchTable(params: { model: string; from?: string; to?: string; q?: string; take?: string; skip?: string; token?: string }) {
  const qs = buildQS(params as any);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/table?${qs}`;
  const res = await fetch(url, { cache: "no-store" }).catch(() => null);
  if (!res) return null;
  return (await res.json().catch(() => null)) as ApiRes | null;
}

function colKeys(rows: RowAny[]) {
  const set = new Set<string>();
  for (const r of rows.slice(0, 30)) {
    Object.keys(r || {}).forEach((k) => set.add(k));
  }
  // keep id/name/phone/email first if present
  const preferred = ["id", "name", "phone", "email", "status", "createdAt", "updatedAt"];
  const keys = Array.from(set);
  const first = preferred.filter((k) => keys.includes(k));
  const rest = keys.filter((k) => !first.includes(k)).sort();
  return [...first, ...rest].slice(0, 20); // max 20 columns for readability
}

function fmtVal(v: any) {
  if (v === null || v === undefined) return "-";
  if (typeof v === "string") return v.length > 120 ? v.slice(0, 120) + "…" : v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "object") return JSON.stringify(v).slice(0, 140) + (JSON.stringify(v).length > 140 ? "…" : "");
  return String(v);
}

export default async function Page({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const model = (typeof searchParams?.model === "string" && MODELS.includes(searchParams.model as any))
    ? (searchParams.model as typeof MODELS[number])
    : "MasterclassLead";

  const from = typeof searchParams?.from === "string" ? searchParams.from : "";
  const to = typeof searchParams?.to === "string" ? searchParams.to : "";
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const take = typeof searchParams?.take === "string" ? searchParams.take : "50";
  const skip = typeof searchParams?.skip === "string" ? searchParams.skip : "0";
  const token = typeof searchParams?.token === "string" ? searchParams.token : undefined;

  const data = await fetchTable({ model, from, to, q, take, skip, token });

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

  const baseParams = (extra: Record<string, string>) => {
    const p: Record<string, string> = { model, from, to, q, take, ...extra };
    if (token) p.token = token;
    return buildQS(p);
  };

  return (
    <main className={shell}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-2xl font-semibold tracking-tight">Admin Dashboard (Read-only)</div>
        <div className="mt-1 text-sm text-[#B0B7C3]">Model-wise data + filters (IST date)</div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <AdminPushControls token={token || ""} />
          <div className="text-xs text-[#9CA3AF]">Read-only. Push uses webhook. Timeout safe.</div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className={card + " p-3"}>
            <div className="text-sm font-semibold px-2 py-2">Models</div>
            <div className="mt-1 space-y-1">
              {MODELS.map((m) => (
                <a
                  key={m}
                  className={
                    "block rounded-xl px-3 py-2 text-sm " +
                    (m === model ? "bg-white/10 border border-white/10" : "hover:bg-white/5")
                  }
                  href={`/admin/dashboard?${baseParams({ model: m, skip: "0" })}`}
                >
                  {m}
                </a>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-[#9CA3AF]">
              Tip: If ADMIN_TOKEN enabled, open with <span className="text-white/80">?token=TOKEN</span>.
            </div>
          </aside>

          {/* Main */}
          <section className="space-y-4">
            {/* Filters */}
            <div className={card + " p-4"}>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-semibold">{model}</div>
                  <div className="text-xs text-[#9CA3AF]">Total: {total}</div>
                </div>

                <form className="flex flex-wrap items-end gap-2" action="/admin/dashboard" method="get">
                  <input type="hidden" name="model" value={model} />
                  {token ? <input type="hidden" name="token" value={token} /> : null}

                  <div>
                    <div className="text-xs text-[#9CA3AF] mb-1">From</div>
                    <input className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" type="date" name="from" defaultValue={from} />
                  </div>

                  <div>
                    <div className="text-xs text-[#9CA3AF] mb-1">To</div>
                    <input className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" type="date" name="to" defaultValue={to} />
                  </div>

                  <div className="min-w-[220px]">
                    <div className="text-xs text-[#9CA3AF] mb-1">Search</div>
                    <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" name="q" defaultValue={q} placeholder="phone / name / utm / id..." />
                  </div>

                  <div>
                    <div className="text-xs text-[#9CA3AF] mb-1">Rows</div>
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

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#9CA3AF]">
                Showing {total ? Math.min(skipN + 1, total) : 0}–{Math.min(skipN + takeN, total)} of {total}
              </div>
              <div className="flex items-center gap-2">
                <a className={btn} href={`/admin/dashboard?${baseParams({ skip: String(prevSkip) })}`}>← Prev</a>
                <a className={btn} href={`/admin/dashboard?${baseParams({ skip: String(nextSkip) })}`}>Next →</a>
              </div>
            </div>

            {/* Table */}
            <div className={card + " p-4"}>
              {!data?.ok ? (
                <div className="text-sm text-[#9CA3AF]">
                  Data fetch failed (safe-mode). {data?.error ? `Error: ${data.error}` : ""}
                </div>
              ) : null}

              <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full text-left text-sm">
                  <thead>
                    <tr className="text-[#B0B7C3]">
                      {keys.map((k) => (
                        <th key={k} className="py-2 pr-3">{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    {rows.length ? rows.map((r, i) => (
                      <tr key={(r.id || i) + "_" + i} className="border-t border-white/10">
                        {keys.map((k) => (
                          <td key={k} className="py-2 pr-3 text-white/90">{fmtVal(r[k])}</td>
                        ))}
                      </tr>
                    )) : (
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
