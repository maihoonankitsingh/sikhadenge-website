import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEPARTMENTS = [
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

const ATTENDANCE_STATUSES = [
  "PRESENT",
  "ABSENT",
  "HALF_DAY",
  "LEAVE",
  "HOLIDAY",
  "WEEK_OFF",
] as const;

function getSafeDate(input?: string) {
  const raw = (input || "").trim();
  if (!raw) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return raw;
}

async function markAttendance(formData: FormData) {
  "use server";

  const employeeId = String(formData.get("employeeId") || "").trim();
  const status = String(formData.get("status") || "PRESENT").trim();
  const dateRaw = getSafeDate(String(formData.get("date") || ""));
  const remarks = String(formData.get("remarks") || "").trim() || null;
  const checkInTime = String(formData.get("checkInTime") || "").trim() || null;
  const checkOutTime = String(formData.get("checkOutTime") || "").trim() || null;
  const workingHoursRaw = String(formData.get("workingHours") || "").trim();
  const department = String(formData.get("department") || "").trim();

  if (!employeeId) {
    redirect(`/dashboard/employees/attendance?error=employee_required&date=${encodeURIComponent(dateRaw)}&department=${encodeURIComponent(department)}`);
  }

  if (!ATTENDANCE_STATUSES.includes(status as any)) {
    redirect(`/dashboard/employees/attendance?error=invalid_status&date=${encodeURIComponent(dateRaw)}&department=${encodeURIComponent(department)}`);
  }

  const date = new Date(`${dateRaw}T00:00:00`);
  const workingHours = workingHoursRaw ? Number(workingHoursRaw) : null;

  try {
    const existing = await prisma.sdEmployeeAttendance.findFirst({
      where: {
        employeeId,
        date,
      },
      select: { id: true },
    });

    if (existing?.id) {
      await prisma.sdEmployeeAttendance.update({
        where: { id: existing.id },
        data: {
          status: status as any,
          remarks,
          checkInTime,
          checkOutTime,
          workingHours: workingHours as any,
        },
      });
    } else {
      await prisma.sdEmployeeAttendance.create({
        data: {
          employeeId,
          date,
          status: status as any,
          remarks,
          checkInTime,
          checkOutTime,
          workingHours: workingHours as any,
        },
      });
    }

    revalidatePath("/dashboard/employees/attendance");
    redirect(`/dashboard/employees/attendance?ok=1&date=${encodeURIComponent(dateRaw)}&department=${encodeURIComponent(department)}`);
  } catch {
    redirect(`/dashboard/employees/attendance?error=save_failed&date=${encodeURIComponent(dateRaw)}&department=${encodeURIComponent(department)}`);
  }
}

export default async function EmployeeAttendancePage({
  searchParams,
}: {
  searchParams?: {
    date?: string;
    department?: string;
    ok?: string;
    error?: string;
  };
}) {
  const selectedDate = getSafeDate(String(searchParams?.date || ""));
  const selectedDepartment = String(searchParams?.department || "").trim();
  const ok = String(searchParams?.ok || "").trim();
  const error = String(searchParams?.error || "").trim();

  const employeeWhere: any = {};
  if (selectedDepartment) {
    employeeWhere.department = selectedDepartment;
  }

  const dateObj = new Date(`${selectedDate}T00:00:00`);

  const [employees, attendanceRows, allEmployees] = await Promise.all([
    prisma.sdEmployee.findMany({
      where: employeeWhere,
      orderBy: [
        { department: "asc" },
        { fullName: "asc" },
      ],
      take: 500,
    }),
    prisma.sdEmployeeAttendance.findMany({
      where: { date: dateObj },
      include: {
        employee: {
          select: {
            id: true,
            fullName: true,
            employeeCode: true,
            department: true,
            designation: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1000,
    }),
    prisma.sdEmployee.findMany({
      select: {
        id: true,
        department: true,
        status: true,
      },
      take: 1000,
    }),
  ]);

  const byEmployeeId = new Map(attendanceRows.map((row: any) => [row.employeeId, row]));

  const totalEmployees = employees.length;
  const markedCount = attendanceRows.length;
  const presentCount = attendanceRows.filter((x: any) => x.status === "PRESENT").length;
  const absentCount = attendanceRows.filter((x: any) => x.status === "ABSENT").length;
  const leaveCount = attendanceRows.filter((x: any) => x.status === "LEAVE").length;
  const halfDayCount = attendanceRows.filter((x: any) => x.status === "HALF_DAY").length;
  const notMarkedCount = Math.max(totalEmployees - markedCount, 0);

  const salesCount = allEmployees.filter((x: any) => x.department === "Sales Team").length;
  const tutorCount = allEmployees.filter((x: any) => x.department === "Tutor Team").length;
  const supportCount = allEmployees.filter((x: any) => x.department === "Support Team").length;
  const marketingCount = allEmployees.filter((x: any) => x.department === "Marketing Team").length;
  const accountsCount = allEmployees.filter((x: any) => x.department === "Accounts Team").length;
  const contentCount = allEmployees.filter((x: any) => x.department === "Content Creation Team").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employee Attendance</h1>
            <p className="text-sm text-slate-600">
              Hidden admin page for daily attendance marking and team-wise tracking.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Date: {selectedDate}
          </div>
        </div>

        {ok === "1" ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Attendance saved successfully.
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {
              {
                employee_required: "Employee required.",
                invalid_status: "Invalid attendance status.",
                save_failed: "Attendance save failed.",
              }[error] || "Something went wrong."
            }
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Employees</div>
            <div className="mt-2 text-2xl font-bold">{totalEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Marked</div>
            <div className="mt-2 text-2xl font-bold">{markedCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Present</div>
            <div className="mt-2 text-2xl font-bold">{presentCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Absent</div>
            <div className="mt-2 text-2xl font-bold">{absentCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Leave / Half Day</div>
            <div className="mt-2 text-2xl font-bold">{leaveCount + halfDayCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Not Marked</div>
            <div className="mt-2 text-2xl font-bold">{notMarkedCount}</div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
            <div className="font-medium text-slate-700">Sales Team</div>
            <div className="mt-1 text-2xl font-bold">{salesCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
            <div className="font-medium text-slate-700">Tutor Team</div>
            <div className="mt-1 text-2xl font-bold">{tutorCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
            <div className="font-medium text-slate-700">Support Team</div>
            <div className="mt-1 text-2xl font-bold">{supportCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
            <div className="font-medium text-slate-700">Marketing Team</div>
            <div className="mt-1 text-2xl font-bold">{marketingCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
            <div className="font-medium text-slate-700">Accounts Team</div>
            <div className="mt-1 text-2xl font-bold">{accountsCount}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
            <div className="font-medium text-slate-700">Content Creation</div>
            <div className="mt-1 text-2xl font-bold">{contentCount}</div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <form method="get" className="grid gap-3 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Attendance Date</label>
              <input
                type="date"
                name="date"
                defaultValue={selectedDate}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Department</label>
              <select
                name="department"
                defaultValue={selectedDepartment}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex items-end gap-2">
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Apply Filters
              </button>
              <a
                href="/dashboard/employees/attendance"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Reset
              </a>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Mark Attendance</h2>
            <p className="mt-1 text-sm text-slate-600">
              Daily manual attendance with per-employee status, timings, and remarks.
            </p>
          </div>

          <div className="space-y-4">
            {employees.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
                No employees found for selected filter.
              </div>
            ) : (
              employees.map((employee: any) => {
                const row = byEmployeeId.get(employee.id);
                return (
                  <form
                    key={employee.id}
                    action={markAttendance}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <input type="hidden" name="employeeId" value={employee.id} />
                    <input type="hidden" name="date" value={selectedDate} />
                    <input type="hidden" name="department" value={selectedDepartment} />

                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{employee.fullName}</div>
                        <div className="text-xs text-slate-500">
                          {employee.employeeCode} · {employee.department || "-"} · {employee.designation || "-"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {employee.phone}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        Current: {row ? String(row.status || "").replaceAll("_", " ") : "NOT MARKED"}
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-5">
                      <div>
                        <label className="mb-1 block text-xs font-medium">Status</label>
                        <select
                          name="status"
                          defaultValue={row?.status || "PRESENT"}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                        >
                          {ATTENDANCE_STATUSES.map((item) => (
                            <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium">Check In</label>
                        <input
                          name="checkInTime"
                          defaultValue={row?.checkInTime || ""}
                          placeholder="09:00 AM"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium">Check Out</label>
                        <input
                          name="checkOutTime"
                          defaultValue={row?.checkOutTime || ""}
                          placeholder="06:00 PM"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium">Working Hours</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          name="workingHours"
                          defaultValue={row?.workingHours?.toString?.() || ""}
                          placeholder="8.5"
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                          Save
                        </button>
                      </div>

                      <div className="md:col-span-5">
                        <label className="mb-1 block text-xs font-medium">Remarks</label>
                        <textarea
                          name="remarks"
                          defaultValue={row?.remarks || ""}
                          rows={2}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
                        />
                      </div>
                    </div>
                  </form>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
