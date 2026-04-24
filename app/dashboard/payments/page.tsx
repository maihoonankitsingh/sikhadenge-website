import {
  BadgeIndianRupee,
  CreditCard,
  Download,
  Filter,
  Search,
  Wallet,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const paymentStats = [
  { title: "Today Collection", value: "₹1.84L", note: "Received today", icon: BadgeIndianRupee },
  { title: "Pending Dues", value: "₹3.26L", note: "Outstanding balance", icon: AlertCircle },
  { title: "Full Paid", value: "186", note: "Students cleared", icon: CheckCircle2 },
  { title: "Partial Paid", value: "94", note: "Need follow-up", icon: CreditCard },
];

const paymentRows = [
  {
    name: "Rahul Kumar",
    batch: "AI-GEN-B1",
    total: "₹20,000",
    paid: "₹10,000",
    due: "₹10,000",
    status: "Partial",
    date: "18 Mar 2026",
  },
  {
    name: "Anjali Singh",
    batch: "GD-B2",
    total: "₹15,000",
    paid: "₹15,000",
    due: "₹0",
    status: "Paid",
    date: "18 Mar 2026",
  },
  {
    name: "Vivek Patel",
    batch: "VE-B1",
    total: "₹18,000",
    paid: "₹5,000",
    due: "₹13,000",
    status: "Pending",
    date: "17 Mar 2026",
  },
  {
    name: "Neha Verma",
    batch: "AI-GEN-B2",
    total: "₹20,000",
    paid: "₹20,000",
    due: "₹0",
    status: "Paid",
    date: "17 Mar 2026",
  },
  {
    name: "Aman Yadav",
    batch: "GD-B1",
    total: "₹15,000",
    paid: "₹8,000",
    due: "₹7,000",
    status: "Partial",
    date: "16 Mar 2026",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Paid":
      return "bg-emerald-50 text-emerald-700";
    case "Partial":
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

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Payments Module
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Payment Collection Dashboard
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
              Collections, dues, payment status, batch-wise fee tracking, and future export support.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
              <Filter className="h-4 w-4" />
              Filter Payments
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
              <Download className="h-4 w-4" />
              Export Excel
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {paymentStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Payment</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, batch"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Pending</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Type</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Types</option>
                <option>Admission</option>
                <option>Installment</option>
                <option>Balance Due</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Payment Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future payment DB, filters, and export integration.
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
                  <th className="px-5 py-4 font-semibold">Batch</th>
                  <th className="px-5 py-4 font-semibold">Total Fee</th>
                  <th className="px-5 py-4 font-semibold">Paid</th>
                  <th className="px-5 py-4 font-semibold">Due</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody>
                {paymentRows.map((row) => (
                  <tr key={`${row.name}-${row.batch}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.total}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.paid}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.due}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Collection Tracking</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Daily collection, monthly collection, and counselor-linked recovery tracking.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Installment Follow-up</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Partial and pending payment follow-up flow yahan future me connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Due Alerts</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Overdue students, unpaid balance, and reminder priority list future-ready rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Excel Export</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Filtered collection and due reports ko Excel/CSV me download kiya jayega.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
