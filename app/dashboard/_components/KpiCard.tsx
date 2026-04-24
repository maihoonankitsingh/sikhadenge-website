export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { ReactNode } from "react";

export function KpiCard({
  title,
  value,
  delta,
  icon,
}: {
  title: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</div>
          <div className="mt-3 text-2xl font-semibold text-slate-900">{value}</div>
        </div>
        {icon ? (
          <div className="rounded-xl bg-slate-100 p-2 text-slate-500">{icon}</div>
        ) : null}
      </div>
      {delta ? <div className="mt-4 text-sm font-medium text-emerald-600">{delta}</div> : null}
    </div>
  );
}
