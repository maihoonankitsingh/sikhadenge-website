"use client";

export default function Topbar() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.08)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="text-xs text-slate-500">Admin</div>
          <div className="truncate text-base font-semibold text-slate-900">Operations Overview</div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="h-10 w-full sm:w-[340px] rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
            placeholder="Search: student / lead / employee"
          />
          <select
            className="h-10 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
            defaultValue="today"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
