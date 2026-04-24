import {
  BookCheck,
  CheckCircle2,
  ClipboardList,
  Download,
  Eye,
  Filter,
  Search,
  TimerReset,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const assignmentStats = [
  { title: "Total Assignments", value: "42", note: "Across active batches", icon: ClipboardList },
  { title: "Submitted", value: "286", note: "Student submissions received", icon: CheckCircle2 },
  { title: "Pending Review", value: "64", note: "Tutor review remaining", icon: Eye },
  { title: "Overdue", value: "21", note: "Need follow-up", icon: TimerReset },
];

const assignmentRows = [
  {
    batch: "AI-GEN-B1",
    assignment: "Prompt Writing Exercise",
    students: "62",
    submitted: "51",
    pending: "11",
    reviewer: "Gaurav",
    status: "Review",
  },
  {
    batch: "AI-GEN-B2",
    assignment: "Workflow Breakdown Task",
    students: "54",
    submitted: "48",
    pending: "6",
    reviewer: "Sweta",
    status: "Active",
  },
  {
    batch: "GD-B1",
    assignment: "Poster Design Submission",
    students: "48",
    submitted: "36",
    pending: "12",
    reviewer: "Rohit",
    status: "Pending",
  },
  {
    batch: "GD-B2",
    assignment: "Brand Layout Practice",
    students: "43",
    submitted: "34",
    pending: "9",
    reviewer: "Gaurav",
    status: "Review",
  },
  {
    batch: "VE-B1",
    assignment: "Reel Editing Assignment",
    students: "39",
    submitted: "31",
    pending: "8",
    reviewer: "Neha",
    status: "Active",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Review":
      return "bg-amber-50 text-amber-700";
    case "Pending":
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

export default function AssignmentsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Assignments Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Assignments Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Batch-wise assignments, submission count, pending review, tutor review flow, and future student upload tracking.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Assignments
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {assignmentStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Assignment</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by batch, assignment, tutor"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Review</option>
                <option>Pending</option>
              </select>
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
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Assignments Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future assignment DB, uploads, review remarks, and submission tracking.
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
                  <th className="px-5 py-4 font-semibold">Assignment</th>
                  <th className="px-5 py-4 font-semibold">Students</th>
                  <th className="px-5 py-4 font-semibold">Submitted</th>
                  <th className="px-5 py-4 font-semibold">Pending</th>
                  <th className="px-5 py-4 font-semibold">Reviewer</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {assignmentRows.map((row) => (
                  <tr key={`${row.batch}-${row.assignment}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.assignment}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.students}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.submitted}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.pending}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.reviewer}</td>
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
              <ClipboardList className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Assignment Tracking</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaunse batch me kaunsa task diya gaya hai aur kitni submission aayi hai, yahan structured dikhega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BookCheck className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Tutor Review Flow</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tutor review pending, checked submissions, aur future remarks system isi module me rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <TimerReset className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Pending Follow-up</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Overdue assignment students aur submission reminder flow future me isi dashboard se connect hoga.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
