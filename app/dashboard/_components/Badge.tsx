export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { ReactNode } from "react";

type BadgeTone = "slate" | "emerald" | "amber" | "rose" | "indigo";

const toneStyles: Record<BadgeTone, string> = {
  slate: "bg-slate-100 text-slate-600 border-slate-200",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  rose: "bg-rose-100 text-rose-700 border-rose-200",
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
        toneStyles[tone]
      }`}
    >
      {children}
    </span>
  );
}
