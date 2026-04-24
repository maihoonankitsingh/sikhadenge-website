import {
  CalendarCheck2,
  Clock3,
  Download,
  Filter,
  Search,
  ShieldAlert,
  Users,
  UserX2,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const attendanceStats = [
  { title: "Today Attendance", value: "86%", note: "Overall present rate", icon: CalendarCheck2 },
  { title: "Present Students", value: "248", note: "Marked present today", icon: Users },
  { title: "Absent Students", value: "38", note: "Need follow-up", icon: UserX2 },
  { title: "Low Attendance", value: "21", note: "Below safe threshold", icon: ShieldAlert },
];

const attendanceRows = [
  {
    name: "Rahul Kumar",
    batch: "AI-GEN-B1",
    present: "22/26",
    percentage: "85%",
    today: "Present",
    status: "Safe",
  },
  {
    name: "Anjali Singh",
    batch: "GD-B2",
    present: "24/26",
    percentage: "92%",
    today: "Present",
    status: "Good",
  },
  {
    name: "Vivek Patel",
    batch: "VE-B1",
    present: "14/26",
    percentage: "54%",
    today: "Absent",
    status: "Low",
  },
  {
    name: "Neha Verma",
    batch: "AI-GEN-B2",
    present: "25/26",
    percentage: "96%",
    today: "Present",
    status: "Good",
  },
  {
    name: "Aman Yadav",
    batch: "GD-B1",
    present: "17/26",
    percentage: "65%",
    today: "Absent",
    status: "Warning",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Present":
    case "Good":
    case "Safe":
      return "bg-emerald-50 text-emerald-700";
    case "Warning":
      return "bg-amber-50 text-amber-700";
    case "Absent":
    case "Low":
      return "bg-rose-50 text-rose-700";
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

export default function AttendancePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Attendance Module
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Attendance Monitoring Dashboard
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
              Batch-wise attendance, low-attendance alerts, daily class review, and future export support.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
              <Filter className="h-4 w-4" />
              Filter Attendance
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              Export Excel
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {attendanceStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Student</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, batch"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Batch</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Batches</option>
                <option>AI-GEN-B1</option>
                <option>AI-GEN-B2</option>
                <option>GD-B1</option>
                <option>GD-B2</option>
                <option>VE-B1</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Today Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All</option>
                <option>Present</option>
                <option>Absent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Risk Level</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All</option>
                <option>Good</option>
                <option>Safe</option>
                <option>Warning</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Attendance Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future attendance DB, tutor input, and export integration.
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
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Batch</th>
                  <th className="px-5 py-4 font-semibold">Attendance</th>
                  <th className="px-5 py-4 font-semibold">Percentage</th>
                  <th className="px-5 py-4 font-semibold">Today</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRows.map((row) => (
                  <tr key={`${row.name}-${row.batch}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.present}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.percentage}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.today)}`}>
                        {row.today}
                      </span>
                    </td>
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

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Daily Review</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Daily class attendance review aur batch-wise presence summary yahan track hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserX2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Absent Follow-up</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Consistent absentees aur missed class follow-up future me yahan connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Low Attendance Alerts</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Threshold-based alerts for weak attendance and dropout-risk students.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Excel Export</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Filtered attendance reports ko Excel/CSV me download kiya jayega.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
