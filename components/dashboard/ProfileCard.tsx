function Dot({ tone = "blue" }: { tone?: "blue" | "gold" }) {
  const cls =
    tone === "gold"
      ? "h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(245,179,1,0.15)]"
      : "h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)]";
  return <span className={cls} />;
}

export default function ProfileCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(2,6,23,0.08)]">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-slate-100 ring-2 ring-blue-500/25" />
          <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-1 ring-1 ring-slate-200">
            <Dot />
          </div>
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">Sikhadenge Admin</div>
          <div className="text-xs text-slate-500">Operations Panel</div>
        </div>
      </div>

      <div className="my-4 border-t border-slate-200" />

      <div className="grid grid-cols-3 gap-3">
        {[
          ["Leads", "128"],
          ["Admissions", "8"],
          ["Active Batches", "6"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-[11px] text-slate-500">{k}</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">{v}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          <Dot /> Follow-ups due
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          <Dot tone="gold" /> Payments pending
        </span>
      </div>
    </div>
  );
}
