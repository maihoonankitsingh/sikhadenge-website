import {
  BadgeIndianRupee,
  CheckCircle2,
  Download,
  Filter,
  GraduationCap,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const admissionStats = [
  { title: "Today Admissions", value: "24", note: "Confirmed today", icon: UserPlus },
  { title: "Pending Onboarding", value: "11", note: "Need setup completion", icon: ShieldCheck },
  { title: "Full Paid", value: "14", note: "Cleared payment", icon: BadgeIndianRupee },
  { title: "Batch Assigned", value: "19", note: "Mapped to classes", icon: GraduationCap },
];

const admissionRows = [
  {
    name: "Rahul Kumar",
    course: "AI Expert",
    counselor: "Sweta",
    payment: "Partial",
    onboarding: "Pending",
    batch: "Not Assigned",
    status: "New",
  },
  {
    name: "Anjali Singh",
    course: "Graphic Design",
    counselor: "Rohit",
    payment: "Paid",
    onboarding: "Completed",
    batch: "GD-B2",
    status: "Processed",
  },
  {
    name: "Vivek Patel",
    course: "Video Editing",
    counselor: "Neha",
    payment: "Pending",
    onboarding: "Pending",
    batch: "Not Assigned",
    status: "New",
  },
  {
    name: "Neha Verma",
    course: "AI Expert",
    counselor: "Sweta",
    payment: "Paid",
    onboarding: "Completed",
    batch: "AI-GEN-B2",
    status: "Processed",
  },
  {
    name: "Aman Yadav",
    course: "Graphic Design",
    counselor: "Vikas",
    payment: "Partial",
    onboarding: "In Progress",
    batch: "GD-B1",
    status: "Processing",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Paid":
    case "Completed":
    case "Processed":
      return "bg-emerald-50 text-emerald-700";
    case "Partial":
    case "In Progress":
    case "Processing":
      return "bg-amber-50 text-amber-700";
    case "Pending":
    case "New":
    case "Not Assigned":
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

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Admissions Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Admissions Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                New admissions, counselor ownership, payment stage, onboarding flow, and batch assignment visibility in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Admissions
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {admissionStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Admission</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, course, counselor"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Payment</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Payment Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Pending</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Onboarding</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Onboarding</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Admissions Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future admission DB, onboarding logs, and batch assignment tracking.
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
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Counselor</th>
                  <th className="px-5 py-4 font-semibold">Payment</th>
                  <th className="px-5 py-4 font-semibold">Onboarding</th>
                  <th className="px-5 py-4 font-semibold">Batch</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {admissionRows.map((row) => (
                  <tr key={`${row.name}-${row.course}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.course}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.counselor}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.payment)}`}>
                        {row.payment}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.onboarding)}`}>
                        {row.onboarding}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.batch)}`}>
                        {row.batch}
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
              <Users className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Admission Flow</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              New admission se onboarding aur batch assignment tak ka flow yahan clearly visible rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BadgeIndianRupee className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Payment Stage</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Paid, partial, aur pending admission payment stages ko admission data ke sath map kiya jayega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Onboarding Status</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Student onboarding, access setup, aur final readiness future me isi module se connected rahegi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
