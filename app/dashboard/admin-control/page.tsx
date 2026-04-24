import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function num(value: any) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default async function AdminControlPage() {
  const today = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00");

  const [employees, attendanceToday, students] = await Promise.all([
    prisma.sdEmployee.findMany({
      select: {
        id: true,
        status: true,
        department: true,
      },
      take: 3000,
    }),
    prisma.sdEmployeeAttendance.findMany({
      where: { date: today },
      select: {
        id: true,
        status: true,
      },
      take: 3000,
    }),
    prisma.sdStudent.findMany({
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        pendingFee: true,
        nextDueDate: true,
      },
      take: 5000,
    }),
  ]);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((x: any) => x.status === "ACTIVE").length;
  const onLeaveEmployees = employees.filter((x: any) => x.status === "ON_LEAVE").length;

  const attendanceMarked = attendanceToday.length;
  const presentToday = attendanceToday.filter((x: any) => x.status === "PRESENT").length;
  const absentToday = attendanceToday.filter((x: any) => x.status === "ABSENT").length;

  const totalStudents = students.length;
  const activeStudents = students.filter((x: any) => x.status === "ACTIVE").length;
  const admittedStudents = students.filter((x: any) => x.status === "ADMITTED").length;
  const overdueStudents = students.filter((x: any) => x.paymentStatus === "OVERDUE").length;

  const pendingAmount = students.reduce((sum: number, x: any) => sum + num(x.pendingFee), 0);
  const dueTodayCount = students.filter((x: any) => x.nextDueDate && new Date(x.nextDueDate).getTime() === today.getTime()).length;
  const dueTodayAmount = students
    .filter((x: any) => x.nextDueDate && new Date(x.nextDueDate).getTime() === today.getTime())
    .reduce((sum: number, x: any) => sum + num(x.pendingFee), 0);

  const salesTeam = employees.filter((x: any) => x.department === "Sales Team").length;
  const tutorTeam = employees.filter((x: any) => x.department === "Tutor Team").length;
  const supportTeam = employees.filter((x: any) => x.department === "Support Team").length;
  const marketingTeam = employees.filter((x: any) => x.department === "Marketing Team").length;
  const accountsTeam = employees.filter((x: any) => x.department === "Accounts Team").length;
  const contentTeam = employees.filter((x: any) => x.department === "Content Creation Team").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Control Panel</h1>
            <p className="text-sm text-slate-600">
              Internal control hub for teams, attendance, student records, and collection tracking.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Internal only · Public website untouched
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Employees</div>
            <div className="mt-2 text-2xl font-bold">{totalEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Active Employees</div>
            <div className="mt-2 text-2xl font-bold">{activeEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Attendance Marked</div>
            <div className="mt-2 text-2xl font-bold">{attendanceMarked}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Students</div>
            <div className="mt-2 text-2xl font-bold">{totalStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Overdue Students</div>
            <div className="mt-2 text-2xl font-bold">{overdueStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Pending Amount</div>
            <div className="mt-2 text-2xl font-bold">{formatMoney(pendingAmount)}</div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <a href="/dashboard/team" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-lg font-semibold">Team Hub</div>
            <p className="mt-2 text-sm text-slate-600">Department overview and team structure.</p>
          </a>

          <a href="/dashboard/employees" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-lg font-semibold">Employees</div>
            <p className="mt-2 text-sm text-slate-600">Employee records, role, status, and notes.</p>
          </a>

          <a href="/dashboard/employees/attendance" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-lg font-semibold">Attendance</div>
            <p className="mt-2 text-sm text-slate-600">Daily attendance marking and team-wise tracking.</p>
          </a>

          <a href="/dashboard/students" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-lg font-semibold">Students</div>
            <p className="mt-2 text-sm text-slate-600">Manual student records, batch, course, and fee status.</p>
          </a>

          <a href="/dashboard/students/collections" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="text-lg font-semibold">Collections</div>
            <p className="mt-2 text-sm text-slate-600">Due today, overdue fees, and collection follow-up tracker.</p>
          </a>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-medium text-slate-700">Today Snapshot</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Present</span><span className="font-medium">{presentToday}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Absent</span><span className="font-medium">{absentToday}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">On Leave</span><span className="font-medium">{onLeaveEmployees}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-medium text-slate-700">Student Snapshot</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Active</span><span className="font-medium">{activeStudents}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Admitted</span><span className="font-medium">{admittedStudents}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Due Today</span><span className="font-medium">{dueTodayCount}</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-medium text-slate-700">Due Today Amount</div>
            <div className="mt-3 text-2xl font-bold">{formatMoney(dueTodayAmount)}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-medium text-slate-700">Need Focus</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Overdue Students</span><span className="font-medium">{overdueStudents}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Attendance Pending</span><span className="font-medium">{Math.max(totalEmployees - attendanceMarked, 0)}</span></div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Department Overview</h2>
            <p className="mt-1 text-sm text-slate-600">Quick count by major teams.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">Sales Team</div><div className="mt-2 text-2xl font-bold">{salesTeam}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">Tutor Team</div><div className="mt-2 text-2xl font-bold">{tutorTeam}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">Support Team</div><div className="mt-2 text-2xl font-bold">{supportTeam}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">Marketing Team</div><div className="mt-2 text-2xl font-bold">{marketingTeam}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">Accounts Team</div><div className="mt-2 text-2xl font-bold">{accountsTeam}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-sm font-medium text-slate-700">Content Creation</div><div className="mt-2 text-2xl font-bold">{contentTeam}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
