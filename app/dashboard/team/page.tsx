import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const TEAM_NAMES = [
  "Support Team",
  "Tutor Team",
  "Marketing Team",
  "Sales Team",
  "Accounts Team",
  "Content Creation Team",
  "Admin / Management",
  "Operations",
  "Tech / Development",
  "Creative / Design",
] as const;

export default async function TeamHubPage() {
  const [employees, attendanceToday] = await Promise.all([
    prisma.sdEmployee.findMany({
      select: {
        id: true,
        department: true,
        status: true,
      },
      take: 2000,
    }),
    prisma.sdEmployeeAttendance.findMany({
      where: {
        date: new Date(new Date().toISOString().slice(0, 10) + "T00:00:00"),
      },
      select: {
        id: true,
        status: true,
      },
      take: 2000,
    }),
  ]);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((x: any) => x.status === "ACTIVE").length;
  const onLeaveEmployees = employees.filter((x: any) => x.status === "ON_LEAVE").length;
  const inactiveEmployees = employees.filter((x: any) => x.status === "INACTIVE").length;
  const resignedEmployees = employees.filter((x: any) => x.status === "RESIGNED").length;

  const todayMarked = attendanceToday.length;
  const todayPresent = attendanceToday.filter((x: any) => x.status === "PRESENT").length;
  const todayAbsent = attendanceToday.filter((x: any) => x.status === "ABSENT").length;
  const todayLeave = attendanceToday.filter((x: any) => x.status === "LEAVE").length;
  const todayHalfDay = attendanceToday.filter((x: any) => x.status === "HALF_DAY").length;

  const teams = TEAM_NAMES.map((team) => {
    const rows = employees.filter((x: any) => x.department === team);
    const active = rows.filter((x: any) => x.status === "ACTIVE").length;
    return {
      name: team,
      total: rows.length,
      active,
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Management Hub</h1>
            <p className="text-sm text-slate-600">
              Central control page for employee records, attendance, and department-wise management.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/dashboard/employees"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Open Employees
            </a>
            <a
              href="/dashboard/employees/attendance"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Open Attendance
            </a>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Employees</div>
            <div className="mt-2 text-2xl font-bold">{totalEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Active</div>
            <div className="mt-2 text-2xl font-bold">{activeEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">On Leave</div>
            <div className="mt-2 text-2xl font-bold">{onLeaveEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Inactive</div>
            <div className="mt-2 text-2xl font-bold">{inactiveEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Resigned</div>
            <div className="mt-2 text-2xl font-bold">{resignedEmployees}</div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Today Marked</div>
            <div className="mt-2 text-2xl font-bold">{todayMarked}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Present</div>
            <div className="mt-2 text-2xl font-bold">{todayPresent}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Absent</div>
            <div className="mt-2 text-2xl font-bold">{todayAbsent}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Leave</div>
            <div className="mt-2 text-2xl font-bold">{todayLeave}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Half Day</div>
            <div className="mt-2 text-2xl font-bold">{todayHalfDay}</div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <a
            href="/dashboard/employees"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-lg font-semibold">Employee Records</div>
            <p className="mt-2 text-sm text-slate-600">
              Add employees, manage team structure, update role, salary, status, and internal notes.
            </p>
          </a>

          <a
            href="/dashboard/employees/attendance"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-lg font-semibold">Attendance Control</div>
            <p className="mt-2 text-sm text-slate-600">
              Mark present, absent, leave, half-day, holiday, and week-off with daily tracking.
            </p>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-lg font-semibold">Next Expansion</div>
            <p className="mt-2 text-sm text-slate-600">
              Payroll, performance, leave approvals, task tracking, and monthly reporting can be added next.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Department Overview</h2>
            <p className="mt-1 text-sm text-slate-600">
              Team-wise total and active employee count.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {teams.map((team) => (
              <div key={team.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-base font-semibold text-slate-900">{team.name}</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Total</span>
                  <span className="font-medium text-slate-900">{team.total}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Active</span>
                  <span className="font-medium text-slate-900">{team.active}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
