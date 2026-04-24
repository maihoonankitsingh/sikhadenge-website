import {
  CalendarClock,
  Download,
  Filter,
  Layers3,
  MonitorPlay,
  Search,
  UserSquare2,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const batchStats = [
  { title: "Active Batches", value: "6", note: "Currently running", icon: Layers3 },
  { title: "Total Students", value: "342", note: "Mapped across batches", icon: Users },
  { title: "Active Tutors", value: "4", note: "Currently assigned", icon: UserSquare2 },
  { title: "Live Classes Today", value: "5", note: "Scheduled today", icon: MonitorPlay },
];

const batchRows = [
  {
    batch: "AI-GEN-B1",
    course: "AI Expert",
    tutor: "Gaurav",
    students: "62",
    timing: "07:00 PM - 09:00 PM",
    mode: "Live",
    status: "Active",
  },
  {
    batch: "AI-GEN-B2",
    course: "AI Expert",
    tutor: "Sweta",
    students: "54",
    timing: "08:00 PM - 10:00 PM",
    mode: "Live",
    status: "Active",
  },
  {
    batch: "GD-B1",
    course: "Graphic Design",
    tutor: "Rohit",
    students: "48",
    timing: "05:00 PM - 07:00 PM",
    mode: "Live",
    status: "Active",
  },
  {
    batch: "GD-B2",
    course: "Graphic Design",
    tutor: "Gaurav",
    students: "43",
    timing: "10:00 AM - 12:00 PM",
    mode: "Recorded + Live",
    status: "Review",
  },
  {
    batch: "VE-B1",
    course: "Video Editing",
    tutor: "Neha",
    students: "39",
    timing: "06:00 PM - 08:00 PM",
    mode: "Live",
    status: "Active",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Active":
    case "Live":
      return "bg-emerald-50 text-emerald-700";
    case "Review":
    case "Recorded + Live":
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

export default function BatchesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Batch Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Batch Management Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Batch structure, tutor assignment, student count, class timing, and live class visibility in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Batches
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {batchStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Batch</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by batch, tutor, course"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Course</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Courses</option>
                <option>AI Expert</option>
                <option>Graphic Design</option>
                <option>Video Editing</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Review</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Batch Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future batch DB, tutor assignment, and live class scheduling.
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
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Tutor</th>
                  <th className="px-5 py-4 font-semibold">Students</th>
                  <th className="px-5 py-4 font-semibold">Timing</th>
                  <th className="px-5 py-4 font-semibold">Mode</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {batchRows.map((row) => (
                  <tr key={`${row.batch}-${row.tutor}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.course}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.tutor}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.students}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.timing}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.mode)}`}>
                        {row.mode}
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
              <CalendarClock className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Schedule Visibility</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Batch timings, daily class slots, aur tutor availability future me isi module se monitor hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserSquare2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Tutor Mapping</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Har batch ke sath assigned tutor, role clarity, aur workload balance yahan structured rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MonitorPlay className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Live Class Control</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Live class status, class mode, aur future Zoom / lesson-link visibility isi dashboard se connect hogi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
