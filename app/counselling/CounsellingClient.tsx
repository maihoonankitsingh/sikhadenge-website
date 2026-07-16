"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import React, { useMemo, useState } from "react";
import { trackMetaEvent } from "@/lib/metaPixel";

const BRAND = {
  base: "#0B1220",
  surface: "#111827",
  border: "rgba(255,255,255,0.10)",
  primary: "#2563EB",
  blueDark: "#1D4ED8",
  gold: "#F5B301",
  text: "#FFFFFF",
  text2: "#B0B7C3",
  muted: "#9CA3AF",
};

function GlowBg() {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{ background: "rgba(37,99,235,0.55)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-[-120px] h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
        style={{ background: "rgba(245,179,1,0.55)" }}
      />
    </>
  );
}

export default function CounsellingPage() {
  const courses = useMemo(
    () => [
      "Graphic Design",
      "Video Editing",
      "Motion Graphics",
      "AI for Designers",
      "Not sure (Need guidance)",
    ],
    []
  );

  const iam = useMemo(
    () => ["Student", "College", "Working Professional", "Freelancer", "Business / Agency", "Other"],
    []
  );

  const specs = useMemo(
    () => ["Beginner", "Intermediate", "Advanced", "Career Switch", "Portfolio Building"],
    []
  );

  const [form, setForm] = useState({
    course: "",
    fullName: "",
    phone: "",
    iam: "",
    specialization: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setDone(null);

    if (!form.course) return setErr("Course required");
    if (!form.fullName || form.fullName.trim().length < 2) return setErr("Full name required");
    if (!form.phone || form.phone.replace(/[^\d]/g, "").length < 10) return setErr("Valid phone required");
    if (!form.iam) return setErr("Required");
    if (!form.specialization) return setErr("Required");

    setSubmitting(true);
    try {
      const payload = {
        name: form.fullName.trim(),
        phone: form.phone.trim(),
        course: form.course,
        message: `I am: ${form.iam} | Level: ${form.specialization}`,
        page: "counselling-page",
      };

      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j?.ok) {
        throw new Error(j?.error || "Submit failed");
      }

      trackMetaEvent("Lead");
      setDone("Submitted. Team will call you for 1:1 counselling.");
      setForm({ course: "", fullName: "", phone: "", iam: "", specialization: "" });
    } catch (e: any) {
      setErr(String(e?.message || "Server error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen" style={{ background: BRAND.base, color: BRAND.text }}>
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <GlowBg />

        <div
          className="relative overflow-hidden rounded-2xl border"
          style={{ borderColor: BRAND.border, background: `linear-gradient(180deg, rgba(17,24,39,0.85), rgba(11,18,32,0.92))` }}
        >
          <div className="grid gap-0 lg:grid-cols-2">
            {/* LEFT */}
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                   style={{ borderColor: BRAND.border, color: BRAND.text2 }}>
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.gold }} />
                First call is on us
              </div>

              <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Schedule 1:1 free counselling.
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 sm:text-base" style={{ color: BRAND.text2 }}>
                Get course-fit guidance, batch timing, and a clear learning path. No spam.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Tailored guidance for your goal",
                  "Real-world tools & expectations",
                  "Portfolio + placement direction",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3"
                    style={{ borderColor: BRAND.border, background: "rgba(17,24,39,0.55)" }}
                  >
                    <div
                      className="grid h-8 w-8 place-items-center rounded-lg"
                      style={{ background: "rgba(245,179,1,0.16)", color: BRAND.gold }}
                    >
                      ✓
                    </div>
                    <div className="text-sm sm:text-base" style={{ color: BRAND.text }}>
                      {t}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xs leading-5" style={{ color: BRAND.muted }}>
                By submitting, you agree to our Terms & Privacy Policy.
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="rounded-2xl border bg-white p-5 sm:p-6"
                   style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="sd-form-card p-5 md:p-6">
<form className="grid gap-4" onSubmit={submit}>
                  <div>
                    <label className="text-xs text-slate-600">Course interested in *</label>
                    <select
                      className="mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none sd-form-select"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                    >
                      <option value="">Select</option>
                      {courses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600">Full name *</label>
                    <input
                      className="mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none sd-form-input"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600">Phone *</label>
                    <div className="mt-2 flex overflow-hidden rounded-xl border">
                      <div className="grid place-items-center bg-slate-50 px-3 text-sm text-slate-700">+91</div>
                      <input
                        className="w-full px-3 py-3 text-sm outline-none sd-form-input"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600">I am *</label>
                    <select
                      className="mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none sd-form-select"
                      value={form.iam}
                      onChange={(e) => setForm({ ...form, iam: e.target.value })}
                    >
                      <option value="">Select</option>
                      {iam.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600">Select specialization *</label>
                    <select
                      className="mt-2 w-full rounded-xl border px-3 py-3 text-sm outline-none sd-form-select"
                      value={form.specialization}
                      onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    >
                      <option value="">Select</option>
                      {specs.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 w-full rounded-xl px-4 py-3 text-sm font-semibold text-black sd-form-submit"
                    style={{
                      background: BRAND.gold,
                      boxShadow: "0 0 18px rgba(245,179,1,0.35)",
                      opacity: submitting ? 0.75 : 1,
                    }}
                  >
                    {submitting ? "Submitting..." : "Get Free Counselling →"}
                  </button>

                  {err ? (
                    <div className="text-sm text-red-600">{err}</div>
                  ) : done ? (
                    <div className="text-sm text-emerald-700">{done}</div>
                  ) : null}
                </form>
</div>
              </div>

              <div className="mt-4 text-xs leading-5" style={{ color: BRAND.text2 }}>
                Professional guidance only. Your details are used for counselling and scheduling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
