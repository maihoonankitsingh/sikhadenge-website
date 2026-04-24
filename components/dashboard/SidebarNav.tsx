"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/students", label: "Students" },
  { href: "/dashboard/attendance", label: "Attendance" },
  { href: "/dashboard/payments", label: "Payments" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(2,6,23,0.08)]">
      <div className="px-2 py-3">
        <div className="text-sm text-slate-500">Sikhadenge Admin</div>
        <div className="mt-1 text-lg font-semibold text-slate-900">Dashboard</div>
      </div>

      <div className="mt-3 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-2xl px-3 py-2 text-sm transition",
                active
                  ? "border border-slate-200 bg-slate-50 text-slate-900"
                  : "border border-transparent text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="text-xs text-slate-500">Quick filters</div>
        <div className="mt-2 text-sm text-slate-800">Today • All batches</div>
      </div>
    </div>
  );
}
