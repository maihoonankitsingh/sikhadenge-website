import { useMemo, useState } from 'react';
import styles from '../styles/counselling.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Course =
  | 'AI-Powered Graphic Design'
  | 'AI-Powered Video Editing'
  | 'AI-Powered Graphic Design + Video Editing';

type Persona = 'Student' | 'Working Professional' | 'Freelancer' | 'Business Owner' | 'Other';
type Spec = 'Beginner' | 'Intermediate' | 'Advanced' | 'Not sure';

const COURSES: Course[] = [
  'AI-Powered Graphic Design',
  'AI-Powered Video Editing',
  'AI-Powered Graphic Design + Video Editing',
];

const PERSONAS: Persona[] = ['Student', 'Working Professional', 'Freelancer', 'Business Owner', 'Other'];

const SPECS: Spec[] = ['Beginner', 'Intermediate', 'Advanced', 'Not sure'];

export default function CounsellingModal({ open, onClose }: Props) {
  const [course, setCourse] = useState<Course | ''>('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [persona, setPersona] = useState<Persona | ''>('');
  const [spec, setSpec] = useState<Spec | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const digits = phone.replace(/\D/g, '');
    return (
      Boolean(course) &&
      fullName.trim().length >= 2 &&
      digits.length === 10 &&
      Boolean(persona) &&
      Boolean(spec) &&
      !submitting
    );
  }, [course, fullName, phone, persona, spec, submitting]);

  if (!open) return null;

  const close = () => {
    setError(null);
    setDone(false);
    onClose();
  };

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        courseInterestedIn: course,
        fullName: fullName.trim(),
        phone: phone.replace(/\D/g, '').slice(-10),
        iam: persona,
        specialization: spec,
        source: 'website-modal',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
      }

      setDone(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={close} role="presentation">
      <div className={styles.modalWrap} onClick={(e) => e.stopPropagation()} role="presentation">
        <button className={styles.close} onClick={close} type="button" aria-label="Close">
          ✕
        </button>

        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Counselling form">
          <div className={styles.left}>
            <span className={styles.blob1} />
            <span className={styles.blob2} />
            <span className={styles.blob3} />
            <div className={styles.topLine}>
              <span className={styles.dot} />
              <span>FIRST CALL IS ON US</span>
            </div>

            <h2 className={styles.headline}>
              Schedule a 1:1
              <br />
              counselling call.
            </h2>

            <div className={styles.leftCards}>
              <div className={styles.card}>
                <span className={styles.check}>✓</span>
                <div>
                  <p className={styles.cardTitle}>AI-powered Graphic Design track</p>
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.check}>✓</span>
                <div>
                  <p className={styles.cardTitle}>AI-powered Video Editing track</p>
                </div>
              </div>

              <div className={styles.card}>
                <span className={styles.check}>✓</span>
                <div>
                  <p className={styles.cardTitle}>Combined track: Design + Editing</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            {done ? (
              <div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Submitted.</h3>
                <p style={{ marginTop: 10, marginBottom: 0, color: 'rgba(15,23,42,.72)' }}>
                  Team Sikhadenge will contact you for scheduling / pending details.
                </p>
              </div>
            ) : (
              <div className={styles.form}>
                <div className={styles.row}>
                  <select
                    className={styles.select}
                    value={course}
                    onChange={(e) => setCourse(e.target.value as Course)}
                    aria-label="Course interested in"
                  >
                    <option value="">Course interested in *</option>
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.row}>
                  <input
                    className={styles.input}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name *"
                    aria-label="Full name"
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.phoneWrap}>
                    <div className={styles.country}>+91</div>
                    <input
                      className={styles.input}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone (10 digits) *"
                      inputMode="numeric"
                      aria-label="Phone"
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <select
                    className={styles.select}
                    value={persona}
                    onChange={(e) => setPersona(e.target.value as Persona)}
                    aria-label="I am"
                  >
                    <option value="">I am *</option>
                    {PERSONAS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.row}>
                  <select
                    className={styles.select}
                    value={spec}
                    onChange={(e) => setSpec(e.target.value as Spec)}
                    aria-label="Specialization"
                  >
                    <option value="">Select specialization *</option>
                    {SPECS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <button className={styles.cta} type="button" disabled={!canSubmit} onClick={submit}>
                  {submitting ? 'Submitting...' : 'Get Free Counselling →'}
                </button>

                {error ? (
                  <div style={{ fontSize: 12, color: '#b91c1c', textAlign: 'center' }}>{error}</div>
                ) : null}

                <div className={styles.disclaimer}>
                  By submitting, you agree to Sikhadenge&apos;s Terms and Privacy Policy.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
