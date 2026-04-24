import {
  AlertCircle,
  CheckCircle2,
  Download,
  Filter,
  LifeBuoy,
  Search,
  ShieldAlert,
  Ticket,
  UserRoundCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supportStats = [
  { title: "Open Tickets", value: "34", note: "Currently unresolved", icon: Ticket },
  { title: "High Priority", value: "8", note: "Need urgent action", icon: ShieldAlert },
  { title: "Resolved Today", value: "19", note: "Closed successfully", icon: CheckCircle2 },
  { title: "Assigned Agents", value: "4", note: "Handling ticket flow", icon: UserRoundCheck },
];

const supportRows = [
  {
    ticketId: "SD-TK-101",
    student: "Rahul Kumar",
    issue: "Payment not reflected",
    priority: "High",
    assigned: "Sweta",
    status: "Open",
  },
  {
    ticketId: "SD-TK-102",
    student: "Anjali Singh",
    issue: "Certificate request",
    priority: "Medium",
    assigned: "Rohit",
    status: "In Progress",
  },
  {
    ticketId: "SD-TK-103",
    student: "Vivek Patel",
    issue: "Class link issue",
    priority: "High",
    assigned: "Neha",
    status: "Open",
  },
  {
    ticketId: "SD-TK-104",
    student: "Neha Verma",
    issue: "Assignment upload problem",
    priority: "Low",
    assigned: "Gaurav",
    status: "Resolved",
  },
  {
    ticketId: "SD-TK-105",
    student: "Aman Yadav",
    issue: "Batch access query",
    priority: "Medium",
    assigned: "Sweta",
    status: "In Progress",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Resolved":
    case "Low":
      return "bg-emerald-50 text-emerald-700";
    case "In Progress":
    case "Medium":
      return "bg-amber-50 text-amber-700";
    case "Open":
    case "High":
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

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Support Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Support / Tickets Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Student issues, ticket flow, priority handling, assigned support owner, and future resolution tracking in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Tickets
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {supportStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Ticket</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ticket ID, student, issue"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Priority</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Tickets Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future support DB, issue notes, assigned owner, and closure tracking.
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
                  <th className="px-5 py-4 font-semibold">Ticket ID</th>
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Issue</th>
                  <th className="px-5 py-4 font-semibold">Priority</th>
                  <th className="px-5 py-4 font-semibold">Assigned</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {supportRows.map((row) => (
                  <tr key={row.ticketId} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.ticketId}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.student}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.issue}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.priority)}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.assigned}</td>
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
              <LifeBuoy className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Issue Handling</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaunsa issue kis type ka hai aur kaunse student ko support chahiye, yahan structured dikhega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Priority Visibility</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              High-priority tickets aur urgent resolution items ko clearly isolate karne ke liye ye module useful rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserRoundCheck className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Resolution Tracking</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Assigned owner, in-progress flow, aur final resolution status future me isi dashboard se connect hoga.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
