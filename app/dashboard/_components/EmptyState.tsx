export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
      <div className="text-sm font-semibold text-slate-700">{title}</div>
      {description ? <div className="mt-2 text-sm text-slate-500">{description}</div> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
