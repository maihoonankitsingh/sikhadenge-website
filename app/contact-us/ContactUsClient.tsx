"use client";

import { useMemo, useState, type FormEvent } from "react";
import { trackMetaEvent } from "@/lib/metaPixel";

import { trackEvent } from "@/lib/analytics";
import { CONTACT_FAQS } from "./contactFaqs";
type FormState = {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  category: string;
  message: string;
};

type IconName =
  | "phone"
  | "chat"
  | "mail"
  | "support"
  | "people"
  | "shield"
  | "briefcase"
  | "spark"
  | "arrow"
  | "check";

type IconTone = "blue" | "yellow" | "mint" | "violet";

const CONTACT = {
  phoneDisplay: "+91 8808505575",
  phoneHref: "+918808505575",
  email: "support@sikhadenge.in",
  whatsappNumber: "918808505575",
};

const SPECIALIZATIONS = [
  "Student",
  "Working Professional",
  "Freelancer",
  "Business Owner",
  "Content Creator",
  "Other",
];

const CATEGORIES = [
  "Admissions",
  "Course Details",
  "Learner Support",
  "Corporate Training",
  "Collaboration / Partnership",
  "Billing / Payments",
  "Careers",
  "Other",
];

const FAQS = CONTACT_FAQS;

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  category: "",
  message: "",
};

function LineIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {name === "phone" && (
        <path
          {...common}
          d="M22 16.9v3a2 2 0 0 1-2.2 2c-2.7-.3-5.3-1.2-7.6-2.6a18.6 18.6 0 0 1-5.7-5.7A18.3 18.3 0 0 1 3.1 6.2 2 2 0 0 1 5.1 4h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L9.9 11a16 16 0 0 0 3.1 3.1l.6-.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"
        />
      )}
      {name === "chat" && (
        <>
          <path {...common} d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          <path {...common} d="M8 10h8M8 14h6" />
        </>
      )}
      {name === "mail" && (
        <>
          <rect {...common} x="2" y="5" width="20" height="14" rx="3" />
          <path {...common} d="m3 7 9 7 9-7" />
        </>
      )}
      {name === "support" && (
        <>
          <path {...common} d="M4 14v-4a8 8 0 0 1 16 0v4" />
          <path {...common} d="M4 14a3 3 0 0 0 3 3h1v-6H7a3 3 0 0 0-3 3zM20 14a3 3 0 0 1-3 3h-1v-6h1a3 3 0 0 1 3 3z" />
          <path {...common} d="M16 19c-1 1-2.3 1.5-4 1.5" />
        </>
      )}
      {name === "people" && (
        <>
          <circle {...common} cx="9" cy="8" r="3" />
          <path {...common} d="M3 20v-1a6 6 0 0 1 12 0v1" />
          <path {...common} d="M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6V20" />
        </>
      )}
      {name === "shield" && (
        <>
          <path {...common} d="M12 3 5 6v5c0 4.8 2.7 8.2 7 10 4.3-1.8 7-5.2 7-10V6z" />
          <path {...common} d="m9 12 2 2 4-5" />
        </>
      )}
      {name === "briefcase" && (
        <>
          <rect {...common} x="3" y="7" width="18" height="13" rx="3" />
          <path {...common} d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
        </>
      )}
      {name === "spark" && (
        <>
          <path {...common} d="m12 2 1.4 5.1L18 9l-4.6 1.9L12 16l-1.4-5.1L6 9l4.6-1.9z" />
          <path {...common} d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
        </>
      )}
      {name === "arrow" && (
        <>
          <path {...common} d="M5 12h14" />
          <path {...common} d="m13 6 6 6-6 6" />
        </>
      )}
      {name === "check" && <path {...common} d="m5 12 4 4L19 6" />}
    </svg>
  );
}

const TONES: Record<IconTone, { front: string; shadow: string; glow: string }> = {
  blue: {
    front: "linear-gradient(145deg, #60A5FA 0%, #2563EB 52%, #1D4ED8 100%)",
    shadow: "#173DA8",
    glow: "rgba(37, 99, 235, 0.34)",
  },
  yellow: {
    front: "linear-gradient(145deg, #FFE58A 0%, #F5B301 52%, #D69600 100%)",
    shadow: "#9B6B00",
    glow: "rgba(245, 179, 1, 0.34)",
  },
  mint: {
    front: "linear-gradient(145deg, #6EE7B7 0%, #10B981 52%, #047857 100%)",
    shadow: "#03674D",
    glow: "rgba(16, 185, 129, 0.30)",
  },
  violet: {
    front: "linear-gradient(145deg, #C4B5FD 0%, #8B5CF6 52%, #6D28D9 100%)",
    shadow: "#4C1D95",
    glow: "rgba(139, 92, 246, 0.30)",
  },
};

function Icon3D({ name, tone = "blue", large = false }: { name: IconName; tone?: IconTone; large?: boolean }) {
  const palette = TONES[tone];

  return (
    <span className={`group relative inline-flex shrink-0 ${large ? "h-20 w-20" : "h-14 w-14"}`} aria-hidden="true">
      <span
        className="absolute inset-0 translate-x-1.5 translate-y-2 rounded-[20px]"
        style={{ background: palette.shadow, opacity: 0.9 }}
      />
      <span
        className="relative grid h-full w-full -rotate-3 place-items-center rounded-[20px] border border-white/60 text-white transition duration-300 group-hover:-translate-y-1 group-hover:rotate-0"
        style={{
          background: palette.front,
          boxShadow: `0 14px 28px ${palette.glow}, inset 0 1px 0 rgba(255,255,255,.65), inset 0 -8px 14px rgba(0,0,0,.12)`,
        }}
      >
        <span className="absolute inset-x-2 top-1 h-1/3 rounded-full bg-white/25 blur-sm" />
        <LineIcon name={name} className={large ? "relative h-9 w-9" : "relative h-6 w-6"} />
      </span>
    </span>
  );
}

function ChannelCard({
  href,
  icon,
  tone,
  eyebrow,
  title,
  description,
  external = false,
  className = "",
}: {
  href: string;
  icon: IconName;
  tone: IconTone;
  eyebrow: string;
  title: string;
  description: string;
  external?: boolean;
  className?: string;
}) {
  function track() {
    try {
      trackMetaEvent("Contact");
    } catch {
      // Tracking must never block the contact action.
    }
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={track}
      className={`group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.13)] ${className}`}
    >
      <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100/70 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <Icon3D name={icon} tone={tone} />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
          <p className="mt-1 break-words text-lg font-extrabold text-[#0B1220]">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700">
          <LineIcon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

function TrustItem({ icon, tone, title, text }: { icon: IconName; tone: IconTone; title: string; text: string }) {
  return (
    <div className="flex gap-4 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
      <Icon3D name={icon} tone={tone} />
      <div>
        <h3 className="font-extrabold text-[#0B1220]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function buildWhatsAppUrl(form: FormState) {
  const message = [
    "Hello Sikhadenge Team,",
    "",
    "I have submitted the official contact form.",
    `Name: ${form.name.trim()}`,
    `Phone: +91 ${form.phone.replace(/\D/g, "").slice(-10)}`,
    `Email: ${form.email.trim()}`,
    `Profile: ${form.specialization}`,
    `Category: ${form.category}`,
    `Query: ${form.message.trim()}`,
  ].join("\n");

  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);

  const canSubmit = useMemo(() => {
    const email = form.email.trim();
    const phoneDigits = form.phone.replace(/\D/g, "");

    return (
      form.name.trim().length >= 2 &&
      email.includes("@") &&
      email.includes(".") &&
      phoneDigits.length >= 10 &&
      Boolean(form.specialization) &&
      Boolean(form.category) &&
      form.message.trim().length >= 10
    );
  }, [form]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    const submittedForm = { ...form };

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          source: "contact",
          name: form.name.trim(),
          phone: form.phone.trim(),
          course: form.category,
          page: "/contact-us",
          message: [
            `Email: ${form.email.trim()}`,
            `Profile: ${form.specialization}`,
            `Category: ${form.category}`,
            `Query: ${form.message.trim()}`,
          ].join("\n"),
          email: form.email.trim(),
          specialization: form.specialization,
          category: form.category,
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      try {
        trackMetaEvent("Contact");
      } catch {
        // Tracking must never block the success state.
      }

        try {
          trackEvent({
                    action: "generate_lead",
                    category: "lead",
                    label: "contact-us-form",
                    page_path: "/contact-us",
                  });
        } catch {
          // Analytics tracking must never block the success state.
        }

      const whatsappUrl = buildWhatsAppUrl(submittedForm);

      setForm(EMPTY_FORM);
      setStatus({
        ok: true,
        message: "Your enquiry is saved. Opening WhatsApp with the same details...",
      });

      window.setTimeout(() => {
        window.location.assign(whatsappUrl);
      }, 450);
    } catch {
      setStatus({
        ok: false,
        message: `Submission failed. Please call ${CONTACT.phoneDisplay} or email ${CONTACT.email}.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main data-contact-redesign="v2" className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0B1220]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.14),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(245,179,1,0.18),transparent_30%)]" />

      <section className="relative px-4 pb-14 pt-8 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm font-semibold text-slate-500">
            <a href="/" className="transition hover:text-blue-700">Home</a>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page" className="text-slate-800">Contact us</span>
          </nav>

          <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-[#0B1220] shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.45),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(245,179,1,0.25),transparent_25%)]" />
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:34px_34px]" />

            <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 xl:grid-cols-[1.18fr_0.82fr] xl:items-center xl:px-14 xl:py-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#F5B301] shadow-[0_0_14px_rgba(245,179,1,.9)]" />
                  Official Sikhadenge support
                </div>

                <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                  Talk to the team that can move your query forward.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Contact Sikhadenge for course counselling, admissions, learner support, corporate training, partnerships, billing, or career-related questions.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B301] px-6 py-3.5 text-sm font-extrabold text-[#0B1220] shadow-[0_14px_34px_rgba(245,179,1,.28)] transition hover:-translate-y-0.5 hover:bg-[#FFD34F]"
                  >
                    Send your query
                    <LineIcon name="arrow" className="h-4 w-4" />
                  </a>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    Form to WhatsApp
                    <LineIcon name="chat" className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                  {[
                    "Official contact channels",
                    "English and Hindi support",
                    "Human-reviewed enquiries",
                  ].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                        <LineIcon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative rounded-[30px] border border-white/15 bg-white/10 p-5 shadow-[0_28px_70px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Contact hub</p>
                      <p className="mt-1 text-xl font-black text-white">Choose the right channel</p>
                    </div>
                    <Icon3D name="support" tone="blue" large />
                  </div>

                  <div className="mt-6 grid gap-3">
                    {[
                      { icon: "phone" as IconName, tone: "yellow" as IconTone, label: "Call", value: CONTACT.phoneDisplay },
                      { icon: "chat" as IconName, tone: "mint" as IconTone, label: "WhatsApp", value: "Opens after form submission" },
                      { icon: "mail" as IconName, tone: "violet" as IconTone, label: "Email", value: CONTACT.email },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-[#0B1220]/45 p-4">
                        <Icon3D name={item.icon} tone={item.tone} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                          <p className="mt-1 break-words font-bold text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-channels-heading" className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Direct contact</p>
            <h2 id="contact-channels-heading" className="mt-3 text-3xl font-black tracking-[-0.025em] sm:text-4xl">
              Use the channel that fits your query.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Call or email directly, or submit the form once to save your enquiry and continue automatically on WhatsApp.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ChannelCard
              href={`tel:${CONTACT.phoneHref}`}
              icon="phone"
              tone="yellow"
              eyebrow="Call"
              title={CONTACT.phoneDisplay}
              description="For direct course counselling and support conversations."
            />
            <ChannelCard
              href="#contact-form"
              icon="chat"
              tone="mint"
              eyebrow="Form to WhatsApp"
              title="Submit once, continue there"
              description="Your enquiry is saved first; WhatsApp then opens with the same details pre-filled."
            />
            <ChannelCard
              href={`mailto:${CONTACT.email}`}
              icon="mail"
              tone="violet"
              eyebrow="Email"
              title={CONTACT.email}
              description="Best for detailed support, partnership, billing, or documentation queries."
              className="md:col-span-2 xl:col-span-1"
            />
          </div>
        </div>
      </section>

      <section id="contact-form" aria-labelledby="contact-form-heading" className="scroll-mt-24 border-y border-slate-200 bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
          <div className="xl:sticky xl:top-24">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Contact form</p>
            <h2 id="contact-form-heading" className="mt-3 text-3xl font-black tracking-[-0.025em] sm:text-4xl">
              Tell us what you need.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Add enough context for the Sikhadenge team to understand your query and route it correctly.
            </p>

            <div className="mt-8 space-y-4">
              <TrustItem icon="people" tone="blue" title="Human-reviewed" text="Your submission is reviewed by the Sikhadenge team, not published publicly." />
              <TrustItem icon="briefcase" tone="yellow" title="Clear routing" text="Select a category so your query can reach the relevant support or counselling workflow." />
              <TrustItem icon="shield" tone="mint" title="Share safely" text="Do not include passwords, OTPs, card PINs, or other sensitive authentication information." />

              {/* CONTACT_LEFT_COLUMN_BALANCE_CARDS_V2 */}
              <TrustItem icon="support" tone="violet" title="Enquiry saved first" text="Your request is recorded before WhatsApp opens, so the support team does not lose your enquiry." />

              <TrustItem icon="shield" tone="blue" title="Context-ready follow-up" text="Your profile, category, and message help the team reply with the relevant course or support information." />
            </div>

          </div>

          <form data-whatsapp-flow="after-form-submit" onSubmit={onSubmit} className="min-w-0 rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8" noValidate>
            <div className="flex items-start justify-between gap-5 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-xl font-black">Send an official enquiry</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Fields marked with * are required.</p>
              </div>
              <Icon3D name="spark" tone="blue" />
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-800">Full name *</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-[#0B1220] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-800">Email address *</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-[#0B1220] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-800">Phone number *</span>
                <div className="mt-2 flex rounded-2xl border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <span className="grid place-items-center border-r border-slate-200 px-4 text-sm font-bold text-slate-600">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    required
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="10-digit number"
                    className="min-w-0 flex-1 rounded-r-2xl bg-transparent px-4 py-3.5 text-sm text-[#0B1220] outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-800">You are a *</span>
                <select
                  name="specialization"
                  required
                  value={form.specialization}
                  onChange={(event) => setForm((current) => ({ ...current, specialization: event.target.value }))}
                  className="mt-2 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-[#0B1220] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select your profile</option>
                  {SPECIALIZATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-slate-800">Query category *</span>
                <select
                  name="category"
                  required
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="mt-2 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-[#0B1220] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-slate-800">How can we help? *</span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Describe your question, course interest, support issue, or partnership requirement."
                  className="mt-2 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm leading-6 text-[#0B1220] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-950">
              Your enquiry is saved first. After successful submission, WhatsApp opens automatically with the same details pre-filled for you to review and send.
            </div>

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-4 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(37,99,235,.24)] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Saving enquiry..." : "Submit & open WhatsApp"}
              {!submitting && <LineIcon name="arrow" className="h-4 w-4" />}
            </button>

            <div aria-live="polite" className="mt-4 min-h-6">
              {status && (
                <p className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${status.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>

          {/* CONTACT_FULL_WIDTH_NEXT_STEPS_V1 */}
          <div data-contact-next-steps="full-width" className="relative overflow-hidden rounded-[30px] bg-[#0B1220] p-6 text-white shadow-[0_22px_60px_rgba(15,23,42,0.18)] sm:p-7 xl:col-span-2">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/25 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F5B301]">What happens next</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.02em]">One form. Clear handoff.</h3>

              <div className="mt-6 space-y-5">
                {[
                  ["1", "Enquiry saved", "Your details are first submitted to Sikhadenge's official lead workflow."],
                  ["2", "WhatsApp opens", "The same enquiry is prepared as a pre-filled WhatsApp message."],
                  ["3", "Conversation continues", "Review the message, send it, and continue with the team in WhatsApp."],
                ].map(([step, title, text]) => (
                  <div key={step} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-sm font-black text-blue-200 ring-1 ring-white/10">
                      {step}
                    </span>
                    <div>
                      <p className="font-extrabold">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-[22px] border border-white/10 bg-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Support hours</p>
                  <p className="mt-1 font-extrabold">10:00 AM – 7:00 PM</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.8)]" />
                  Official workflow
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">Trust and clarity</p>
              <h2 id="trust-heading" className="mt-3 text-3xl font-black tracking-[-0.025em] sm:text-4xl">
                Know who receives your enquiry.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Sikhadenge is an AI and skill learning platform associated with ThinkGrow Pvt. Ltd. This official page is intended for learner, counselling, support, partnership, and business enquiries.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <TrustItem icon="support" tone="blue" title="Official support" text="The page publishes a consistent phone number and email address for Sikhadenge enquiries." />
              <TrustItem icon="people" tone="violet" title="Relevant context" text="Your selected profile, category, and message help the team understand the reason for contact." />
              <TrustItem icon="briefcase" tone="yellow" title="Business enquiries" text="Corporate training, campus tie-ups, workshops, and collaboration requests can be submitted here." />
              <TrustItem icon="shield" tone="mint" title="Security reminder" text="Sikhadenge does not need your password, OTP, or card PIN to review a general contact request." />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-faq-heading"
        data-contact-faq-style="home-light"
        className="border-y border-slate-200 bg-[#F6F8FC] px-4 py-10 sm:px-6 md:py-12 lg:px-8"
      >
        {/* CONTACT_HOME_STYLE_FAQ_V1 */}
        {/* CONTACT_FAQ_COMPACT_LAYOUT_V2 */}
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
              FAQs
            </span>

            <h2
              id="contact-faq-heading"
              className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl"
            >
              Frequently asked questions
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Find clear answers about contacting Sikhadenge, course counselling, learner support, partnerships, and the form-to-WhatsApp workflow.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.03)] transition open:border-blue-200 open:shadow-[0_8px_22px_rgba(37,99,235,0.07)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold leading-6 text-slate-900 outline-none sm:px-6 sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600 transition duration-300 group-open:rotate-180 group-open:border-blue-200 group-open:bg-blue-50">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="m7 10 5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-6 text-slate-600 sm:px-6 sm:pb-6 sm:text-[15px] sm:leading-7">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[30px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#FFFFFF_48%,#FFF8DC_100%)] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-9 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">Structured WhatsApp handoff</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] sm:text-3xl">Submit once, then continue on WhatsApp.</h2>
            <p className="mt-2 text-slate-600">The form saves your enquiry first and opens WhatsApp with the same context.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={`tel:${CONTACT.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1220] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5">
              <LineIcon name="phone" className="h-4 w-4" />
              Call now
            </a>
            <a href="#contact-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]">
              <LineIcon name="chat" className="h-4 w-4" />
              Fill form & continue
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
