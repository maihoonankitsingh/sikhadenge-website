import Sparkline from "./Sparkline";

export default function StatCard({
  title,
  value,
  delta,
  progress,
  tone = "blue",
  spark = true,
}: {
  title: string;
  value: string;
  delta?: string;
  progress?: number; // 0..100
  tone?: "blue" | "gold";
  spark?: boolean;
}) {
  const pct = typeof progress === "number" ? Math.max(0, Math.min(100, progress)) : null;

  const bar =
    tone === "gold"
      ? "h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 shadow-[0_10px_25px_rgba(245,179,1,0.18)]"
      : "h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_10px_25px_rgba(37,99,235,0.18)]";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(2,6,23,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_22px_55px_rgba(2,6,23,0.10)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-slate-500">{title}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</div>
          {delta ? <div className="mt-1 text-xs text-slate-500">{delta}</div> : null}
        </div>
        {spark ? <div className="hidden sm:block">{<Sparkline />}</div> : null}
      </div>

      {pct !== null ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span>{pct.toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
            <div className={bar} style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
