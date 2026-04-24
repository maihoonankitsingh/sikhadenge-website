import {
  BadgeCheck,
  Download,
  FileCheck2,
  Filter,
  QrCode,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const certificateStats = [
  { title: "Eligible Students", value: "64", note: "Ready for certificate", icon: Users },
  { title: "Issued Certificates", value: "38", note: "Already generated", icon: BadgeCheck },
  { title: "Pending Review", value: "17", note: "Need approval", icon: FileCheck2 },
  { title: "Verified IDs", value: "38", note: "QR / ID active", icon: ShieldCheck },
];

const certificateRows = [
  {
    name: "Rahul Kumar",
    batch: "AI-GEN-B1",
    course: "AI Expert",
    certId: "SD-CERT-2026-001",
    status: "Issued",
    verify: "Active",
  },
  {
    name: "Anjali Singh",
    batch: "GD-B2",
    course: "Graphic Design",
    certId: "SD-CERT-2026-002",
    status: "Issued",
    verify: "Active",
  },
  {
    name: "Vivek Patel",
    batch: "VE-B1",
    course: "Video Editing",
    certId: "Pending",
    status: "Review",
    verify: "Not Ready",
  },
  {
    name: "Neha Verma",
    batch: "AI-GEN-B2",
    course: "AI Expert",
    certId: "SD-CERT-2026-003",
    status: "Issued",
    verify: "Active",
  },
  {
    name: "Aman Yadav",
    batch: "GD-B1",
    course: "Graphic Design",
    certId: "Pending",
    status: "Pending",
    verify: "Not Ready",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Issued":
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Review":
    case "Pending":
      return "bg-amber-50 text-amber-700";
    case "Not Ready":
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

export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Certificate Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Certificate Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Certificate approval, issue status, unique certificate ID tracking, and future QR verification support.
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
          {certificateStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Certificate</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, batch, cert ID"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Issued</option>
                <option>Review</option>
                <option>Pending</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Verification</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All</option>
                <option>Active</option>
                <option>Not Ready</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Certificate Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future certificate DB, unique IDs, QR, and verification flow.
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
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Certificate ID</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Verify</th>
                </tr>
              </thead>
              <tbody>
                {certificateRows.map((row) => (
                  <tr key={`${row.name}-${row.batch}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.batch}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.course}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.certId}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.verify)}`}>
                        {row.verify}
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
              <FileCheck2 className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Approval Queue</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Kaun student certificate ke liye ready hai aur kiska review pending hai, yahan dikhega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <QrCode className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">QR Verification</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Future me QR-based certificate verify system isi module se connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Unique ID Tracking</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Har issued certificate ko unique ID aur verification status ke sath map kiya jayega.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
