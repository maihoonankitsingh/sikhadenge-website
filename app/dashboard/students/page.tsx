import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STUDENT_STATUSES = [
  "LEAD",
  "INTERESTED",
  "ADMITTED",
  "ACTIVE",
  "HOLD",
  "COMPLETED",
  "DROPPED",
] as const;

const PAYMENT_STATUSES = [
  "NOT_STARTED",
  "PARTIAL",
  "PAID",
  "OVERDUE",
] as const;

const COURSE_OPTIONS = [
  "AI Expert Accelerator Program",
  "Gen-AI Graphic Design & Edit Videos with AI Editing",
  "Graphic Design",
  "Video Editing",
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "Illustrator",
] as const;

function onlyDigits(value: string) {
  return (value || "").replace(/\D/g, "");
}

async function createStudent(formData: FormData) {
  "use server";

  const fullName = String(formData.get("fullName") || "").trim();
  const phone = onlyDigits(String(formData.get("phone") || "")).slice(-10);
  const whatsappPhoneRaw = onlyDigits(String(formData.get("whatsappPhone") || "")).slice(-10);
  const emailRaw = String(formData.get("email") || "").trim().toLowerCase();
  const fatherName = String(formData.get("fatherName") || "").trim() || null;
  const city = String(formData.get("city") || "").trim() || null;
  const state = String(formData.get("state") || "").trim() || null;

  const courseName = String(formData.get("courseName") || "").trim() || null;
  const courseType = String(formData.get("courseType") || "").trim() || null;
  const batchName = String(formData.get("batchName") || "").trim() || null;
  const batchTiming = String(formData.get("batchTiming") || "").trim() || null;
  const counselorName = String(formData.get("counselorName") || "").trim() || null;
  const leadSource = String(formData.get("leadSource") || "").trim() || null;
  const mode = String(formData.get("mode") || "").trim() || null;

  const admissionDateRaw = String(formData.get("admissionDate") || "").trim();
  const totalFeeRaw = String(formData.get("totalFee") || "").trim();
  const paidFeeRaw = String(formData.get("paidFee") || "").trim();
  const pendingFeeRaw = String(formData.get("pendingFee") || "").trim();
  const installmentPlan = String(formData.get("installmentPlan") || "").trim() || null;
  const nextDueDateRaw = String(formData.get("nextDueDate") || "").trim();
  const paymentStatus = String(formData.get("paymentStatus") || "NOT_STARTED").trim();
  const status = String(formData.get("status") || "LEAD").trim();

  const laptopAvailableRaw = String(formData.get("laptopAvailable") || "").trim();
  const communityJoinedRaw = String(formData.get("communityJoined") || "").trim();
  const orientationDoneRaw = String(formData.get("orientationDone") || "").trim();
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!fullName || fullName.length < 2) {
    redirect("/dashboard/students?error=invalid_name");
  }

  if (phone.length != 10) {
    redirect("/dashboard/students?error=invalid_phone");
  }

  const admissionDate = admissionDateRaw ? new Date(`${admissionDateRaw}T00:00:00`) : null;
  const nextDueDate = nextDueDateRaw ? new Date(`${nextDueDateRaw}T00:00:00`) : null;

  const totalFee = totalFeeRaw ? Number(totalFeeRaw) : null;
  const paidFee = paidFeeRaw ? Number(paidFeeRaw) : null;
  const pendingFee = pendingFeeRaw ? Number(pendingFeeRaw) : null;

  const laptopAvailable =
    laptopAvailableRaw === "YES" ? true :
    laptopAvailableRaw === "NO" ? false :
    null;

  const communityJoined =
    communityJoinedRaw === "YES" ? true :
    communityJoinedRaw === "NO" ? false :
    null;

  const orientationDone =
    orientationDoneRaw === "YES" ? true :
    orientationDoneRaw === "NO" ? false :
    null;

  const studentCode = `STD${Date.now().toString().slice(-8)}`;

  try {
    await prisma.sdStudent.create({
      data: {
        studentCode,
        fullName,
        fatherName,
        phone,
        whatsappPhone: whatsappPhoneRaw || null,
        email: emailRaw || null,
        city,
        state,
        courseName,
        courseType,
        batchName,
        batchTiming,
        counselorName,
        leadSource,
        mode,
        admissionDate,
        totalFee: totalFee as any,
        paidFee: paidFee as any,
        pendingFee: pendingFee as any,
        installmentPlan,
        nextDueDate,
        paymentStatus: paymentStatus as any,
        status: status as any,
        laptopAvailable,
        communityJoined,
        orientationDone,
        notes,
      },
    });

    revalidatePath("/dashboard/students");
    redirect("/dashboard/students?ok=1");
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.includes("phone")) redirect("/dashboard/students?error=phone_exists");
    if (message.includes("email")) redirect("/dashboard/students?error=email_exists");
    if (message.includes("studentCode")) redirect("/dashboard/students?error=student_code_exists");
    redirect("/dashboard/students?error=create_failed");
  }
}

export default async function StudentsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    course?: string;
    batch?: string;
    status?: string;
    paymentStatus?: string;
    ok?: string;
    error?: string;
  };
}) {
  const q = String(searchParams?.q || "").trim();
  const course = String(searchParams?.course || "").trim();
  const batch = String(searchParams?.batch || "").trim();
  const status = String(searchParams?.status || "").trim();
  const paymentStatus = String(searchParams?.paymentStatus || "").trim();
  const ok = String(searchParams?.ok || "").trim();
  const error = String(searchParams?.error || "").trim();

  const where: any = {};

  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { phone: { contains: q } },
      { studentCode: { contains: q, mode: "insensitive" } },
      { counselorName: { contains: q, mode: "insensitive" } },
    ];
  }

  if (course) where.courseName = course;
  if (batch) where.batchName = batch;
  if (status) where.status = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;

  const [students, counts, batchRows] = await Promise.all([
    prisma.sdStudent.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 300,
    }),
    prisma.sdStudent.findMany({
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        courseName: true,
      },
      take: 2000,
    }),
    prisma.sdStudent.findMany({
      where: {
        batchName: {
          not: null,
        },
      },
      select: {
        batchName: true,
      },
      distinct: ["batchName"],
      take: 500,
    }),
  ]);

  const totalStudents = counts.length;
  const activeStudents = counts.filter((x: any) => x.status === "ACTIVE").length;
  const admittedStudents = counts.filter((x: any) => x.status === "ADMITTED").length;
  const leadStudents = counts.filter((x: any) => x.status === "LEAD").length;
  const paidStudents = counts.filter((x: any) => x.paymentStatus === "PAID").length;
  const overdueStudents = counts.filter((x: any) => x.paymentStatus === "OVERDUE").length;

  const batches = Array.from(new Set(batchRows.map((x: any) => x.batchName).filter(Boolean)));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-sm text-slate-600">
              Manual student records, course mapping, fee status, and admin-safe tracking.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Hidden admin page — public website untouched.
          </div>
        </div>

        {ok === "1" ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Student added successfully.
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
                student_code_exists: "Student code conflict. Try again.",
                create_failed: "Student create failed. Check values and retry.",
              }[error] || "Something went wrong."
            }
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Total</div>
            <div className="mt-2 text-2xl font-bold">{totalStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Active</div>
            <div className="mt-2 text-2xl font-bold">{activeStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Admitted</div>
            <div className="mt-2 text-2xl font-bold">{admittedStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Lead</div>
            <div className="mt-2 text-2xl font-bold">{leadStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Paid</div>
            <div className="mt-2 text-2xl font-bold">{paidStudents}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Overdue</div>
            <div className="mt-2 text-2xl font-bold">{overdueStudents}</div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[440px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Add Student</h2>
            <p className="mt-1 text-sm text-slate-600">
              Manual entry for student details, batch, course, and fee status.
            </p>

            <form action={createStudent} className="mt-4 space-y-4">
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
                  <label className="mb-1 block text-sm font-medium">Father Name</label>
                  <input name="fatherName" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">City</label>
                  <input name="city" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">State</label>
                  <input name="state" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Course</label>
                  <select name="courseName" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    <option value="">Select Course</option>
                    {COURSE_OPTIONS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Course Type</label>
                  <input name="courseType" placeholder="Live / Recorded / Hybrid" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Batch Name</label>
                  <input name="batchName" placeholder="Morning Batch / Batch A" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Batch Timing</label>
                  <input name="batchTiming" placeholder="7 PM - 9 PM" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Admission Date</label>
                  <input name="admissionDate" type="date" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Counselor</label>
                  <input name="counselorName" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Lead Source</label>
                  <input name="leadSource" placeholder="Meta / WhatsApp / Referral" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Mode</label>
                  <input name="mode" placeholder="Online / Offline" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Total Fee</label>
                  <input name="totalFee" type="number" step="0.01" min="0" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Paid Fee</label>
                  <input name="paidFee" type="number" step="0.01" min="0" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Pending Fee</label>
                  <input name="pendingFee" type="number" step="0.01" min="0" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Installment Plan</label>
                  <input name="installmentPlan" placeholder="Monthly / 2 Parts / Full" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Next Due Date</label>
                  <input name="nextDueDate" type="date" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Payment Status</label>
                  <select name="paymentStatus" defaultValue="NOT_STARTED" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    {PAYMENT_STATUSES.map((item) => (
                      <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Student Status</label>
                  <select name="status" defaultValue="LEAD" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    {STUDENT_STATUSES.map((item) => (
                      <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Laptop Available</label>
                  <select name="laptopAvailable" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    <option value="">Select</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Community Joined</label>
                  <select name="communityJoined" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    <option value="">Select</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Orientation Done</label>
                  <select name="orientationDone" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500">
                    <option value="">Select</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
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
                Save Student
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Student Records</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Filter by search, course, batch, status, and payment status.
                </p>
              </div>

              <form method="get" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search name / phone / code"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
                <select
                  name="course"
                  defaultValue={course}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="">All Courses</option>
                  {COURSE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <select
                  name="batch"
                  defaultValue={batch}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="">All Batches</option>
                  {batches.map((item: any) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <select
                  name="status"
                  defaultValue={status}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="">All Status</option>
                  {STUDENT_STATUSES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
                <select
                  name="paymentStatus"
                  defaultValue={paymentStatus}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                >
                  <option value="">All Payment Status</option>
                  {PAYMENT_STATUSES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
                <div className="sm:col-span-2 xl:col-span-5 flex gap-2">
                  <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                    Apply Filters
                  </button>
                  <a
                    href="/dashboard/students"
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
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Course / Batch</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Fees</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                        No students found.
                      </td>
                    </tr>
                  ) : (
                    students.map((student: any) => (
                      <tr key={student.id} className="align-top">
                        <td className="px-4 py-3">
                          <a href={`/dashboard/students/${student.id}`} className="font-medium text-slate-900 hover:underline">{student.fullName}</a>
                          <div className="text-xs text-slate-500">{student.studentCode}</div>
                          {student.email ? (
                            <div className="text-xs text-slate-500">{student.email}</div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{student.courseName || "-"}</div>
                          <div className="text-xs text-slate-500">{student.batchName || "-"} · {student.batchTiming || "-"}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{student.phone}</div>
                          <div className="text-xs text-slate-500">{student.whatsappPhone || "-"}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>Total: {student.totalFee?.toString?.() || "-"}</div>
                          <div className="text-xs text-slate-500">Paid: {student.paidFee?.toString?.() || "-"} · Pending: {student.pendingFee?.toString?.() || "-"}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {String(student.status || "").replaceAll("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {String(student.paymentStatus || "").replaceAll("_", " ")}
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
