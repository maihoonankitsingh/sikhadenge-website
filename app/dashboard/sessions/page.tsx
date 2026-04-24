import {
  CalendarClock,
  CheckCircle2,
  Download,
  Filter,
  MonitorPlay,
  Radio,
  Search,
  UserSquare2,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sessionStats = [
  { title: "Today Sessions", value: "5", note: "Scheduled today", icon: CalendarClock },
  { title: "Live Now", value: "2", note: "Currently running", icon: Radio },
  { title: "Attendance Started", value: "4", note: "Marked session-wise", icon: CheckCircle2 },
  { title: "Total Students", value: "246", note: "Today mapped count", icon: Users },
];

const sessionRows = [
  {
    batch: "AI-GEN-B1",
    tutor: "Gaurav",
    timing: "07:00 PM - 09:00 PM",
    type: "Live",
    attendance: "Started",
    status: "Running",
  },
  {
    batch: "AI-GEN-B2",
    tutor: "Sweta",
    timing: "08:00 PM - 10:00 PM",
    type: "Live",
    attendance: "Pending",
    status: "Upcoming",
  },
  {
    batch: "GD-B1",
    tutor: "Rohit",
    timing: "05:00 PM - 07:00 PM",
    type: "Live",
    attendance: "Started",
    status: "Completed",
  },
  {
    batch: "GD-B2",
    tutor: "Gaurav",
    timing: "10:00 AM - 12:00 PM",
    type: "Hybrid",
    attendance: "Started",
    status: "Completed",
  },
  {
    batch: "VE-B1",
    tutor: "Neha",
    timing: "06:00 PM - 08:00 PM",
    type: "Live",
    attendance: "Started",
    status: "Running",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Running":
    case "Started":
    case "Live":
      return "bg-emerald-50 text-emerald-700";
    case "Upcoming":
    case "Pending":
    case "Hybrid":
      return "bg-amber-50 text-amber-700";
    case "Completed":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-blue-50 text-blue-700";
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

export default function SessionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Sessions Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Live Classes / Sessions Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Today classes, tutor mapping, session timing, attendance start status, and future Zoom/session-link management in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Sessions
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sessionStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Session</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by batch, tutor, timing"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Type</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Types</option>
                <option>Live</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Running</option>
                <option>Upcoming</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sessions Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future session DB, Zoom links, class logs, and attendance trigger flow.
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
                  <th className="px-5 py-4 font-semibold">Batch</th>
                  <th className="px-5 py-4 font-semibold">Tutor</th>
                  <th className="px-5 py-4 font-semibold">Timing</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Attendance</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessionRows.map((row) => (
                  <tr key={`${row.batch}-${row.tutor}-${row.timing}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.tutor}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.timing}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.type)}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.attendance)}`}>
                        {row.attendance}
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MonitorPlay className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Live Session Control</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaunsi class live hai, kaunsi upcoming hai, aur kaunsi complete ho chuki hai, yahan clearly dikhega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserSquare2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Tutor Session Mapping</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tutor-wise class schedule, assigned session count, aur daily load isi module me structured rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Attendance Trigger</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Future me class start hote hi attendance marking aur session logs isi dashboard se connect honge.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
