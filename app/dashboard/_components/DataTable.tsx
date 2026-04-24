export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";

export type DataColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

type QueryValue = string | number | undefined | null;

function buildHref(basePath: string, page: number, query?: Record<string, QueryValue>) {
  const params = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || key === "page") continue;
      params.set(key, String(value));
    }
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function DataTable<T>({
  columns,
  rows,
  page,
  pageSize,
  total,
  basePath,
  query,
  emptyLabel = "No data available",
}: {
  columns: Array<DataColumn<T>>;
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  basePath: string;
  query?: Record<string, QueryValue>;
  emptyLabel?: string;
}) {
  const safePage = Math.max(1, page);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(total, safePage * pageSize);

  if (rows.length === 0) {
    return <EmptyState title={emptyLabel} description="Try adjusting filters or sync new data." />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={`px-4 py-3 font-semibold ${column.className ?? ""}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-slate-700">
              {columns.map((column) => (
                <td key={column.key} className={`px-4 py-3 ${column.className ?? ""}`}>
                  {column.render ? column.render(row) : (row as Record<string, ReactNode>)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          Showing {start}-{end} of {total}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={buildHref(basePath, Math.max(1, safePage - 1), query)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              safePage === 1
                ? "pointer-events-none bg-slate-200 text-slate-400"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Prev
          </Link>
          <span className="text-xs font-semibold text-slate-600">
            {safePage} / {totalPages}
          </span>
          <Link
            href={buildHref(basePath, Math.min(totalPages, safePage + 1), query)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              safePage >= totalPages
                ? "pointer-events-none bg-slate-200 text-slate-400"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
