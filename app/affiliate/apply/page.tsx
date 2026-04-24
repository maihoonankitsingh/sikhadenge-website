"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getAffiliateCodeFromUrl,
  getStoredAffiliateCode,
  hasTrackedClick,
  markTrackedClick,
  resolveAffiliateCode,
  setStoredAffiliateCode,
  trackAffiliateClick,
} from "@/lib/affiliate/client";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  sourceType: string;
  audienceType: string;
  instagramUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
  websiteUrl: string;
  experience: string;
  promotionPlan: string;
  payoutName: string;
  payoutMethod: string;
  payoutUpiId: string;
  payoutBankName: string;
  payoutAccountNo: string;
  payoutIfsc: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  sourceType: "",
  audienceType: "",
  instagramUrl: "",
  youtubeUrl: "",
  telegramUrl: "",
  websiteUrl: "",
  experience: "",
  promotionPlan: "",
  payoutName: "",
  payoutMethod: "UPI",
  payoutUpiId: "",
  payoutBankName: "",
  payoutAccountNo: "",
  payoutIfsc: "",
};

export default function AffiliateApplyPage() {
  const [affiliateNotice, setAffiliateNotice] = useState("");
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const isBankMethod = useMemo(
    () => form.payoutMethod.trim().toUpperCase() === "BANK",
    [form.payoutMethod]
  );

  useEffect(() => {
    let cancelled = false;

    async function bootAffiliateTracking() {
      try {
        const codeFromUrl = getAffiliateCodeFromUrl();
        const storedCode = getStoredAffiliateCode();
        const finalCode = codeFromUrl || storedCode;

        if (!finalCode) return;

        const affiliate = await resolveAffiliateCode(finalCode);
        if (!affiliate || cancelled) return;

        setStoredAffiliateCode(affiliate.affiliateCode);
        setAffiliateNotice(`Referral active: ${affiliate.affiliateCode}`);

        if (!hasTrackedClick(affiliate.affiliateCode)) {
          const tracked = await trackAffiliateClick(affiliate.affiliateCode);
          if (tracked && !cancelled) {
            markTrackedClick(affiliate.affiliateCode);
          }
        }
      } catch {
        // silent fail to avoid affecting page UX
      }
    }

    bootAffiliateTracking();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setServerError("");
    setServerSuccess("");
    setApplicationId("");

    try {
      const res = await fetch("/api/affiliate/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setServerError(data?.error || "Unable to submit affiliate application.");
        return;
      }

      setServerSuccess("Application submitted successfully. Our team will review it.");
      setApplicationId(data?.application?.id || "");
      setForm(initialState);
    } catch (error) {
      setServerError("Something went wrong while submitting the form.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
            Sikhadenge Affiliate Program
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Affiliate Application Form
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Submit your affiliate profile for review. Approved partners receive a unique affiliate code and referral link.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Basic Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill the required details carefully.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name *"
                  value={form.fullName}
                  onChange={(v) => updateField("fullName", v)}
                  placeholder="Enter full name"
                />
                <Field
                  label="Phone Number *"
                  value={form.phone}
                  onChange={(v) => updateField("phone", v)}
                  placeholder="10-digit phone number"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                  placeholder="Enter email"
                  type="email"
                />
                <Field
                  label="City"
                  value={form.city}
                  onChange={(v) => updateField("city", v)}
                  placeholder="Enter city"
                />
                <Field
                  label="Source Type"
                  value={form.sourceType}
                  onChange={(v) => updateField("sourceType", v)}
                  placeholder="Instagram / YouTube / Telegram / Community"
                />
                <Field
                  label="Audience Type"
                  value={form.audienceType}
                  onChange={(v) => updateField("audienceType", v)}
                  placeholder="Students / Creators / Freelancers"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Profile Links</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Instagram URL"
                  value={form.instagramUrl}
                  onChange={(v) => updateField("instagramUrl", v)}
                  placeholder="https://instagram.com/..."
                />
                <Field
                  label="YouTube URL"
                  value={form.youtubeUrl}
                  onChange={(v) => updateField("youtubeUrl", v)}
                  placeholder="https://youtube.com/..."
                />
                <Field
                  label="Telegram URL"
                  value={form.telegramUrl}
                  onChange={(v) => updateField("telegramUrl", v)}
                  placeholder="https://t.me/..."
                />
                <Field
                  label="Website URL"
                  value={form.websiteUrl}
                  onChange={(v) => updateField("websiteUrl", v)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Experience & Promotion</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Experience"
                  value={form.experience}
                  onChange={(v) => updateField("experience", v)}
                  placeholder="Your affiliate or promotion experience"
                />
                <SelectField
                  label="Payout Method"
                  value={form.payoutMethod}
                  onChange={(v) => updateField("payoutMethod", v)}
                  options={[
                    { value: "UPI", label: "UPI" },
                    { value: "BANK", label: "Bank Transfer" },
                  ]}
                />
              </div>

              <TextAreaField
                label="Promotion Plan"
                value={form.promotionPlan}
                onChange={(v) => updateField("promotionPlan", v)}
                placeholder="How will you promote Sikhadenge?"
                rows={5}
              />

              <div>
                <h2 className="text-lg font-semibold text-slate-900">Payout Details</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Payout Name"
                  value={form.payoutName}
                  onChange={(v) => updateField("payoutName", v)}
                  placeholder="Name for payout"
                />

                {!isBankMethod ? (
                  <Field
                    label="UPI ID"
                    value={form.payoutUpiId}
                    onChange={(v) => updateField("payoutUpiId", v)}
                    placeholder="example@upi"
                  />
                ) : (
                  <>
                    <Field
                      label="Bank Name"
                      value={form.payoutBankName}
                      onChange={(v) => updateField("payoutBankName", v)}
                      placeholder="Enter bank name"
                    />
                    <Field
                      label="Account Number"
                      value={form.payoutAccountNo}
                      onChange={(v) => updateField("payoutAccountNo", v)}
                      placeholder="Enter account number"
                    />
                    <Field
                      label="IFSC Code"
                      value={form.payoutIfsc}
                      onChange={(v) => updateField("payoutIfsc", v)}
                      placeholder="Enter IFSC code"
                    />
                  </>
                )}
              </div>

              {serverError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              ) : null}

              {serverSuccess ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <div>{serverSuccess}</div>
                  {applicationId ? (
                    <div className="mt-1 font-medium">Application ID: {applicationId}</div>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Affiliate Application"}
                </button>

                <a
                  href="/affiliate"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to Affiliate Page
                </a>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Application Process</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div>1. Submit your affiliate profile</div>
                <div>2. Team reviews your application</div>
                <div>3. Approved partners receive code + referral link</div>
                <div>4. Traffic, leads, and commissions get tracked later in the flow</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Important Notes</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div>• Approval is not automatic.</div>
                <div>• Incorrect or duplicate details may be rejected.</div>
                <div>• Payout details can be updated later during approval workflow.</div>
                <div>• Final commission rules are managed by admin workflows.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-blue-500"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-blue-500"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
