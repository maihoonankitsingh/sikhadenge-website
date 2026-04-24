import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
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

async function updateEmployee(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();
  if (!id) redirect("/dashboard/employees?error=missing_id");

  const fullName = String(formData.get("fullName") || "").trim();
  const phone = onlyDigits(String(formData.get("phone") || "")).slice(-10);
  const whatsappPhone = onlyDigits(String(formData.get("whatsappPhone") || "")).slice(-10) || null;
  const email = String(formData.get("email") || "").trim().toLowerCase() || null;
  const fatherName = String(formData.get("fatherName") || "").trim() || null;
  const gender = String(formData.get("gender") || "").trim() || null;
  const address = String(formData.get("address") || "").trim() || null;

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

  const aadhaarNumber = String(formData.get("aadhaarNumber") || "").trim() || null;
  const panNumber = String(formData.get("panNumber") || "").trim() || null;
  const bankName = String(formData.get("bankName") || "").trim() || null;
  const accountNumber = String(formData.get("accountNumber") || "").trim() || null;
  const ifscCode = String(formData.get("ifscCode") || "").trim() || null;

  const skills = String(formData.get("skills") || "").trim() || null;
  const assignedWork = String(formData.get("assignedWork") || "").trim() || null;
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!fullName || fullName.length < 2) {
    redirect(`/dashboard/employees/${id}?error=invalid_name`);
  }

  if (phone.length !== 10) {
    redirect(`/dashboard/employees/${id}?error=invalid_phone`);
  }

  const joiningDate = joiningDateRaw ? new Date(`${joiningDateRaw}T00:00:00`) : null;
  const salary = salaryRaw ? Number(salaryRaw) : null;

  try {
    await prisma.sdEmployee.update({
      where: { id },
      data: {
        fullName,
        phone,
        whatsappPhone,
        email,
        fatherName,
        gender,
        address,
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
        aadhaarNumber,
        panNumber,
        bankName,
        accountNumber,
        ifscCode,
        skills,
        assignedWork,
        notes,
      },
    });

    revalidatePath(`/dashboard/employees/${id}`);
    revalidatePath("/dashboard/employees");
    redirect(`/dashboard/employees/${id}?ok=updated`);
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.includes("phone")) redirect(`/dashboard/employees/${id}?error=phone_exists`);
    if (message.includes("email")) redirect(`/dashboard/employees/${id}?error=email_exists`);
    redirect(`/dashboard/employees/${id}?error=update_failed`);
  }
}

async function addEmployeeNote(formData: FormData) {
  "use server";

  const employeeId = String(formData.get("employeeId") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const createdBy = String(formData.get("createdBy") || "").trim() || "Admin";

  if (!employeeId || !note) {
    redirect(`/dashboard/employees/${employeeId}?error=note_required`);
  }

  try {
    await prisma.sdEmployeeNote.create({
      data: {
        employeeId,
        note,
        createdBy,
      },
    });

    revalidatePath(`/dashboard/employees/${employeeId}`);
    redirect(`/dashboard/employees/${employeeId}?ok=note_added`);
  } catch {
    redirect(`/dashboard/employees/${employeeId}?error=note_failed`);
  }
}

function formatDateInput(value?: Date | null) {
  if (!value) return "";
  const d = new Date(value);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateDisplay(value?: Date | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function EmployeeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { ok?: string; error?: string };
}) {
  const id = String(params?.id || "").trim();
  if (!id) notFound();

  const employee = await prisma.sdEmployee.findUnique({
    where: { id },
    include: {
      noteHistory: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      attendance: {
        orderBy: { date: "desc" },
        take: 30,
      },
    },
  });

  if (!employee) notFound();

  const ok = String(searchParams?.ok || "").trim();
  const error = String(searchParams?.error || "").trim();

  const present30 = employee.attendance.filter((x: any) => x.status === "PRESENT").length;
  const absent30 = employee.attendance.filter((x: any) => x.status === "ABSENT").length;
  const leave30 = employee.attendance.filter((x: any) => x.status === "LEAVE").length;
  const half30 = employee.attendance.filter((x: any) => x.status === "HALF_DAY").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employee Profile</h1>
            <p className="text-sm text-slate-600">
              Detailed employee management, profile editing, notes history, and attendance snapshot.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/dashboard/employees"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Employees
            </a>
            <a
              href="/dashboard/employees/attendance"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Attendance
            </a>
          </div>
        </div>

        {ok ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {
              {
                updated: "Employee updated successfully.",
                note_added: "Employee note added successfully.",
              }[ok] || "Success."
            }
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
                update_failed: "Employee update failed.",
                note_required: "Note is required.",
                note_failed: "Note save failed.",
              }[error] || "Something went wrong."
            }
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Employee Code</div>
            <div className="mt-2 text-lg font-bold">{employee.employeeCode}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Department</div>
            <div className="mt-2 text-lg font-bold">{employee.department || "-"}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</div>
            <div className="mt-2 text-lg font-bold">{String(employee.status || "").replaceAll("_", " ")}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Present (30)</div>
            <div className="mt-2 text-lg font-bold">{present30}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Absent (30)</div>
            <div className="mt-2 text-lg font-bold">{absent30}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Leave / Half Day</div>
            <div className="mt-2 text-lg font-bold">{leave30 + half30}</div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Edit Employee Details</h2>
              <p className="mt-1 text-sm text-slate-600">
                Update employee profile, team, salary, work mode, bank info, and internal notes.
              </p>
            </div>

            <form action={updateEmployee} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={employee.id} />

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Full Name</label>
                <input
                  name="fullName"
                  defaultValue={employee.fullName || ""}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  defaultValue={employee.phone || ""}
                  required
                  maxLength={10}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">WhatsApp</label>
                <input
                  name="whatsappPhone"
                  defaultValue={employee.whatsappPhone || ""}
                  maxLength={10}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={employee.email || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Father Name</label>
                <input
                  name="fatherName"
                  defaultValue={employee.fatherName || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Gender</label>
                <input
                  name="gender"
                  defaultValue={employee.gender || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  defaultValue={formatDateInput(employee.joiningDate)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Department</label>
                <select
                  name="department"
                  defaultValue={employee.department || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Designation</label>
                <input
                  name="designation"
                  defaultValue={employee.designation || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Role Title</label>
                <input
                  name="roleTitle"
                  defaultValue={employee.roleTitle || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Reporting Manager</label>
                <input
                  name="reportingManager"
                  defaultValue={employee.reportingManager || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Salary</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="salary"
                  defaultValue={employee.salary?.toString?.() || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Employment Type</label>
                <select
                  name="employmentType"
                  defaultValue={employee.employmentType || "FULL_TIME"}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  {EMPLOYMENT_TYPES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Work Mode</label>
                <select
                  name="workMode"
                  defaultValue={employee.workMode || "WFO"}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  {WORK_MODES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Shift Start</label>
                <input
                  name="shiftStart"
                  defaultValue={employee.shiftStart || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Shift End</label>
                <input
                  name="shiftEnd"
                  defaultValue={employee.shiftEnd || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select
                  name="status"
                  defaultValue={employee.status || "ACTIVE"}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  {STATUSES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  rows={3}
                  defaultValue={employee.address || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Aadhaar Number</label>
                <input
                  name="aadhaarNumber"
                  defaultValue={employee.aadhaarNumber || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">PAN Number</label>
                <input
                  name="panNumber"
                  defaultValue={employee.panNumber || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Bank Name</label>
                <input
                  name="bankName"
                  defaultValue={employee.bankName || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Account Number</label>
                <input
                  name="accountNumber"
                  defaultValue={employee.accountNumber || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">IFSC Code</label>
                <input
                  name="ifscCode"
                  defaultValue={employee.ifscCode || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Skills</label>
                <textarea
                  name="skills"
                  rows={3}
                  defaultValue={employee.skills || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Assigned Work</label>
                <textarea
                  name="assignedWork"
                  rows={3}
                  defaultValue={employee.assignedWork || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Internal Notes</label>
                <textarea
                  name="notes"
                  rows={4}
                  defaultValue={employee.notes || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Update Employee
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">Quick Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Full Name</span>
                  <span className="font-medium text-slate-900">{employee.fullName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Phone</span>
                  <span className="font-medium text-slate-900">{employee.phone}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Joining Date</span>
                  <span className="font-medium text-slate-900">{formatDateDisplay(employee.joiningDate)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Reporting Manager</span>
                  <span className="font-medium text-slate-900">{employee.reportingManager || "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Salary</span>
                  <span className="font-medium text-slate-900">{employee.salary ? `₹${employee.salary.toString()}` : "-"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">Add Note</h2>
              <form action={addEmployeeNote} className="mt-4 space-y-3">
                <input type="hidden" name="employeeId" value={employee.id} />
                <div>
                  <label className="mb-1 block text-sm font-medium">Created By</label>
                  <input
                    name="createdBy"
                    defaultValue="Admin"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Note</label>
                  <textarea
                    name="note"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Save Note
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">Recent Notes</h2>
              <div className="mt-4 space-y-3">
                {employee.noteHistory.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
                    No notes added yet.
                  </div>
                ) : (
                  employee.noteHistory.map((item: any) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium text-slate-900">{item.createdBy || "Admin"}</div>
                        <div className="text-xs text-slate-500">{formatDateDisplay(item.createdAt)}</div>
                      </div>
                      <div className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{item.note}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">Recent Attendance (Last 30)</h2>
              <div className="mt-4 space-y-2">
                {employee.attendance.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
                    No attendance records yet.
                  </div>
                ) : (
                  employee.attendance.map((row: any) => (
                    <div key={row.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm">
                      <div>
                        <div className="font-medium text-slate-900">{formatDateDisplay(row.date)}</div>
                        <div className="text-xs text-slate-500">
                          {row.checkInTime || "-"} to {row.checkOutTime || "-"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-slate-900">{String(row.status || "").replaceAll("_", " ")}</div>
                        <div className="text-xs text-slate-500">{row.workingHours?.toString?.() || "-"} hrs</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
