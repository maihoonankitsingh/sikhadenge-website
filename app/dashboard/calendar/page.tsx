import {
  Bell,
  CalendarDays,
  Clock3,
  Download,
  Filter,
  LayoutList,
  Search,
  Users,
  Video,
  UserSquare2,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const calendarStats = [
  { title: "Today Classes", value: "7", note: "Scheduled sessions", icon: Video },
  { title: "Meetings", value: "4", note: "Internal and review calls", icon: Users },
  { title: "Masterclasses", value: "2", note: "Planned live events", icon: CalendarDays },
  { title: "Reminders", value: "11", note: "Pending schedule alerts", icon: Bell },
];

const scheduleRows = [
  {
    time: "10:00 AM",
    title: "AI Expert Batch Class",
    type: "Class",
    tutor: "Gaurav",
    audience: "AI-GEN-B1",
    status: "Scheduled",
  },
  {
    time: "12:30 PM",
    title: "Sales Review Meeting",
    type: "Meeting",
    tutor: "Sweta",
    audience: "Sales Team",
    status: "Confirmed",
  },
  {
    time: "03:00 PM",
    title: "Graphic Design Batch Class",
    type: "Class",
    tutor: "Aman Sir",
    audience: "GD-B2",
    status: "Scheduled",
  },
  {
    time: "06:00 PM",
    title: "Masterclass Setup Review",
    type: "Meeting",
    tutor: "Admin",
    audience: "Marketing + Ops",
    status: "Pending",
  },
  {
    time: "08:00 PM",
    title: "Live AI Masterclass",
    type: "Masterclass",
    tutor: "Host Team",
    audience: "Public Registrations",
    status: "Confirmed",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Confirmed":
      return "bg-emerald-50 text-emerald-700";
    case "Scheduled":
      return "bg-blue-50 text-blue-700";
    case "Pending":
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

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Calendar Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Calendar / Schedule Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Classes, meetings, masterclass schedule, tutor allocation, and reminder visibility in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Schedule
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {calendarStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Schedule</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, tutor, audience"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Type</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Types</option>
                <option>Class</option>
                <option>Meeting</option>
                <option>Masterclass</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Scheduled</option>
                <option>Confirmed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Daily Schedule Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future calendar DB, class planning, and reminder workflow.
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
                  <th className="px-5 py-4 font-semibold">Time</th>
                  <th className="px-5 py-4 font-semibold">Title</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Tutor / Owner</th>
                  <th className="px-5 py-4 font-semibold">Audience</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((row) => (
                  <tr key={`${row.time}-${row.title}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.time}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.title}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.type}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.tutor}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.audience}</td>
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
              <Clock3 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Time Planning</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Daily class timing, meeting slots, aur live events ko ek structured format me manage kiya jayega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserSquare2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Tutor Allocation</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaun tutor kis class ko handle karega aur kaunsi audience mapped hai, yahan clearly visible rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <LayoutList className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Reminder Flow</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Schedule-based reminders, masterclass alerts, aur future automation isi module ke sath connect hogi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
