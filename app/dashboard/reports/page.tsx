import {
  BarChart3,
  BadgeIndianRupee,
  CalendarCheck2,
  Download,
  Filter,
  FileBarChart,
  GraduationCap,
  Megaphone,
  Search,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const reportStats = [
  { title: "Total Leads", value: "1,284", note: "Current visible records", icon: Users },
  { title: "Admissions", value: "342", note: "All confirmed students", icon: GraduationCap },
  { title: "Revenue", value: "₹8.6L", note: "Current tracked collection", icon: BadgeIndianRupee },
  { title: "Attendance", value: "86%", note: "Average current rate", icon: CalendarCheck2 },
];

const reportRows = [
  {
    module: "Leads",
    today: "128",
    weekly: "742",
    monthly: "1,284",
    owner: "Sales Team",
    status: "Stable",
  },
  {
    module: "Admissions",
    today: "24",
    weekly: "96",
    monthly: "342",
    owner: "Sales + Ops",
    status: "Growing",
  },
  {
    module: "Payments",
    today: "₹1.84L",
    weekly: "₹5.92L",
    monthly: "₹8.6L",
    owner: "Finance",
    status: "Stable",
  },
  {
    module: "Attendance",
    today: "86%",
    weekly: "84%",
    monthly: "82%",
    owner: "Academics",
    status: "Watch",
  },
  {
    module: "Support",
    today: "19 resolved",
    weekly: "74 resolved",
    monthly: "148 resolved",
    owner: "Support Team",
    status: "Stable",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Growing":
      return "bg-emerald-50 text-emerald-700";
    case "Stable":
      return "bg-blue-50 text-blue-700";
    case "Watch":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function StatCard({
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
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
          <p className="mt-2 text-xs text-slate-500">{note}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Reports Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Reports Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                High-level founder view for leads, admissions, payments, attendance, and operational summary in one dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Reports
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reportStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Report</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by module, owner"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Period</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Periods</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Growing</option>
                <option>Stable</option>
                <option>Watch</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Reports Summary Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future analytics aggregation, module reporting, and founder-level summaries.
              </p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Dashboard-only safe update
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4 font-semibold">Module</th>
                  <th className="px-5 py-4 font-semibold">Today</th>
                  <th className="px-5 py-4 font-semibold">Weekly</th>
                  <th className="px-5 py-4 font-semibold">Monthly</th>
                  <th className="px-5 py-4 font-semibold">Owner</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map((row) => (
                  <tr key={row.module} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.module}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.today}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.weekly}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.monthly}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.owner}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Founder Analytics</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Leads, admissions, revenue, aur operational modules ka high-level snapshot yahan ek jagah visible rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Megaphone className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Performance Comparison</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sales, support, finance, aur marketing outputs ko compare karna future me isi module se easy hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileBarChart className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Export Ready Summary</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Founder report, weekly review, aur monthly business summary future me isi page se export hogi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
