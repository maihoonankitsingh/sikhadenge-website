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

const STATUSES = ["ACTIVE", "ON_LEAVE", "INACTIVE", "RESIGNED", "HOLD"] as const;
const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "FREELANCE", "INTERN", "CONTRACT"] as const;
const WORK_MODES = ["WFO", "WFH", "HYBRID"] as const;

function onlyDigits(value: string) {
  return (value || "").replace(/\D/g, "");
}

async function createEmployee(formData: FormData) {
  "use server";

  const fullName = String(formData.get("fullName") || "").trim();
  const phone = onlyDigits(String(formData.get("phone") || "")).slice(-10);
  const whatsappPhoneRaw = onlyDigits(String(formData.get("whatsappPhone") || "")).slice(-10);
  const emailRaw = String(formData.get("email") || "").trim().toLowerCase();
  const department = String(formData.get("department") || "").trim() || null;
  const designation = String(formData.get("designation") || "").trim() || null;
  const roleTitle = String(formData.get("roleTitle") || "").trim() || null;
  const reportingManager = String(formData.get("reportingManager") || "").trim() || null;
  const joiningDateRaw = String(formData.get("joiningDate") || "").trim();
  const employmentType = String(formData.get("employmentType") || "FULL_TIME").trim();
  const workMode = String(formData.get("workMode") || "WFO").trim();
  const shiftStart = String(formData.get("shiftStart") || "").trim() || null;
  const shiftEnd = String(formData.get("shiftEnd") || "").trim() || null;
  const salaryRaw = String(formData.get("salary") || "").trim();
  const status = String(formData.get("status") || "ACTIVE").trim();
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!fullName || fullName.length < 2) {
    redirect("/dashboard/employees?error=invalid_name");
  }

  if (phone.length !== 10) {
    redirect("/dashboard/employees?error=invalid_phone");
  }

  const joiningDate = joiningDateRaw ? new Date(`${joiningDateRaw}T00:00:00`) : null;
  const salary = salaryRaw ? Number(salaryRaw) : null;
  const employeeCode = `EMP${Date.now().toString().slice(-8)}`;

  try {
    await prisma.sdEmployee.create({
      data: {
        employeeCode,
        fullName,
        phone,
        whatsappPhone: whatsappPhoneRaw || null,
        email: emailRaw || null,
        department,
        designation,
        roleTitle,
        reportingManager,
        joiningDate,
        employmentType: employmentType as any,
        workMode: workMode as any,
        shiftStart,
        shiftEnd,
        salary: salary as any,
        status: status as any,
        notes,
      },
    });

    revalidatePath("/dashboard/employees");
    redirect("/dashboard/employees?ok=1");
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.includes("phone")) {
      redirect("/dashboard/employees?error=phone_exists");
    }
    if (message.includes("email")) {
      redirect("/dashboard/employees?error=email_exists");
    }
    if (message.includes("employeeCode")) {
      redirect("/dashboard/employees?error=employee_code_exists");
    }
    redirect("/dashboard/employees?error=create_failed");
  }
}

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    department?: string;
    status?: string;
    ok?: string;
    error?: string;
  };
}) {
  const q = String(searchParams?.q || "").trim();
  const department = String(searchParams?.department || "").trim();
  const status = String(searchParams?.status || "").trim();
  const ok = String(searchParams?.ok || "").trim();
  const error = String(searchParams?.error || "").trim();

  const where: any = {};

  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { phone: { contains: q } },
      { employeeCode: { contains: q, mode: "insensitive" } },
      { designation: { contains: q, mode: "insensitive" } },
      { roleTitle: { contains: q, mode: "insensitive" } },
    ];
  }

  if (department) {
    where.department = department;
  }

  if (status) {
    where.status = status;
  }

  const [employees, counts] = await Promise.all([
    prisma.sdEmployee.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.sdEmployee.findMany({
      select: { id: true, status: true, department: true },
      take: 1000,
    }),
  ]);

  const totalEmployees = counts.length;
  const activeEmployees = counts.filter((e: any) => e.status === "ACTIVE").length;
  const onLeaveEmployees = counts.filter((e: any) => e.status === "ON_LEAVE").length;
  const salesEmployees = counts.filter((e: any) => e.department === "Sales Team").length;
  const tutorEmployees = counts.filter((e: any) => e.department === "Tutor Team").length;
  const supportEmployees = counts.filter((e: any) => e.department === "Support Team").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
            <p className="text-sm text-slate-600">
              Manual employee records, team classification, and admin-safe staff management.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Hidden admin page — live ads and landing pages untouched.
          </div>
        </div>

        {ok === "1" ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Employee added successfully.
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {
              {
                invalid_name: "Valid full name required.",
                invalid_phone: "Valid 10-digit phone required.",
                phone_exists: "Phone already exists.",
                email_exists: "Email already exists.",
                employee_code_exists: "Employee code conflict. Try again.",
                create_failed: "Employee create failed. Check values and retry.",
              }[error] || "Something went wrong."
            }
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Total</div>
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
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Sales</div>
            <div className="mt-2 text-2xl font-bold">{salesEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Tutor</div>
            <div className="mt-2 text-2xl font-bold">{tutorEmployees}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Support</div>
            <div className="mt-2 text-2xl font-bold">{supportEmployees}</div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Add Employee</h2>
            <p className="mt-1 text-sm text-slate-600">
              Start with core manual data entry. Attendance and advanced actions next step.
            </p>

            <form action={createEmployee} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Full Name</label>
                  <input name="fullName" required className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Phone</label>
                  <input name="phone" required maxLength={10} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">WhatsApp</label>
                  <input name="whatsappPhone" maxLength={10} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input name="email" type="email" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Department</label>
                  <select name="department" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Designation</label>
                  <input name="designation" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Role Title</label>
                  <input name="roleTitle" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Reporting Manager</label>
                  <input name="reportingManager" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Joining Date</label>
                  <input name="joiningDate" type="date" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Salary</label>
                  <input name="salary" type="number" step="0.01" min="0" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Employment Type</label>
                  <select name="employmentType" defaultValue="FULL_TIME" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    {EMPLOYMENT_TYPES.map((item) => (
                      <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Work Mode</label>
                  <select name="workMode" defaultValue="WFO" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    {WORK_MODES.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Shift Start</label>
                  <input name="shiftStart" placeholder="09:00 AM" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Shift End</label>
                  <input name="shiftEnd" placeholder="06:00 PM" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select name="status" defaultValue="ACTIVE" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    {STATUSES.map((item) => (
                      <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Notes</label>
                  <textarea name="notes" rows={4} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Save Employee
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Employee Records</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Filter by search, department, and status.
                </p>
              </div>

              <form method="get" className="grid gap-3 sm:grid-cols-3">
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search name / phone / code"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <select
                  name="department"
                  defaultValue={department}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="">All Departments</option>
                  {DEPARTMENTS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <select
                  name="status"
                  defaultValue={status}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="">All Status</option>
                  {STATUSES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
                <div className="sm:col-span-3 flex gap-2">
                  <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                    Apply Filters
                  </button>
                  <a
                    href="/dashboard/employees"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Reset
                  </a>
                </div>
              </form>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Employee</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Department</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Work</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    employees.map((employee: any) => (
                      <tr key={employee.id} className="align-top">
                        <td className="px-4 py-3">
                          <a href={`/dashboard/employees/${employee.id}`} className="font-medium text-slate-900 hover:underline">{employee.fullName}</a>
                          <div className="text-xs text-slate-500">{employee.employeeCode}</div>
                          {employee.email ? (
                            <div className="text-xs text-slate-500">{employee.email}</div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-slate-700">{employee.department || "-"}</td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{employee.designation || "-"}</div>
                          <div className="text-xs text-slate-500">{employee.roleTitle || "-"}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{employee.phone}</div>
                          <div className="text-xs text-slate-500">{employee.whatsappPhone || "-"}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{employee.workMode}</div>
                          <div className="text-xs text-slate-500">{String(employee.employmentType || "").replaceAll("_", " ")}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {String(employee.status || "").replaceAll("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
