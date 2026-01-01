import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles/counselling.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ICONS = {
  box: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 3.5 6.2v11.6L12 22l8.5-4.2V6.2L12 2Zm6.5 6.3-6.5 3.2-6.5-3.2L12 5.1l6.5 3.2ZM5.5 9.6l5.5 2.7V19l-5.5-2.7V9.6Zm13 0v6.7L13 19v-6.7l5.5-2.7Z"
      />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"
      />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.7 3.2 3.4 4.9 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.7 3.8.7.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.1 22 2 13.9 2 3c0-.6.4-1 1-1h3.8c.6 0 1 .4 1 1 0 1.3.2 2.6.7 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"
      />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.6 13.3 13.3 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.5a2 2 0 0 1 0 2.8ZM7.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.8V17c0 1.7 3 3 6 3s6-1.3 6-3v-4.2l-6 3.2-6-3.2Z"
      />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 1 8l11 6 11-6-11-6Zm0 9.7L4.5 8 12 4.3 19.5 8 12 11.7ZM1 12l3.1-1.7L12 14.7l7.9-4.4L23 12l-11 6-11-6Zm0 5 3.1-1.7L12 19.7l7.9-4.4L23 17l-11 6-11-6Z"
      />
    </svg>
  ),
};

export default function CounsellingModal({ open, onClose }: Props) {
  const [course, setCourse] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [iam, setIam] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [specialization, setSpecialization] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const COURSE_OPTIONS = useMemo(
    () => [
      "AI Powered Graphic Design",
      "AI Powered Video Editing",
      "AI Powered Graphic Design & Video Editing",
      "AI Mastery in Design and Editing",
    ],
    []
  );


  const IAM_OPTIONS = useMemo(
    () => ["Student", "Working professional", "Business / Freelancer"],
    []
  );

  const LEVEL_OPTIONS = useMemo(() => ["Beginner", "Intermediate", "Advanced"], []);
  const SPECIALIZATION_OPTIONS = useMemo(
    () => ["Graphic Design", "Video Editing", "Motion Graphics", "AI Tools"],
    []
  );

  useEffect(() => {
    if (!open) return;
    setError(null);
    setSubmitted(false);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const phoneOk = /^\d{10}$/.test(phone.trim());
  const canSubmit =
    course.trim() &&
    fullName.trim().length >= 2 &&
    phoneOk &&
    iam.trim() &&
    specialization.trim() &&
    !submitting;

  function validateOrSetError(): boolean {
    const missing: string[] = [];
    if (!course.trim()) missing.push("Course");
    if (fullName.trim().length < 2) missing.push("Full name");
    if (!phoneOk) missing.push("Phone (10 digits)");
    if (!iam.trim()) missing.push("I am");
    if (!specialization.trim()) missing.push("Specialization");

    if (missing.length) {
      setError(`Please fill: ${missing.join(", ")}.`);
      return false;
    }
    return true;
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateOrSetError()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          promoCode: promoCode.trim() ? promoCode.trim().toUpperCase() : undefined,
          source: "website-modal",
          notes: {
            page: "counselling-modal",
            course,
            iam,
            level,
            specialization,
          },
        }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "Request failed");
      }

      setSubmitted(true);
      setFullName("");
      setPhone("");
      setPromoCode("");
      setCourse("");
      setIam("");
      setLevel("Beginner");
      setSpecialization("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Counselling form">
      <button className={styles.backdrop} onClick={onClose} aria-label="Close overlay" />
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close form">
          <span aria-hidden>×</span>
        </button>

        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            FIRST CALL IS ON US
          </div>

          <h2 className={styles.title}>Schedule a 1:1 counselling call.</h2>

          <ul className={styles.points}>
            <li>AI Powered Graphic Design track</li>
            <li>AI Powered Video Editing track</li>
            <li>Combined track: Design + Editing</li>
          </ul>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={submitLead}>
            <div className={styles.field}>
              <label className={styles.label}>Course interested in *</label>
              <div className={styles.control}>
                <span className={styles.icon}>{ICONS.box}</span>
                <select className={styles.select} value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="">Select course</option>
                  {COURSE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Full name *</label>
              <div className={styles.control}>
                <span className={styles.icon}>{ICONS.user}</span>
                <input
                  className={styles.input}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Phone *</label>
              <div className={styles.phoneWrap}>
                <div className={styles.country}>IN&nbsp;&nbsp;+91</div>
                <div className={styles.controlNoPad}>
                  <span className={styles.iconPhone}>{ICONS.phone}</span>
                  <input
                    className={styles.inputPhone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit number"
                    inputMode="numeric"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Promo code (optional)</label>
              <div className={styles.control}>
                <span className={styles.icon}>{ICONS.tag}</span>
                <input
                  className={styles.input}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. SDRAM10"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>I am *</label>
                <div className={styles.control}>
                  <span className={styles.icon}>{ICONS.cap}</span>
                  <select className={styles.select} value={iam} onChange={(e) => setIam(e.target.value)}>
                    <option value="">Select</option>
                    {IAM_OPTIONS.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Level</label>
                <div className={styles.control}>
                  <span className={styles.icon}>{ICONS.layers}</span>
                  <select className={styles.select} value={level} onChange={(e) => setLevel(e.target.value)}>
                    {LEVEL_OPTIONS.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Select specialization *</label>
              <div className={styles.control}>
                <span className={styles.icon}>{ICONS.layers}</span>
                <select
                  className={styles.select}
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">Select specialization</option>
                  {SPECIALIZATION_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {submitted && <div className={styles.success}>Submitted.</div>}

            {/* Button is clickable; validation runs on submit */}

             
<button className={`${styles.cta} ${canSubmit ? styles.ctaReady : styles.ctaMuted}`} type="submit" disabled={submitting}>

              Get Free Counselling <span className={styles.arrow}>→</span>
            </button>

            <div className={styles.meta}>
              By submitting, you agree to Sikhadenge&apos;s{" "}
              <a className={styles.link} href="/terms">
                Terms
              </a>{" "}
              and{" "}
              <a className={styles.link} href="/privacy-policy">
                Privacy policy
              </a>
              .
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


