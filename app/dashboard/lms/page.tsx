import {
  BookOpen,
  Download,
  Film,
  Filter,
  FolderKanban,
  PlaySquare,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const lmsStats = [
  { title: "Active Batches", value: "6", note: "Currently mapped in LMS", icon: Users },
  { title: "Total Lessons", value: "128", note: "Structured module count", icon: BookOpen },
  { title: "Recordings Ready", value: "74", note: "Server-linked video files", icon: Film },
  { title: "Access Enabled", value: "3", note: "Student view active batches", icon: ShieldCheck },
];

const lmsRows = [
  {
    batch: "AI-GEN-B1",
    course: "AI Expert",
    lessons: "26",
    recordings: "18",
    access: "Active",
    progress: "68%",
  },
  {
    batch: "AI-GEN-B2",
    course: "AI Expert",
    lessons: "24",
    recordings: "16",
    access: "Active",
    progress: "61%",
  },
  {
    batch: "GD-B1",
    course: "Graphic Design",
    lessons: "22",
    recordings: "14",
    access: "Pending",
    progress: "44%",
  },
  {
    batch: "GD-B2",
    course: "Graphic Design",
    lessons: "20",
    recordings: "12",
    access: "Review",
    progress: "38%",
  },
  {
    batch: "VE-B1",
    course: "Video Editing",
    lessons: "18",
    recordings: "14",
    access: "Active",
    progress: "72%",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
    case "Review":
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

export default function LmsOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                LMS Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                LMS Overview Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Course modules, lesson structure, recording availability, student access control, and future server-based content delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter LMS Data
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {lmsStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Batch / Course</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by batch, course"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Access</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Access</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Review</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Course Type</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Courses</option>
                <option>AI Expert</option>
                <option>Graphic Design</option>
                <option>Video Editing</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">LMS Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future lessons DB, recordings server, and student access mapping.
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
                  <th className="px-5 py-4 font-semibold">Lessons</th>
                  <th className="px-5 py-4 font-semibold">Recordings</th>
                  <th className="px-5 py-4 font-semibold">Access</th>
                  <th className="px-5 py-4 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {lmsRows.map((row) => (
                  <tr key={`${row.batch}-${row.course}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.course}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.lessons}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.recordings}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.access)}`}>
                        {row.access}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Lesson Structure</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Module-wise lesson mapping, class order, and course structure future me isi dashboard se control hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <PlaySquare className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Recording Access</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Server-hosted recordings, watch access, lesson unlock logic, and playback layer yahan connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FolderKanban className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Content Management</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Batch content upload, resource files, PDF notes, and future assignment linking isi module se manage hoga.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
