import {
  BookOpen,
  CalendarCheck2,
  Download,
  Filter,
  GraduationCap,
  Search,
  Star,
  Users,
  Video,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const tutorStats = [
  { title: "Active Tutors", value: "4", note: "Currently assigned", icon: GraduationCap },
  { title: "Assigned Batches", value: "11", note: "Across all tutors", icon: Users },
  { title: "Today Classes", value: "7", note: "Planned sessions", icon: Video },
  { title: "Avg. Performance", value: "4.6/5", note: "Current internal rating", icon: Star },
];

const tutorRows = [
  {
    name: "Gaurav",
    course: "AI Expert",
    batches: "AI-GEN-B1, AI-GEN-B2",
    classes: "2",
    attendance: "88%",
    status: "Active",
    rating: "4.8",
  },
  {
    name: "Neha",
    course: "Video Editing",
    batches: "VE-B1, VE-B2",
    classes: "2",
    attendance: "84%",
    status: "Active",
    rating: "4.5",
  },
  {
    name: "Rohit",
    course: "Graphic Design",
    batches: "GD-B1",
    classes: "1",
    attendance: "79%",
    status: "Review",
    rating: "4.1",
  },
  {
    name: "Sweta",
    course: "Student Support / Hybrid",
    batches: "AI-GEN-B3, GD-B2",
    classes: "1",
    attendance: "91%",
    status: "Active",
    rating: "4.7",
  },
  {
    name: "Aman Sir",
    course: "Graphic Design",
    batches: "GD-B3, GD-B4",
    classes: "1",
    attendance: "86%",
    status: "Active",
    rating: "4.4",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Review":
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

export default function TutorsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Tutors Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Tutors Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Tutor allocation, assigned batches, class load, attendance visibility, and future performance tracking in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Tutors
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tutorStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Tutor</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by tutor, course, batch"
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
              <h2 className="text-xl font-bold text-slate-900">Tutors Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future tutor DB, batch mapping, class logs, and performance review.
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
                  <th className="px-5 py-4 font-semibold">Tutor</th>
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Assigned Batches</th>
                  <th className="px-5 py-4 font-semibold">Today Classes</th>
                  <th className="px-5 py-4 font-semibold">Attendance</th>
                  <th className="px-5 py-4 font-semibold">Rating</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {tutorRows.map((row) => (
                  <tr key={`${row.name}-${row.course}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.course}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.batches}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.classes}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.attendance}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.rating}</td>
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
              <BookOpen className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Batch Allocation</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaun tutor kaunse batch ko handle kar raha hai aur uska academic load kya hai, yahan visible rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarCheck2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Attendance Link</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tutor-wise class attendance aur batch presence future me isi module ke sath connected rahegi.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Performance View</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tutor quality, class consistency, aur future internal review system ke liye ye module base rahega.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
