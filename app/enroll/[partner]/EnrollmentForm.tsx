"use client";

import { FormEvent, useRef, useState } from "react";

type Props = {
  partner: string;
  partnerName: string;
  programLabel: string;
  noticeVersion: string;
};

type Result = {
  enrollmentId: string;
  learnerCode: string;
  admissionCode?: string | null;
  duplicateEnrollment: boolean;
};

function submissionKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `web-${crypto.randomUUID()}`;
  }
  return `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const inputClass =
  "mt-2 w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";
const labelClass = "block text-sm font-medium text-slate-200";

export default function EnrollmentForm({ partner, partnerName, programLabel, noticeVersion }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const keyRef = useRef(submissionKey());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      hp: String(data.get("hp") || ""),
      fullName: String(data.get("fullName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      externalStudentId: String(data.get("externalStudentId") || ""),
      rollNumber: String(data.get("rollNumber") || ""),
      department: String(data.get("department") || ""),
      branch: String(data.get("branch") || ""),
      yearLevel: String(data.get("yearLevel") || ""),
      semester: String(data.get("semester") || ""),
      city: String(data.get("city") || ""),
      state: String(data.get("state") || ""),
      trainingEnrollmentAccepted: data.get("trainingEnrollmentAccepted") === "on",
      programCommunicationConsent: data.get("programCommunicationConsent") === "on",
    };

    try {
      const response = await fetch(`/api/b2b/enroll/${encodeURIComponent(partner)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": keyRef.current,
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json().catch(() => null)) as any;
      if (!response.ok || !body?.ok) {
        throw new Error(typeof body?.error === "string" ? body.error : "Enrollment could not be submitted.");
      }

      const nextResult: Result = {
        enrollmentId: String(body.enrollmentId || ""),
        learnerCode: String(body.learnerCode || ""),
        admissionCode: body.admissionCode ? String(body.admissionCode) : null,
        duplicateEnrollment: Boolean(body.duplicateEnrollment),
      };
      setResult(nextResult);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Enrollment could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <section className="rounded-3xl border border-emerald-400/20 bg-slate-900/80 p-6 shadow-2xl sm:p-8" aria-live="polite">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-300">✓</div>
        <h2 className="text-2xl font-semibold text-white">Enrollment received</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {result.duplicateEnrollment
            ? "An existing enrollment matched these details, so a duplicate record was not created."
            : "Your enrollment record has been created successfully."}
        </p>
        <dl className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-slate-400">Learner code</dt><dd className="font-mono text-white">{result.learnerCode}</dd></div>
          {result.admissionCode ? <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-slate-400">Admission code</dt><dd className="font-mono text-white">{result.admissionCode}</dd></div> : null}
          <div className="flex flex-wrap items-center justify-between gap-2"><dt className="text-slate-400">Enrollment ID</dt><dd className="max-w-full break-all font-mono text-xs text-slate-200">{result.enrollmentId}</dd></div>
        </dl>
        <p className="mt-5 text-xs leading-5 text-slate-500">Keep the learner code for future reference.</p>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur sm:p-8">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Authorized partner enrollment</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Student details</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Enter the details used by {partnerName} for {programLabel}.</p>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label>Leave this field empty<input name="hp" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={`${labelClass} sm:col-span-2`}>Full name <span className="text-red-300">*</span>
          <input className={inputClass} name="fullName" minLength={2} maxLength={180} autoComplete="name" required placeholder="Student full name" />
        </label>

        <label className={labelClass}>Mobile number
          <input className={inputClass} name="phone" inputMode="tel" maxLength={30} autoComplete="tel" placeholder="e.g. 9876543210" />
        </label>

        <label className={labelClass}>Email
          <input className={inputClass} name="email" type="email" maxLength={254} autoComplete="email" placeholder="student@example.com" />
        </label>

        <p className="-mt-2 text-xs text-slate-500 sm:col-span-2">At least one of mobile number or email is required.</p>

        <label className={labelClass}>Roll number
          <input className={inputClass} name="rollNumber" maxLength={100} autoComplete="off" />
        </label>

        <label className={labelClass}>Student / ERP ID
          <input className={inputClass} name="externalStudentId" maxLength={100} autoComplete="off" />
        </label>

        <label className={labelClass}>Department
          <input className={inputClass} name="department" maxLength={150} autoComplete="organization-title" placeholder="e.g. Civil Engineering" />
        </label>

        <label className={labelClass}>Branch
          <input className={inputClass} name="branch" maxLength={150} autoComplete="off" />
        </label>

        <label className={labelClass}>Year
          <input className={inputClass} name="yearLevel" maxLength={50} autoComplete="off" placeholder="e.g. 2nd Year" />
        </label>

        <label className={labelClass}>Semester
          <input className={inputClass} name="semester" maxLength={50} autoComplete="off" placeholder="e.g. 4" />
        </label>

        <label className={labelClass}>City
          <input className={inputClass} name="city" maxLength={100} autoComplete="address-level2" />
        </label>

        <label className={labelClass}>State
          <input className={inputClass} name="state" maxLength={100} autoComplete="address-level1" />
        </label>
      </div>

      <div className="mt-7 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
          <input className="mt-1 h-4 w-4 shrink-0 accent-blue-500" type="checkbox" name="trainingEnrollmentAccepted" required />
          <span>I confirm that the submitted details are correct and acknowledge the enrollment notice for this training program. <span className="text-slate-500">Notice {noticeVersion}</span></span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
          <input className="mt-1 h-4 w-4 shrink-0 accent-blue-500" type="checkbox" name="programCommunicationConsent" />
          <span>I agree to receive program-related operational communication from SikhaDenge. This optional permission can be managed separately from enrollment.</span>
        </label>
      </div>

      {error ? <div className="mt-5 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</div> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting securely…" : "Submit enrollment"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">Your form is sent through SikhaDenge&apos;s server. Partner service credentials are never exposed in the browser.</p>
    </form>
  );
}
