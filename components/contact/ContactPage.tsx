"use client";

import { useMemo, useState } from "react";
import styles from "./contact.module.css";
import {
  Phone,
  Mail,
  GraduationCap,
  Users,
  Handshake,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phoneCountry: string;
  phone: string;
  specialization: string;
  category: string;
  message: string;
};

const SPECIALIZATIONS = [
  "Graphic Design",
  "Video Editing",
  "Motion Graphics",
  "AI Tools",
  "Admissions / Counselling",
  "Support",
  "Other",
];

const CATEGORIES = [
  "Course / Batch Query",
  "Admissions / Fee / Payment",
  "Support / Login / Access",
  "Corporate / Workshop",
  "Become an Instructor",
  "Jobs / Hiring",
  "Influencer Collaboration",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phoneCountry: "+91",
    phone: "",
    specialization: "",
    category: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (form.phone && !/^[0-9]{8,15}$/.test(form.phone)) e.phone = "Invalid number";
    if (!form.specialization) e.specialization = "Required";
    if (!form.category) e.category = "Required";
    if (!form.message.trim()) e.message = "Required";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "submitting";

  function onChange<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    if (status !== "idle") setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    try {
      // Real submit (optional): create /api/contact and uncomment below
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Request failed");

      await new Promise((r) => setTimeout(r, 550)); // UI-only fallback
      setStatus("success");
      setForm((p) => ({ ...p, message: "" }));
    } catch {
      setStatus("error");
    }
  }

  function scrollToForm() {
    const el = document.getElementById("contact-form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className={styles.page}>
      <div className={styles.bgOrbs} aria-hidden="true">
        <span className={styles.orbA} />
        <span className={styles.orbB} />
        <span className={styles.orbC} />
      </div>

      <section className={styles.sectionTop}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.heroCard}>
              <div className={styles.brandRow}>
                <div className={styles.brand}>Sikhadenge</div>
                <div className={styles.badge}>NEED HELP?</div>
              </div>

              <h1 className={styles.h1}>
                Write to <span className={styles.gold}>Sikhadenge</span>
              </h1>
              <p className={styles.sub}>
                Share your query. Our team will review and respond via call/WhatsApp.
              </p>

              <div className={styles.contactTiles}>
                <a className={styles.tile} href="tel:+918808505575">
                  <div className={styles.tileIcon}>
                    <Phone size={18} />
                  </div>
                  <div className={styles.tileText}>
                    <div className={styles.tileTitle}>Call</div>
                    <div className={styles.tileValue}>+91 8808505575</div>
                  </div>
                </a>

                <a className={styles.tile} href="mailto:support@sikhadenge.in">
                  <div className={styles.tileIcon}>
                    <Mail size={18} />
                  </div>
                  <div className={styles.tileText}>
                    <div className={styles.tileTitle}>Email</div>
                    <div className={styles.tileValue}>support@sikhadenge.in</div>
                  </div>
                </a>
              </div>

              <div className={styles.parent}>Parent company: ThinkGrow Pvt Ltd.</div>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.workshopTop}>
                <div className={styles.workshopIcon} aria-hidden="true">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className={styles.workshopTitle}>CORPORATE / WORKSHOP</div>
                  <div className={styles.workshopSub}>
                    For training / collaboration queries, use the form category.
                  </div>
                </div>
              </div>

              <button type="button" className={styles.goBtn} onClick={scrollToForm}>
                Go to form <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className={styles.right} id="contact-form">
            <div className={styles.formWrap}>
              <div className={styles.formHeader}>
                <div className={styles.formTitle}>Contact Form</div>
                <div className={styles.formHint}>
                  Fill this form and our team will review and respond.
                </div>
              </div>

              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <Field
                  label="Name"
                  required
                  value={form.name}
                  placeholder="Your name"
                  error={errors.name}
                  onChange={(v) => onChange("name", v)}
                />
                <Field
                  label="Email"
                  required
                  value={form.email}
                  placeholder="you@example.com"
                  error={errors.email}
                  onChange={(v) => onChange("email", v)}
                />

                <div className={styles.row2}>
                  <div>
                    <Label label="Phone" required />
                    <div className={styles.phoneRow}>
                      <select
                        className={styles.select}
                        value={form.phoneCountry}
                        onChange={(e) => onChange("phoneCountry", e.target.value)}
                        aria-label="Country code"
                      >
                        <option value="+91">IN +91</option>
                        <option value="+1">US +1</option>
                        <option value="+44">UK +44</option>
                        <option value="+971">UAE +971</option>
                      </select>
                      <input
                        className={styles.input}
                        value={form.phone}
                        onChange={(e) =>
                          onChange("phone", e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="10-digit number"
                        inputMode="numeric"
                      />
                    </div>
                    {errors.phone ? (
                      <div className={styles.error}>{errors.phone}</div>
                    ) : null}
                  </div>
                </div>

                <div className={styles.row2}>
                  <div>
                    <Label label="Select Specialization" required />
                    <select
                      className={styles.select}
                      value={form.specialization}
                      onChange={(e) => onChange("specialization", e.target.value)}
                    >
                      <option value="">Select specialization</option>
                      {SPECIALIZATIONS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                    {errors.specialization ? (
                      <div className={styles.error}>{errors.specialization}</div>
                    ) : null}
                  </div>

                  <div>
                    <Label label="Select Category" required />
                    <select
                      className={styles.select}
                      value={form.category}
                      onChange={(e) => onChange("category", e.target.value)}
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                    {errors.category ? (
                      <div className={styles.error}>{errors.category}</div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <Label label="Your Message" required />
                  <textarea
                    className={styles.textarea}
                    value={form.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    placeholder="Type your message"
                    rows={6}
                  />
                  {errors.message ? (
                    <div className={styles.error}>{errors.message}</div>
                  ) : null}
                </div>

                <button className={styles.submit} type="submit" disabled={!canSubmit}>
                  {status === "submitting" ? "Submitting..." : "Submit"}
                  <ArrowRight size={16} />
                </button>

                <div className={styles.legal}>
                  By submitting, you agree to Sikhadenge’s{" "}
                  <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                </div>

                {status === "success" ? (
                  <div className={styles.success}>Submitted. Our team will contact you.</div>
                ) : null}
                {status === "error" ? (
                  <div className={styles.fail}>Failed to submit. Try again or call/email.</div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionMid}>
        <div className={styles.quickGrid}>
          <QuickCard
            icon={<GraduationCap size={18} />}
            title="Become an instructor"
            desc="Teaching / mentoring queries"
            onClick={scrollToForm}
          />
          <QuickCard
            icon={<Users size={18} />}
            title="Join our team"
            desc="Hiring / openings"
            onClick={scrollToForm}
          />
          <QuickCard
            icon={<Handshake size={18} />}
            title="Influencer collaboration"
            desc="Partnership requests"
            onClick={scrollToForm}
          />
        </div>
      </section>

      <section className={styles.sectionBottom}>
        <div className={styles.bottomCard}>
          <div className={styles.bottomLeft}>
            <div className={styles.bottomTitle}>Didn't find what you were looking for?</div>
            <div className={styles.bottomSub}>
              Use the Contact Form and select the closest category.
            </div>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.smallTile}>
              <div className={styles.smallIcon}>
                <Phone size={18} />
              </div>
              <div>
                <div className={styles.smallTitle}>Call</div>
                <div className={styles.smallValue}>+91 8808505575 (Admissions)</div>
                <div className={styles.smallValue}>+91 8808505575 (Support)</div>
              </div>
            </div>

            <div className={styles.smallTile}>
              <div className={styles.smallIcon}>
                <Mail size={18} />
              </div>
              <div>
                <div className={styles.smallTitle}>Email</div>
                <div className={styles.smallValue}>support@sikhadenge.in</div>
              </div>
            </div>

            <div className={styles.parent2}>Parent company: ThinkGrow Pvt Ltd.</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Label({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className={styles.labelRow}>
      <label className={styles.label}>
        {label} {required ? <span className={styles.req}>*</span> : null}
      </label>
    </div>
  );
}

function Field({
  label,
  required,
  value,
  placeholder,
  error,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label label={label} required={required} />
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
}

function QuickCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.quickCard} onClick={onClick}>
      <div className={styles.quickIcon}>{icon}</div>
      <div className={styles.quickTitle}>{title}</div>
      <div className={styles.quickDesc}>{desc}</div>
      <div className={styles.quickArrow} aria-hidden="true">
        <ArrowRight size={16} />
      </div>
    </button>
  );
}
