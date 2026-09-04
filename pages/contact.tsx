// pages/contact.tsx
import Head from "next/head";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  category: string;
  message: string;
};

const SPECIALIZATIONS = [
  "Student",
  "Working Professional",
  "Freelancer",
  "Business Owner",
  "Other",
];

const CATEGORIES = [
  "Admissions",
  "Course Details",
  "Support",
  "Hiring / Careers",
  "Collaboration",
  "Billing / Payments",
  "Other",
];

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function Icon({
  name,
  className,
}: {
  name:
    | "phone"
    | "mail"
    | "briefcase"
    | "cap"
    | "users"
    | "chat"
    | "spark"
    | "arrow";
  className?: string;
}) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "phone":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M22 16.9v3a2 2 0 0 1-2.2 2c-2.7-.3-5.3-1.2-7.6-2.6a18.6 18.6 0 0 1-5.7-5.7A18.3 18.3 0 0 1 3.1 6.2 2 2 0 0 1 5.1 4h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L9.9 11a16 16 0 0 0 3.1 3.1l.6-.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          <path {...common} d="m22 8-10 7L2 8" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
          <path {...common} d="M4 7h16a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z" />
          <path {...common} d="M8 12h8" />
        </svg>
      );
    case "cap":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M22 10 12 5 2 10l10 5 10-5z" />
          <path {...common} d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <path {...common} d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path {...common} d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path {...common} d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "chat":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          <path {...common} d="M8 10h8M8 14h6" />
        </svg>
      );
    case "spark":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 2l1.4 5.2L18 9l-4.6 1.8L12 16l-1.4-5.2L6 9l4.6-1.8L12 2z" />
          <path {...common} d="M19 13l.9 3.2L23 17l-3.1.8L19 21l-.9-3.2L15 17l3.1-.8L19 13z" />
        </svg>
      );
    case "arrow":
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M5 12h12" />
          <path {...common} d="m13 6 6 6-6 6" />
        </svg>
      );
  }
}

function useOutsideClick(
  refs: React.RefObject<HTMLElement | null>[],
  onOutside: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside = refs.some((r) => r.current && r.current.contains(t));
      if (!inside) onOutside();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [enabled, refs, onOutside]);
}

function DarkSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useOutsideClick([wrapRef], () => setOpen(false), open);

  return (
    <div className="relative" ref={wrapRef}>
      <div className="text-xs tracking-[0.18em] uppercase text-[#9CA3AF]">
        {label} <span className="text-[#B0B7C3]">*</span>
      </div>

      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={cx(
          "mt-2 w-full rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 text-left text-sm text-white",
          "outline-none focus:border-white/20 focus:ring-2 focus:ring-[#2563EB]/35"
        )}
      >
        <span className={cx(!value && "text-[#9CA3AF]")}>
          {value || placeholder}
        </span>
        <span className="pointer-events-none absolute right-3 top-[42px] grid h-9 w-9 place-items-center text-[#B0B7C3]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className={cx(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10",
            "bg-[#111827]/95 backdrop-blur shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
          )}
        >
          <div className="max-h-60 overflow-auto p-1">
            {options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cx(
                  "w-full rounded-xl px-3 py-2 text-left text-sm",
                  opt === value
                    ? "bg-white/10 text-white"
                    : "text-[#B0B7C3] hover:bg-white/5 hover:text-white"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  // contact details (avoid repeating numbers elsewhere)
  const supportEmail = "support@sikhadenge.in";
  const primaryPhone = "+91 8808505575";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    category: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );

  const canSubmit = useMemo(() => {
    const nameOk = form.name.trim().length > 1;
    const emailOk =
      form.email.trim().includes("@") && form.email.trim().includes(".");
    const phoneDigits = form.phone.replace(/\D/g, "");
    const phoneOk = phoneDigits.length >= 10;
    const specOk = !!form.specialization;
    const catOk = !!form.category;
    const msgOk = form.message.trim().length >= 5;
    return nameOk && emailOk && phoneOk && specOk && catOk && msgOk;
  }, [form]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setStatus(null);

    try {
      // Uses existing route in your app: /api/leads
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          ...form,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus({ ok: true, msg: "Submitted. Our team will respond within 24 hours." });
      setForm({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        category: "",
        message: "",
      });
    } catch {
      setStatus({ ok: false, msg: "Submit failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Contact | Sikhadenge</title>
      </Head>

      <main className="min-h-screen bg-[#0B1220] text-white pt-[88px]">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* HERO (fixed text visibility) */}
              <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(/images/contact/contact-hero-student.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* stronger readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/95 via-[#0B1220]/85 to-[#0B1220]/55" />
                <div className="absolute inset-0 bg-black/25" />

                <div className="relative p-8 sm:p-10">
                  {/* glass panel behind text */}
                  <div className="max-w-[640px] rounded-3xl border border-white/10 bg-[#0B1220]/58 backdrop-blur-md p-6 sm:p-8 shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
                    <div className="text-[11px] tracking-[0.22em] text-white/80 uppercase">
                      NEED HELP?
                    </div>

                    <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.85)]">
                      <span className="text-white">Write to </span>
                      <span className="text-[#F5B301] drop-shadow-[0_0_18px_rgba(245,179,1,0.55)]">
                        Sikhadenge
                      </span>
                    </h1>

                    <p className="mt-3 max-w-xl text-white/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                      Share your query. Our team will review and respond via
                      call/WhatsApp.
                    </p>

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0B1220]/42 px-5 py-4 transition hover:bg-white/5"
                      >
                        <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#111827]/40">
                          <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(37,99,235,0.55)] motion-safe:animate-pulse" />
                          <span className="relative text-[#2563EB]">
                            <Icon name="phone" className="h-5 w-5" />
                          </span>
                        </span>
                        <span>
                          <div className="text-sm font-semibold text-white">
                            Call
                          </div>
                          <div className="text-sm text-[#B0B7C3]">
                            {primaryPhone}
                          </div>
                        </span>
                      </a>

                      <a
                        href={`mailto:${supportEmail}`}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0B1220]/42 px-5 py-4 transition hover:bg-white/5"
                      >
                        <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#111827]/40">
                          <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(245,179,1,0.55)] motion-safe:animate-pulse" />
                          <span className="relative text-[#F5B301]">
                            <Icon name="mail" className="h-5 w-5" />
                          </span>
                        </span>
                        <span>
                          <div className="text-sm font-semibold text-white">
                            Email
                          </div>
                          <div className="text-sm text-[#B0B7C3]">
                            {supportEmail}
                          </div>
                        </span>
                      </a>
                    </div>

                    <div className="mt-5 text-xs text-[#9CA3AF]">
                      Parent company: ThinkGrow Pvt. Ltd.
                    </div>
                  </div>
                </div>
              </section>
 
            {/* Corporate / workshop card */}
              <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(/images/contact/workshop-classroom.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* stronger overlay for visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/96 via-[#0B1220]/85 to-[#0B1220]/55" />
                <div className="absolute inset-0 bg-black/25" />

                <div className="relative p-6 sm:p-7">
                  {/* glass panel behind text */}
                  <div className="max-w-[520px] rounded-2xl border border-white/10 bg-[#0B1220]/55 backdrop-blur-md p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                    <div className="flex items-start gap-4">
                      <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#111827]/45">
                        <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(37,99,235,0.55)] motion-safe:animate-pulse" />
                        <span className="relative text-[#2563EB]">
                          <Icon name="briefcase" className="h-5 w-5" />
                        </span>
                      </span>

                      <div className="flex-1">
                        <div className="text-[11px] tracking-[0.22em] uppercase text-white/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                          CORPORATE / WORKSHOP
                        </div>
                        <div className="mt-1 text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                          For training / collaboration queries, use the form
                          category.
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("contact-form")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220]/55 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
                        >
                          Go to form
                          <Icon name="arrow" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              
              {/* Collaboration / Tie-up (dark brand, no white strip) */}
              <section className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="relative mt-1 h-10 w-[6px] rounded-full bg-[#2563EB] shadow-[0_0_18px_rgba(37,99,235,0.55)]" />
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white">
                      Collaboration/Tie-up
                    </div>
                    <div className="mt-2 max-w-xl text-sm text-[#B0B7C3]">
                      For partnership, campus tie-ups, workshops or corporate
                      training — select <span className="text-white">“Collaboration”</span> in the form.
                    </div>
                  </div>
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0B1220]/40">
                    <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(245,179,1,0.55)] motion-safe:animate-pulse" />
                    <span className="relative text-[#F5B301]">
                      <Icon name="spark" className="h-5 w-5" />
                    </span>
                  </span>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN (FORM) */}
            <section
              id="contact-form"
              className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">
                    Contact Form
                  </div>
                  <div className="mt-1 text-sm text-[#B0B7C3]">
                    Fill this form and our team will review and respond.
                  </div>
                </div>
                <span className="h-9 w-9 rounded-full border border-white/10 bg-[#0B1220]/35" />
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-[#9CA3AF]">
                    NAME <span className="text-[#B0B7C3]">*</span>
                  </div>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 text-sm text-white placeholder-[#6B7280] outline-none focus:border-white/20 focus:ring-2 focus:ring-[#2563EB]/35"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-[#9CA3AF]">
                    EMAIL <span className="text-[#B0B7C3]">*</span>
                  </div>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 text-sm text-white placeholder-[#6B7280] outline-none focus:border-white/20 focus:ring-2 focus:ring-[#2563EB]/35"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-[#9CA3AF]">
                    PHONE <span className="text-[#B0B7C3]">*</span>
                  </div>
                  <div className="mt-2 grid grid-cols-[92px_1fr] gap-3">
                    <div className="rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 text-sm text-white/85">
                      IN +91
                    </div>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 text-sm text-white placeholder-[#6B7280] outline-none focus:border-white/20 focus:ring-2 focus:ring-[#2563EB]/35"
                      placeholder="10-digit number"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                {/* Custom dark dropdowns (fixes white dropdown issue) */}
                <DarkSelect
                  label="SELECT SPECIALIZATION"
                  placeholder="Select specialization"
                  value={form.specialization}
                  options={SPECIALIZATIONS}
                  onChange={(v) => setForm((p) => ({ ...p, specialization: v }))}
                />

                <DarkSelect
                  label="SELECT CATEGORY"
                  placeholder="Select category"
                  value={form.category}
                  options={CATEGORIES}
                  onChange={(v) => setForm((p) => ({ ...p, category: v }))}
                />

                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-[#9CA3AF]">
                    YOUR MESSAGE <span className="text-[#B0B7C3]">*</span>
                  </div>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="mt-2 h-32 w-full resize-none rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 text-sm text-white placeholder-[#6B7280] outline-none focus:border-white/20 focus:ring-2 focus:ring-[#2563EB]/35"
                    placeholder="Type your message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className={cx(
                    "mt-2 w-full rounded-2xl px-5 py-3 text-sm font-semibold",
                    "bg-[#8A6A10] text-[#0B1220] shadow-[0_0_18px_rgba(245,179,1,0.35)]",
                    "hover:bg-[#F5B301] hover:shadow-[0_0_18px_rgba(245,179,1,0.55)]",
                    (!canSubmit || submitting) &&
                      "opacity-60 cursor-not-allowed hover:bg-[#8A6A10]"
                  )}
                >
                  {submitting ? "Submitting..." : "Submit →"}
                </button>

                <div className="text-[11px] text-[#9CA3AF]">
                  By submitting, you agree to Sikhadenge’s{" "}
                  <a className="text-white/85 underline" href="/terms">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a className="text-white/85 underline" href="/privacy-policy">
                    Privacy Policy
                  </a>
                  .
                </div>

                {status && (
                  <div
                    className={cx(
                      "rounded-2xl border px-4 py-3 text-sm",
                      status.ok
                        ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                        : "border-red-400/25 bg-red-400/10 text-red-200"
                    )}
                  >
                    {status.msg}
                  </div>
                )}
              </form>
            </section>
          </div>

          {/* 3 CARDS (full, not mini) */}
          <section className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0B1220]/40">
                  <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(245,179,1,0.55)] motion-safe:animate-pulse" />
                  <span className="relative text-[#F5B301]">
                    <Icon name="cap" className="h-5 w-5" />
                  </span>
                </span>
                <span className="text-[#9CA3AF]">
                  <Icon name="arrow" className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 text-lg font-semibold">Become an instructor</div>
              <div className="mt-1 text-sm text-[#B0B7C3]">
                Teaching / mentoring queries
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0B1220]/40">
                  <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(37,99,235,0.55)] motion-safe:animate-pulse" />
                  <span className="relative text-[#2563EB]">
                    <Icon name="users" className="h-5 w-5" />
                  </span>
                </span>
                <span className="text-[#9CA3AF]">
                  <Icon name="arrow" className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 text-lg font-semibold">Join our team</div>
              <div className="mt-1 text-sm text-[#B0B7C3]">
                Hiring / openings
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0B1220]/40">
                  <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(245,179,1,0.55)] motion-safe:animate-pulse" />
                  <span className="relative text-[#F5B301]">
                    <Icon name="chat" className="h-5 w-5" />
                  </span>
                </span>
                <span className="text-[#9CA3AF]">
                  <Icon name="arrow" className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-5 text-lg font-semibold">
                Influencer collaboration
              </div>
              <div className="mt-1 text-sm text-[#B0B7C3]">
                Partnership requests
              </div>
            </div>
          </section>

          {/* "Didn't find..." + Response card */}
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-7">
              <div className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Didn&apos;t find what you were looking for?
              </div>
              <div className="mt-3 text-sm text-[#B0B7C3]">
                Use the Contact Form and select the closest category.
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur p-7">
              <div className="flex items-center gap-3">
                <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#0B1220]/40">
                  <span className="absolute inset-0 rounded-2xl shadow-[0_0_18px_rgba(37,99,235,0.55)] motion-safe:animate-pulse" />
                  <span className="relative text-[#2563EB]">
                    <Icon name="spark" className="h-5 w-5" />
                  </span>
                </span>
                <div>
                  <div className="font-semibold">Response</div>
                  <div className="text-sm text-[#B0B7C3]">
                    We usually reply within 24 hours.
                  </div>
                </div>
              </div>

              <div className="mt-5 text-xs text-[#9CA3AF]">
                Parent company: ThinkGrow Pvt. Ltd.
              </div>
            </div>
          </section>

          {/* Blue banner + Zoom mosaic image */}
          <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/35 backdrop-blur">
            <div className="grid lg:grid-cols-2">
              <div className="bg-[#1D4ED8] p-8 sm:p-10">
                <div className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  If you want to know about{" "}
                  <span className="text-[#F5B301]">online courses</span> or{" "}
                  <span className="text-[#F5B301]">cohorts</span> then you can
                  contact us from here.
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("contact-form")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-left hover:bg-white/15"
                  >
                    <div className="text-xs text-white/80">Use Contact Form</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Select correct category
                    </div>
                  </button>

                  <a
                    href={`mailto:${supportEmail}`}
                    className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-left hover:bg-white/15"
                  >
                    <div className="text-xs text-white/80">Email</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {supportEmail}
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative min-h-[260px]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(/images/contact/zoom-mosaic-03.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/25 via-transparent to-transparent" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

