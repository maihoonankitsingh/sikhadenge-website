"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

function queryValue(params: URLSearchParams, key: string) {
  return String(params.get(key) || "").trim();
}

export default function CompleteClient() {
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const query = useMemo(
    () =>
      new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      ),
    []
  );

  const orderId = queryValue(query, "orderId");
  const paymentId = queryValue(query, "paymentId");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setPageError("");

    try {
      const formData = new FormData(event.currentTarget);
      const aadhaar = String(formData.get("aadhaar") || "").replace(
        /\D/g,
        ""
      );

      if (aadhaar.length !== 12) {
        throw new Error("Enter a valid 12-digit Aadhaar number");
      }

      for (const field of [
        "aadhaarFront",
        "aadhaarBack",
        "qualificationDoc",
      ]) {
        const file = formData.get(field);

        if (!(file instanceof File) || !file.name) {
          throw new Error("Select all required documents");
        }

        if (file.size > MAX_FILE_BYTES) {
          throw new Error("Each document must be 5 MB or smaller");
        }
      }

      const response = await fetch("/api/admission/complete", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        throw new Error(
          data?.error || "Admission completion failed"
        );
      }

      window.location.assign("/admission/welcome");
    } catch (error) {
      setPageError(
        error instanceof Error
          ? error.message
          : "Admission completion failed"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
            Payment verified
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Complete document verification
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Aadhaar number ka sirf last four digits database me store
            hoga. Uploaded documents private server storage me save
            honge.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-800">
                  Aadhaar number <span className="text-red-500">*</span>
                  <input
                    className={inputClass}
                    name="aadhaar"
                    inputMode="numeric"
                    pattern="[0-9]{12}"
                    maxLength={12}
                    placeholder="12-digit Aadhaar"
                    required
                  />
                </label>

                <label className="text-sm font-medium text-slate-800">
                  Highest qualification{" "}
                  <span className="text-red-500">*</span>
                  <select
                    className={inputClass}
                    name="highestQualification"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select qualification
                    </option>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">
                      Post Graduation
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              {[
                ["aadhaarFront", "Aadhaar front"],
                ["aadhaarBack", "Aadhaar back"],
                ["qualificationDoc", "Qualification certificate"],
              ].map(([name, title]) => (
                <label
                  key={name}
                  className="block rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-medium text-slate-800"
                >
                  {title} <span className="text-red-500">*</span>
                  <input
                    className="mt-3 block w-full text-sm text-slate-600"
                    type="file"
                    name={name}
                    accept="image/jpeg,image/png,application/pdf"
                    required
                  />
                  <span className="mt-2 block text-xs font-normal text-slate-500">
                    Genuine JPG, PNG or PDF. Maximum 5 MB.
                  </span>
                </label>
              ))}

              {pageError ? (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {pageError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Uploading securely..."
                  : "Submit and complete admission"}
              </button>

              <p className="text-xs leading-5 text-slate-500">
                Submission is subject to the{" "}
                <Link href="/terms" className="underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="font-bold text-emerald-950">
                Payment confirmed
              </h2>

              <div className="mt-4 space-y-3 text-xs text-emerald-900">
                <div>
                  <div className="text-emerald-700">Order ID</div>
                  <div className="mt-1 break-all font-mono">
                    {orderId || "Verified"}
                  </div>
                </div>

                <div>
                  <div className="text-emerald-700">Payment ID</div>
                  <div className="mt-1 break-all font-mono">
                    {paymentId || "Verified"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-950">
                Document security
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>Private, non-public file storage</li>
                <li>Protected payment completion session</li>
                <li>File-size and genuine file-format validation</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
