"use client";

import { useMemo, useState } from "react";

const initialState = {
  fullName: "",
  workEmail: "",
  phoneNumber: "",
  companyName: "",
  teamSize: "",
  preferredTrainingMode: "",
  trainingRequirement: "",
};

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium text-[#0B1220]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function InquiryForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400";

  const submitDisabled = useMemo(() => {
    return loading || !form.fullName.trim() || !form.phoneNumber.trim();
  }, [form.fullName, form.phoneNumber, loading]);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/corporate-training-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMessage(data.message || "Submission failed.");
        return;
      }

      setSuccessMessage("Inquiry submitted successfully. Our team will review it shortly.");
      setForm(initialState);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[30px] border border-[#D8DDE6] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
      <div className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#37557A]">
        Team capability inquiry
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={updateField}
            placeholder="Enter your full name"
            className={inputClass}
          />
        </Field>

        <Field label="Work Email">
          <input
            name="workEmail"
            type="email"
            value={form.workEmail}
            onChange={updateField}
            placeholder="Enter your work email"
            className={inputClass}
          />
        </Field>

        <Field label="Phone Number" className="sm:col-span-2">
          <input
            name="phoneNumber"
            type="text"
            value={form.phoneNumber}
            onChange={updateField}
            placeholder="Enter phone number"
            className={inputClass}
          />
        </Field>

        <Field label="Company Name" className="sm:col-span-2">
          <input
            name="companyName"
            type="text"
            value={form.companyName}
            onChange={updateField}
            placeholder="Enter your company name"
            className={inputClass}
          />
        </Field>

        <Field label="Team Size">
          <select
            name="teamSize"
            value={form.teamSize}
            onChange={updateField}
            className={inputClass}
          >
            <option value="">Select team size</option>
            <option value="1-10">1-10</option>
            <option value="11-25">11-25</option>
            <option value="26-50">26-50</option>
            <option value="50+">50+</option>
          </select>
        </Field>

        <Field label="Preferred Training Mode">
          <input
            name="preferredTrainingMode"
            type="text"
            value={form.preferredTrainingMode}
            onChange={updateField}
            placeholder="Online / Offline / Hybrid"
            className={inputClass}
          />
        </Field>

        <Field label="Training Requirement" className="sm:col-span-2">
          <textarea
            name="trainingRequirement"
            rows={6}
            value={form.trainingRequirement}
            onChange={updateField}
            placeholder="Tell us about your team, workflow, and training requirement"
            className={inputClass}
          />
        </Field>

        <button
          type="submit"
          disabled={submitDisabled}
          className="mt-3 inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-6 py-4 text-[16px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>

        {successMessage ? (
          <div className="sm:col-span-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        ) : null}

        {errorMessage ? (
          <div className="sm:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}
      </form>
    </div>
  );
}
