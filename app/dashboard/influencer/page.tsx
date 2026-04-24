import {
  BadgeIndianRupee,
  Download,
  Filter,
  Megaphone,
  Search,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const influencerStats = [
  { title: "Active Influencers", value: "8", note: "Currently running", icon: Megaphone },
  { title: "Total Leads", value: "214", note: "Influencer sourced", icon: Users },
  { title: "Admissions", value: "19", note: "Converted students", icon: TrendingUp },
  { title: "Revenue", value: "₹63K", note: "This week total", icon: BadgeIndianRupee },
];

const influencerRows = [
  {
    name: "Aman Creator",
    platform: "Instagram",
    leads: "48",
    admissions: "5",
    payout: "₹8,000",
    status: "Active",
  },
  {
    name: "Riya Design",
    platform: "YouTube",
    leads: "32",
    admissions: "3",
    payout: "₹5,000",
    status: "Active",
  },
  {
    name: "Sarthak Edits",
    platform: "Instagram",
    leads: "27",
    admissions: "2",
    payout: "₹3,500",
    status: "Pending",
  },
  {
    name: "Neha Learning",
    platform: "Telegram",
    leads: "41",
    admissions: "4",
    payout: "₹6,500",
    status: "Active",
  },
  {
    name: "Vikas Skills",
    platform: "YouTube",
    leads: "18",
    admissions: "1",
    payout: "₹1,500",
    status: "Review",
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

export default function InfluencerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Influencer Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Influencer Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Influencer performance, lead contribution, admission count, payout tracking, and future export support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Data
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {influencerStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Influencer</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, platform"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Platform</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Platforms</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>Telegram</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Review</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Influencer Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future influencer DB, payouts, and reporting.
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
                  <th className="px-5 py-4 font-semibold">Platform</th>
                  <th className="px-5 py-4 font-semibold">Leads</th>
                  <th className="px-5 py-4 font-semibold">Admissions</th>
                  <th className="px-5 py-4 font-semibold">Payout</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {influencerRows.map((row) => (
                  <tr key={`${row.name}-${row.platform}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.platform}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.leads}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.admissions}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.payout}</td>
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
              <Megaphone className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Campaign Performance</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaun influencer kitna lead aur conversion de raha hai, yahan structured dikhega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Payout Tracking</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Approved payout, pending payout, and commission logic future me connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Growth Visibility</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Influencer source se sales growth aur performance compare karna easy hoga.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
