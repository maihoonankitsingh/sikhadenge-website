import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Download,
  Filter,
  PiggyBank,
  Search,
  Wallet,
  Receipt,
  TrendingDown,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const financeStats = [
  { title: "Today Collection", value: "₹1.84L", note: "Gross received today", icon: BadgeIndianRupee },
  { title: "Today Expense", value: "₹42K", note: "Total expense logged", icon: Receipt },
  { title: "Marketing Spend", value: "₹18K", note: "Ads and promotions", icon: BriefcaseBusiness },
  { title: "Net Balance", value: "₹1.42L", note: "After deductions", icon: PiggyBank },
];

const financeRows = [
  {
    date: "18 Mar 2026",
    category: "Meta Ads",
    amount: "₹12,000",
    mode: "Online",
    owner: "Marketing",
    status: "Paid",
  },
  {
    date: "18 Mar 2026",
    category: "Salary - Counselor",
    amount: "₹17,000",
    mode: "Bank Transfer",
    owner: "HR",
    status: "Processed",
  },
  {
    date: "17 Mar 2026",
    category: "Tutor Payment",
    amount: "₹8,000",
    mode: "UPI",
    owner: "Academics",
    status: "Paid",
  },
  {
    date: "17 Mar 2026",
    category: "Software / Tools",
    amount: "₹3,500",
    mode: "Card",
    owner: "Operations",
    status: "Pending",
  },
  {
    date: "16 Mar 2026",
    category: "Influencer Payout",
    amount: "₹6,500",
    mode: "UPI",
    owner: "Marketing",
    status: "Processed",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Paid":
    case "Processed":
      return "bg-emerald-50 text-emerald-700";
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

export default function FinancePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Finance Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Finance / Expenses Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Collection, expenses, salary, marketing spend, and net balance visibility in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Finance
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financeStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Expense</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by category, owner, mode"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Categories</option>
                <option>Meta Ads</option>
                <option>Salary</option>
                <option>Tutor Payment</option>
                <option>Software / Tools</option>
                <option>Influencer Payout</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Paid</option>
                <option>Processed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Expense Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future finance DB, daily logs, and export-ready reporting.
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
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Mode</th>
                  <th className="px-5 py-4 font-semibold">Owner</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {financeRows.map((row) => (
                  <tr key={`${row.date}-${row.category}-${row.amount}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.date}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.category}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.amount}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.mode}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.owner}</td>
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
              <Wallet className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Expense Visibility</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Daily aur category-wise expenses ko clean format me track karne ke liye ye module useful rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Spend Monitoring</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Marketing, salary, tool cost, aur payout spend ko compare karna yahan easy hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <PiggyBank className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Net Balance View</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Collection minus expense logic aur future monthly finance summary isi module se connect hogi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
