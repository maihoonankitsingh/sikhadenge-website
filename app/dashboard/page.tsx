import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  CalendarCheck2,
  CreditCard,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const kpis = [
  { title: "Today Leads", value: "128", note: "Fresh + follow-up pool", icon: Users },
  { title: "Admissions", value: "24", note: "Today confirmed", icon: GraduationCap },
  { title: "Revenue", value: "₹1.84L", note: "Today collection", icon: BadgeIndianRupee },
  { title: "Attendance", value: "86%", note: "Current daily status", icon: CalendarCheck2 },
];

const modules = [
  {
    title: "Leads",
    desc: "Lead filtering, counselor assignment, follow-up view, and source pipeline.",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    title: "Students",
    desc: "Student data, batch mapping, document collection, laptop status, and certificate readiness.",
    href: "/dashboard/students",
    icon: GraduationCap,
  },
  {
    title: "Payments",
    desc: "Collection tracking, due reports, installment monitoring, and export-ready payment tables.",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Attendance",
    desc: "Daily review, low-attendance alerts, batch-wise visibility, and follow-up structure.",
    href: "/dashboard/attendance",
    icon: CalendarCheck2,
  },
];

const extraCards = [
  {
    title: "Certificate Queue",
    text: "Certificate issue, review, verification, and approval flow future-ready rahega.",
    icon: FileCheck2,
  },
  {
    title: "Influencer / Affiliate Layer",
    text: "Future dashboard expansion ke liye referral and payout tracking structure ready hai.",
    icon: Megaphone,
  },
  {
    title: "Founder Command View",
    text: "High-level business visibility ke liye modules, KPI cards, filters, and exports aligned hain.",
    icon: LayoutDashboard,
  },
];

function KpiCard({
  title,
  value,
  note,
  icon: Icon,
}: {
  title: string;
  value: string;
  note: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</h2>
          <p className="mt-2 text-xs text-slate-500">{note}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Dashboard Overview
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Sikhadenge Internal Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Central dashboard for leads, students, payments, attendance, and future operational modules.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Light UI • Safe dashboard-only rollout • Future data integration ready
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Core Modules</h2>
              <p className="mt-1 text-sm text-slate-500">
                Internal business modules currently prepared inside dashboard.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {modules.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-white p-3 text-blue-700 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {extraCards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
