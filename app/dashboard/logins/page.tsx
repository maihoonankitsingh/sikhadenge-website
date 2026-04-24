import {
  Download,
  Filter,
  KeyRound,
  Search,
  ShieldCheck,
  Smartphone,
  UserCog,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const loginStats = [
  { title: "Total Login Accounts", value: "24", note: "All issued access", icon: Users },
  { title: "Employee Logins", value: "9", note: "Team access issued", icon: UserCog },
  { title: "Student Logins", value: "15", note: "Portal-ready accounts", icon: ShieldCheck },
  { title: "OTP Ready", value: "Future", note: "Phone auth planned", icon: Smartphone },
];

const loginRows = [
  {
    name: "Sweta",
    type: "Employee",
    role: "Assistant Sales Manager",
    loginId: "sweta@sikhadenge",
    passwordStatus: "Issued",
    access: "Active",
  },
  {
    name: "Rohit",
    type: "Employee",
    role: "Sales Executive",
    loginId: "rohit@sikhadenge",
    passwordStatus: "Issued",
    access: "Active",
  },
  {
    name: "Gaurav",
    type: "Employee",
    role: "Tutor",
    loginId: "gaurav@sikhadenge",
    passwordStatus: "Issued",
    access: "Review",
  },
  {
    name: "Rahul Kumar",
    type: "Student",
    role: "AI Expert",
    loginId: "rahul.kumar",
    passwordStatus: "Pending",
    access: "Not Live",
  },
  {
    name: "Anjali Singh",
    type: "Student",
    role: "Graphic Design",
    loginId: "anjali.singh",
    passwordStatus: "Issued",
    access: "Active",
  },
];

function getBadgeClass(value: string) {
  switch (value) {
    case "Issued":
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Pending":
    case "Review":
      return "bg-amber-50 text-amber-700";
    case "Not Live":
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

export default function LoginManagementPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Login Management
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Access Control Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Employee and student login issue flow, password status, access visibility, and future OTP-based authentication readiness.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                <Filter className="h-4 w-4" />
                Filter Accounts
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {loginStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Search Account</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, login ID, role"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Account Type</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Types</option>
                <option>Employee</option>
                <option>Student</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Access Status</label>
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Review</option>
                <option>Not Live</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Login Table</h2>
              <p className="mt-1 text-sm text-slate-500">
                Safe table structure for future auth DB, role-based access, and OTP-ready migration.
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
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Role / Course</th>
                  <th className="px-5 py-4 font-semibold">Login ID</th>
                  <th className="px-5 py-4 font-semibold">Password</th>
                  <th className="px-5 py-4 font-semibold">Access</th>
                </tr>
              </thead>
              <tbody>
                {loginRows.map((row) => (
                  <tr key={`${row.name}-${row.loginId}`} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.type}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.role}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.loginId}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.passwordStatus)}`}>
                        {row.passwordStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeClass(row.access)}`}>
                        {row.access}
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
              <KeyRound className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Credential Issue</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Admin-issued login ID and password structure employee aur student dono ke liye yahan visible rahega.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Access Control</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Role-based access, active/inactive control, aur future permission logic isi module se connect hoga.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Phone OTP Ready</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Future me direct phone OTP login migration ke liye current account layer yahan se map hogi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
