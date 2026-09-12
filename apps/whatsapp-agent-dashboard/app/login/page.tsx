import { redirect } from "next/navigation";

import LoginForm from "../../components/auth/LoginForm";
import { getCurrentDashboardUser } from "../../lib/auth/session";
import "../login-experience.css";
import "../login-reference-exact.css";

export const dynamic = "force-dynamic";

const BRAND_LOGO = "/page01-reference-brand.svg";

const featureCards = [
  {
    title: "Inbox",
    copy: "Manage all WhatsApp conversations in one place.",
    tone: "green",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6.75h14v9.5H9.5L6 19v-2.75H5z" />
        <path d="M8 10h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Leads",
    copy: "Capture, track and nurture every opportunity.",
    tone: "violet",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.25 11a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM4 18.75c.25-3.25 2-5 5.25-5s5 1.75 5.25 5" />
        <path d="M16.75 10.25a2.5 2.5 0 1 0 0-5M16 13.5c2.75.25 4 1.75 4 4.25" />
      </svg>
    ),
  },
  {
    title: "Automation",
    copy: "Save time with smart automations and workflows.",
    tone: "cyan",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.75v3M12 17.25v3M3.75 12h3M17.25 12h3M6.15 6.15l2.1 2.1M15.75 15.75l2.1 2.1M17.85 6.15l-2.1 2.1M8.25 15.75l-2.1 2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Analytics",
    copy: "Turn conversations into measurable growth.",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V11M10 19V6M15 19v-9M20 19V4" />
      </svg>
    ),
  },
] as const;

const metrics = [
  ["10K+", "Counselors Empowered"],
  ["1M+", "Student Conversations"],
  ["3x", "Higher Conversions"],
  ["24/7", "AI Working for You"],
] as const;

function BrandLockup({ panel = false }: { panel?: boolean }) {
  return (
    <span className={panel ? "login01__brand login01__brand--panel" : "login01__brand"}>
      <img src={BRAND_LOGO} alt="SikhaDenge — Learn Today, Grow Tomorrow." width={320} height={82} />
    </span>
  );
}

export default async function LoginPage() {
  const user = await getCurrentDashboardUser();
  if (user) redirect("/inbox");

  return (
    <main className="login01 auth">
      <div className="login01__ambient login01__ambient--left" aria-hidden="true" />
      <div className="login01__ambient login01__ambient--right" aria-hidden="true" />
      <div className="login01__city" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <i key={index} style={{ "--i": index } as React.CSSProperties} />
        ))}
      </div>

      <header className="login01__topbar">
        <a className="login01__home" href="https://sikhadenge.in/" aria-label="SikhaDenge home">
          <BrandLockup />
        </a>

        <nav className="login01__nav" aria-label="Public website navigation">
          <a href="https://sikhadenge.in/">Product</a>
          <a href="https://sikhadenge.in/">Solutions</a>
          <a href="https://sikhadenge.in/">Pricing</a>
          <a href="https://sikhadenge.in/">Resources</a>
          <a href="https://sikhadenge.in/contact">Contact</a>
        </nav>

        <div className="login01__top-actions">
          <span className="login01__status">
            <i aria-hidden="true" />
            All Systems Operational
          </span>
          <span className="login01__divider-v" aria-hidden="true" />
          <span className="login01__lang" aria-label="Language English">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
            </svg>
            EN
            <span>⌄</span>
          </span>
        </div>
      </header>

      <div className="login01__layout auth__shell">
        <section className="login01__hero auth__aside" aria-labelledby="login01-hero-title">
          <div className="login01__hero-copy">
            <p className="login01__eyebrow">AI MEETS HUMAN POTENTIAL</p>
            <h1 id="login01-hero-title" className="login01__title">
              SikhaDenge
              <span>WhatsApp Agent</span>
            </h1>
            <p className="login01__lead">
              AI-powered conversations, lead management,
              <br className="login01__desktop-break" /> automation, and growth.
            </p>
          </div>

          <div className="login01__handnote" aria-hidden="true">
            <span>More</span>
            <span>Students</span>
            <span>Brighter</span>
            <span>Futures</span>
            <i />
          </div>

          <div className="login01__feature-grid" aria-label="WhatsApp Agent capabilities">
            {featureCards.map((feature) => (
              <article className="login01__feature-card" data-tone={feature.tone} key={feature.title}>
                <span className="login01__feature-icon">{feature.icon}</span>
                <h2>{feature.title}</h2>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>

          <dl className="login01__metrics" aria-label="Platform highlights">
            {metrics.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>

          <div className="login01__network" aria-hidden="true">
            <div className="login01__planet">
              <span className="login01__continent login01__continent--one" />
              <span className="login01__continent login01__continent--two" />
              <span className="login01__continent login01__continent--three" />
            </div>
            <i className="login01__arc login01__arc--1" />
            <i className="login01__arc login01__arc--2" />
            <i className="login01__arc login01__arc--3" />
            <i className="login01__arc login01__arc--4" />
            <i className="login01__node login01__node--1" />
            <i className="login01__node login01__node--2" />
            <i className="login01__node login01__node--3" />
            <i className="login01__node login01__node--4" />

            <div className="login01__whatsapp-node">
              <svg viewBox="0 0 24 24">
                <path d="M19.4 4.6A10 10 0 0 0 3.7 16.65L2.5 21.5l5-1.15A10 10 0 1 0 19.4 4.6Z" />
                <path d="M8.35 7.65c.35-.25.7-.15.9.25l.9 2.05c.15.35.1.6-.15.85l-.7.75c.65 1.35 1.8 2.5 3.15 3.15l.75-.7c.25-.25.5-.3.85-.15l2.05.9c.4.2.5.55.25.9-.55.8-1.5 1.3-2.5 1.3-3.75 0-7.75-4-7.75-7.75 0-1 .5-1.95 1.3-2.5Z" />
              </svg>
            </div>

            <span className="login01__network-tag login01__network-tag--left">
              <b>◉</b>
              <span>Conversations<br /><strong>Create Opportunities</strong></span>
            </span>
            <span className="login01__network-tag login01__network-tag--right">
              <b>◉</b>
              <span>Automation<br /><strong>Drives Real Growth</strong></span>
            </span>
            <span className="login01__network-tag login01__network-tag--center">
              <b>◉</b>
              <span>Students<br /><strong>Build Brighter Futures</strong></span>
            </span>
          </div>

          <p className="login01__footer-caption">EDUCATION × TECHNOLOGY × A BRIGHTER TOMORROW</p>
        </section>

        <section className="login01__login-side" aria-labelledby="login-title">
          <div className="login01__trusted">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 19 6v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3Z" />
              <path d="m9 12 2 2 4-5" />
            </svg>
            <span>TRUSTED BY<br /><b>LEADING EDUCATION BRANDS</b></span>
          </div>

          <div className="login01__panel">
            <div className="login01__panel-notch" aria-hidden="true" />
            <div className="login01__panel-head">
              <BrandLockup panel />
              <span className="login01__panel-meta">••• &nbsp; SIMPLE&nbsp;&nbsp; SECURE&nbsp;&nbsp; SMART</span>
            </div>

            <div className="login01__heading">
              <h2 className="auth__compat-heading">Sign in</h2>
              <h3 id="login-title">Welcome Back</h3>
              <p>Sign in to your WhatsApp Agent dashboard</p>
            </div>

            <LoginForm />

            <p className="login01__secure-note">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
              </svg>
              Secure access for counselors, managers, and admins.
            </p>
          </div>

          <div className="login01__signature" aria-hidden="true">
            <span>Conversations</span>
            <span>Change Lives</span>
            <i />
          </div>
        </section>
      </div>
    </main>
  );
}
