import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
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

async function updateStudent(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();
  if (!id) redirect("/dashboard/students?error=missing_id");

  const fullName = String(formData.get("fullName") || "").trim();
  const phone = onlyDigits(String(formData.get("phone") || "")).slice(-10);
  const whatsappPhone = onlyDigits(String(formData.get("whatsappPhone") || "")).slice(-10) || null;
  const email = String(formData.get("email") || "").trim().toLowerCase() || null;
  const fatherName = String(formData.get("fatherName") || "").trim() || null;
  const gender = String(formData.get("gender") || "").trim() || null;
  const city = String(formData.get("city") || "").trim() || null;
  const state = String(formData.get("state") || "").trim() || null;
  const address = String(formData.get("address") || "").trim() || null;

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
  const firstPaymentDateRaw = String(formData.get("firstPaymentDate") || "").trim();
  const nextDueDateRaw = String(formData.get("nextDueDate") || "").trim();
  const paymentStatus = String(formData.get("paymentStatus") || "NOT_STARTED").trim();
  const status = String(formData.get("status") || "LEAD").trim();

  const laptopAvailableRaw = String(formData.get("laptopAvailable") || "").trim();
  const classStartedRaw = String(formData.get("classStarted") || "").trim();
  const communityJoinedRaw = String(formData.get("communityJoined") || "").trim();
  const orientationDoneRaw = String(formData.get("orientationDone") || "").trim();
  const joiningStatus = String(formData.get("joiningStatus") || "").trim() || null;

  const notes = String(formData.get("notes") || "").trim() || null;

  if (!fullName || fullName.length < 2) {
    redirect(`/dashboard/students/${id}?error=invalid_name`);
  }

  if (phone.length !== 10) {
    redirect(`/dashboard/students/${id}?error=invalid_phone`);
  }

  const admissionDate = admissionDateRaw ? new Date(`${admissionDateRaw}T00:00:00`) : null;
  const firstPaymentDate = firstPaymentDateRaw ? new Date(`${firstPaymentDateRaw}T00:00:00`) : null;
  const nextDueDate = nextDueDateRaw ? new Date(`${nextDueDateRaw}T00:00:00`) : null;

  const totalFee = totalFeeRaw ? Number(totalFeeRaw) : null;
  const paidFee = paidFeeRaw ? Number(paidFeeRaw) : null;
  const pendingFee = pendingFeeRaw ? Number(pendingFeeRaw) : null;

  const laptopAvailable =
    laptopAvailableRaw === "YES" ? true :
    laptopAvailableRaw === "NO" ? false :
    null;

  const classStarted =
    classStartedRaw === "YES" ? true :
    classStartedRaw === "NO" ? false :
    null;

  const communityJoined =
    communityJoinedRaw === "YES" ? true :
    communityJoinedRaw === "NO" ? false :
    null;

  const orientationDone =
    orientationDoneRaw === "YES" ? true :
    orientationDoneRaw === "NO" ? false :
    null;

  try {
    await prisma.sdStudent.update({
      where: { id },
      data: {
        fullName,
        fatherName,
        phone,
        whatsappPhone,
        email,
        gender,
        city,
        state,
        address,
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
        firstPaymentDate,
        nextDueDate,
        paymentStatus: paymentStatus as any,
        status: status as any,
        laptopAvailable,
        classStarted,
        communityJoined,
        orientationDone,
        joiningStatus,
        notes,
      },
    });

    revalidatePath(`/dashboard/students/${id}`);
    revalidatePath("/dashboard/students");
    redirect(`/dashboard/students/${id}?ok=updated`);
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.includes("phone")) redirect(`/dashboard/students/${id}?error=phone_exists`);
    if (message.includes("email")) redirect(`/dashboard/students/${id}?error=email_exists`);
    redirect(`/dashboard/students/${id}?error=update_failed`);
  }
}

async function addStudentNote(formData: FormData) {
  "use server";

  const studentId = String(formData.get("studentId") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const createdBy = String(formData.get("createdBy") || "").trim() || "Admin";

  if (!studentId || !note) {
    redirect(`/dashboard/students/${studentId}?error=note_required`);
  }

  try {
    await prisma.sdStudentNote.create({
      data: {
        studentId,
        note,
        createdBy,
      },
    });

    revalidatePath(`/dashboard/students/${studentId}`);
    redirect(`/dashboard/students/${studentId}?ok=note_added`);
  } catch {
    redirect(`/dashboard/students/${studentId}?error=note_failed`);
  }
}

export default async function StudentDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { ok?: string; error?: string };
}) {
  const id = String(params?.id || "").trim();
  if (!id) notFound();

  const student = await prisma.sdStudent.findUnique({
    where: { id },
    include: {
      noteHistory: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  if (!student) notFound();

  const ok = String(searchParams?.ok || "").trim();
  const error = String(searchParams?.error || "").trim();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
            <p className="text-sm text-slate-600">
              Detailed student management, fee control, batch mapping, and internal notes history.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/dashboard/students"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Students
            </a>
          </div>
        </div>

        {ok ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {
              {
                updated: "Student updated successfully.",
                note_added: "Student note added successfully.",
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
                update_failed: "Student update failed.",
                note_required: "Note is required.",
                note_failed: "Note save failed.",
              }[error] || "Something went wrong."
            }
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Student Code</div>
            <div className="mt-2 text-lg font-bold">{student.studentCode}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Course</div>
            <div className="mt-2 text-lg font-bold">{student.courseName || "-"}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Batch</div>
            <div className="mt-2 text-lg font-bold">{student.batchName || "-"}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</div>
            <div className="mt-2 text-lg font-bold">{String(student.status || "").replaceAll("_", " ")}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Payment</div>
            <div className="mt-2 text-lg font-bold">{String(student.paymentStatus || "").replaceAll("_", " ")}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Next Due</div>
            <div className="mt-2 text-lg font-bold">{formatDateDisplay(student.nextDueDate)}</div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Edit Student Details</h2>
              <p className="mt-1 text-sm text-slate-600">
                Update profile, batch, fee structure, payment status, and onboarding progress.
              </p>
            </div>

            <form action={updateStudent} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={student.id} />

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Full Name</label>
                <input
                  name="fullName"
                  defaultValue={student.fullName || ""}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  defaultValue={student.phone || ""}
                  required
                  maxLength={10}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">WhatsApp</label>
                <input
                  name="whatsappPhone"
                  defaultValue={student.whatsappPhone || ""}
                  maxLength={10}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={student.email || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Father Name</label>
                <input
                  name="fatherName"
                  defaultValue={student.fatherName || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Gender</label>
                <input
                  name="gender"
                  defaultValue={student.gender || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">City</label>
                <input
                  name="city"
                  defaultValue={student.city || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">State</label>
                <input
                  name="state"
                  defaultValue={student.state || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  rows={3}
                  defaultValue={student.address || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Course</label>
                <select
                  name="courseName"
                  defaultValue={student.courseName || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="">Select Course</option>
                  {COURSE_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Course Type</label>
                <input
                  name="courseType"
                  defaultValue={student.courseType || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Batch Name</label>
                <input
                  name="batchName"
                  defaultValue={student.batchName || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Batch Timing</label>
                <input
                  name="batchTiming"
                  defaultValue={student.batchTiming || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Admission Date</label>
                <input
                  type="date"
                  name="admissionDate"
                  defaultValue={formatDateInput(student.admissionDate)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Counselor</label>
                <input
                  name="counselorName"
                  defaultValue={student.counselorName || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Lead Source</label>
                <input
                  name="leadSource"
                  defaultValue={student.leadSource || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Mode</label>
                <input
                  name="mode"
                  defaultValue={student.mode || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Total Fee</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="totalFee"
                  defaultValue={student.totalFee?.toString?.() || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Paid Fee</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="paidFee"
                  defaultValue={student.paidFee?.toString?.() || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Pending Fee</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="pendingFee"
                  defaultValue={student.pendingFee?.toString?.() || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Installment Plan</label>
                <input
                  name="installmentPlan"
                  defaultValue={student.installmentPlan || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">First Payment Date</label>
                <input
                  type="date"
                  name="firstPaymentDate"
                  defaultValue={formatDateInput(student.firstPaymentDate)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Next Due Date</label>
                <input
                  type="date"
                  name="nextDueDate"
                  defaultValue={formatDateInput(student.nextDueDate)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Payment Status</label>
                <select
                  name="paymentStatus"
                  defaultValue={student.paymentStatus || "NOT_STARTED"}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  {PAYMENT_STATUSES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Student Status</label>
                <select
                  name="status"
                  defaultValue={student.status || "LEAD"}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  {STUDENT_STATUSES.map((item) => (
                    <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Laptop Available</label>
                <select
                  name="laptopAvailable"
                  defaultValue={student.laptopAvailable === true ? "YES" : student.laptopAvailable === false ? "NO" : ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="">Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Class Started</label>
                <select
                  name="classStarted"
                  defaultValue={student.classStarted === true ? "YES" : student.classStarted === false ? "NO" : ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="">Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Community Joined</label>
                <select
                  name="communityJoined"
                  defaultValue={student.communityJoined === true ? "YES" : student.communityJoined === false ? "NO" : ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="">Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Orientation Done</label>
                <select
                  name="orientationDone"
                  defaultValue={student.orientationDone === true ? "YES" : student.orientationDone === false ? "NO" : ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="">Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Joining Status</label>
                <input
                  name="joiningStatus"
                  defaultValue={student.joiningStatus || ""}
                  placeholder="Joined / Pending / Hold"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Internal Notes</label>
                <textarea
                  name="notes"
                  rows={4}
                  defaultValue={student.notes || ""}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">Quick Summary</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Student</span>
                  <span className="font-medium text-slate-900">{student.fullName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Phone</span>
                  <span className="font-medium text-slate-900">{student.phone}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Counselor</span>
                  <span className="font-medium text-slate-900">{student.counselorName || "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Admission Date</span>
                  <span className="font-medium text-slate-900">{formatDateDisplay(student.admissionDate)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Total Fee</span>
                  <span className="font-medium text-slate-900">{student.totalFee ? `₹${student.totalFee.toString()}` : "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Paid Fee</span>
                  <span className="font-medium text-slate-900">{student.paidFee ? `₹${student.paidFee.toString()}` : "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Pending Fee</span>
                  <span className="font-medium text-slate-900">{student.pendingFee ? `₹${student.pendingFee.toString()}` : "-"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">Add Note</h2>
              <form action={addStudentNote} className="mt-4 space-y-3">
                <input type="hidden" name="studentId" value={student.id} />
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
                {student.noteHistory.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
                    No notes added yet.
                  </div>
                ) : (
                  student.noteHistory.map((item: any) => (
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
              <h2 className="text-lgsemibold">Onboarding Snapshot</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Laptop Available</span>
                  <span className="font-medium text-slate-900">{student.laptopAvailable === true ? "Yes" : student.laptopAvailable === false ? "No" : "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Class Started</span>
                  <span className="font-medium text-slate-900">{student.classStarted === true ? "Yes" : student.classStarted === false ? "No" : "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Community Joined</span>
                  <span className="font-medium text-slate-900">{student.communityJoined === true ? "Yes" : student.communityJoined === false ? "No" : "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Orientation Done</span>
                  <span className="font-medium text-slate-900">{student.orientationDone === true ? "Yes" : student.orientationDone === false ? "No" : "-"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Joining Status</span>
                  <span className="font-medium text-slate-900">{student.joiningStatus || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
