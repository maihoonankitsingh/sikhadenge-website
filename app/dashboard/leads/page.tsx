import {
  Download,
  Filter,
  PhoneCall,
  Search,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

const leadStats = [
  { title: "Total Leads", value: "1,284", note: "All visible records", icon: Users },
  { title: "Fresh Leads", value: "126", note: "Need first contact", icon: UserPlus },
  { title: "Follow-up Due", value: "48", note: "Pending action today", icon: PhoneCall },
  { title: "Qualified", value: "72", note: "High-intent leads", icon: Wallet },
];

const leadRows = [
  {
    name: "Rahul Kumar",
    phone: "+91 98XXXXXX21",
    source: "Meta Ads",
    counselor: "Sweta",
    status: "Fresh",
    course: "AI Expert",
    date: "18 Mar 2026",
  },
  {
    name: "Anjali Singh",
    phone: "+91 97XXXXXX44",
    source: "WhatsApp",
    counselor: "Rohit",
    status: "Follow-up",
    course: "Gen-AI Masterclass",
    date: "18 Mar 2026",
  },
  {
    name: "Vivek Patel",
    phone: "+91 88XXXXXX73",
    source: "Affiliate",
    counselor: "Sweta",
    status: "Interested",
    course: "Graphic Design",
    date: "17 Mar 2026",
  },
  {
    name: "Neha Verma",
    phone: "+91 93XXXXXX90",
    source: "Influencer",
    counselor: "Gaurav",
    status: "Qualified",
    course: "Video Editing",
    date: "17 Mar 2026",
  },
  {
    name: "Aman Yadav",
    phone: "+91 87XXXXXX15",
    source: "Meta Ads",
    counselor: "Rohit",
    status: "No Response",
    course: "AI Expert",
    date: "16 Mar 2026",
  },
];

function getBadgeClass(status: string) {
  switch (status) {
    case "Fresh":
      return "bg-blue-50 text-blue-700";
    case "Follow-up":
      return "bg-amber-50 text-amber-700";
    case "Interested":
      return "bg-violet-50 text-violet-700";
    case "Qualified":
      return "bg-emerald-50 text-emerald-700";
    case "No Response":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-700";
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

export default function DashboardLeadsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Leads Module
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Lead Management Dashboard
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
              Safe dashboard-only structure for leads, follow-ups, filters, counselor view, and future export support.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
              <Filter className="h-4 w-4" />
              Filter Leads
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              Export Excel
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {leadStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Lead</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, source"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Source</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Sources</option>
                <option>Meta Ads</option>
                <option>WhatsApp</option>
                <option>Affiliate</option>
                <option>Influencer</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Fresh</option>
                <option>Follow-up</option>
                <option>Interested</option>
                <option>Qualified</option>
                <option>No Response</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Counselor</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Counselors</option>
                <option>Sweta</option>
                <option>Rohit</option>
                <option>Gaurav</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Lead Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Placeholder table structure for future DB and filter integration.
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
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Source</th>
                  <th className="px-5 py-4 font-semibold">Counselor</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {leadRows.map((lead) => (
                  <tr key={`${lead.name}-${lead.phone}`} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{lead.phone}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{lead.source}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{lead.counselor}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{lead.course}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Future DB Integration</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Yahan real leads, source filters, counselor assignment, and date range filtering connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Export Layer</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Excel and CSV download future me selected filters ke according generate kiya jayega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Lead Workflow</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fresh, contacted, follow-up, interested, qualified, and converted pipeline yahan structured hoga.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
