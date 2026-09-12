import { redirect } from "next/navigation";

import LoginForm from "../../components/auth/LoginForm";
import { getCurrentDashboardUser } from "../../lib/auth/session";
import "../login-experience.css";

export const dynamic = "force-dynamic";

const BRAND_LOGO = "/sikhadenge-header-safe-320.png";

const featureCards = [
  {
    title: "Inbox",
    copy: "Manage every student conversation from one owned workspace.",
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
    copy: "Qualify, assign and nurture opportunities with counselor context.",
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
    copy: "Build controlled workflows while keeping human approval in the loop.",
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
    copy: "Turn conversations, follow-ups and outcomes into clear operating signals.",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V11M10 19V6M15 19v-9M20 19V4" />
      </svg>
    ),
  },
] as const;

const metrics = [
  ["15", "Operational modules"],
  ["3", "Hindi · English · Hinglish"],
  ["AI + Human", "Controlled handoff"],
  ["Owned", "SikhaDenge workspace"],
] as const;

export default async function LoginPage() {
  const user = await getCurrentDashboardUser();
  if (user) redirect("/inbox");

  return (
    <main className="auth">
      <div className="auth__ambient auth__ambient--one" aria-hidden="true" />
      <div className="auth__ambient auth__ambient--two" aria-hidden="true" />

      <header className="auth__topbar">
        <a className="auth__header-brand" href="https://sikhadenge.in/" aria-label="SikhaDenge home">
          <span className="auth__logo-surface">
            <img
              className="auth__brand-wordmark--aside"
              src={BRAND_LOGO}
              alt="SikhaDenge"
              width={192}
              height={58}
            />
          </span>
        </a>

        <div className="auth__top-context" aria-label="Workspace attributes">
          <span>Owned Workspace</span>
          <span>AI + Human</span>
          <span>Secure Access</span>
        </div>

        <div className="auth__system-pill">
          <span className="auth__system-dot" aria-hidden="true" />
          Authorized team access
        </div>
      </header>

      <div className="auth__stage auth__shell">
        <section className="auth__hero auth__aside" aria-labelledby="auth-hero-title">
          <div className="auth__hero-copy">
            <p className="auth__eyebrow">AI meets human potential</p>
            <h1 id="auth-hero-title" className="auth__hero-title">
              SikhaDenge
              <span>WhatsApp Agent</span>
            </h1>
            <p className="auth__hero-lead">
              AI-powered conversations, lead operations, automation and growth —
              controlled from one SikhaDenge workspace.
            </p>
          </div>

          <div className="auth__feature-grid" aria-label="Workspace capabilities">
            {featureCards.map((feature) => (
              <article className="auth__feature-card" data-tone={feature.tone} key={feature.title}>
                <span className="auth__feature-icon">{feature.icon}</span>
                <h2>{feature.title}</h2>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>

          <dl className="auth__metrics" aria-label="Platform summary">
            {metrics.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>

          <div className="auth__network" aria-hidden="true">
            <div className="auth__orbit auth__orbit--one" />
            <div className="auth__orbit auth__orbit--two" />
            <div className="auth__orbit auth__orbit--three" />
            <div className="auth__globe" />
            <div className="auth__whatsapp-node">
              <svg viewBox="0 0 24 24">
                <path d="M19.4 4.6A10 10 0 0 0 3.7 16.65L2.5 21.5l5-1.15A10 10 0 1 0 19.4 4.6Z" />
                <path d="M8.35 7.65c.35-.25.7-.15.9.25l.9 2.05c.15.35.1.6-.15.85l-.7.75c.65 1.35 1.8 2.5 3.15 3.15l.75-.7c.25-.25.5-.3.85-.15l2.05.9c.4.2.5.55.25.9-.55.8-1.5 1.3-2.5 1.3-3.75 0-7.75-4-7.75-7.75 0-1 .5-1.95 1.3-2.5Z" />
              </svg>
            </div>
            <span className="auth__network-tag auth__network-tag--left">Conversations → opportunity</span>
            <span className="auth__network-tag auth__network-tag--right">Automation → follow-up</span>
          </div>
        </section>

        <section className="auth__panel" aria-labelledby="login-title">
          <div className="auth__panel-glow" aria-hidden="true" />
          <div className="auth__panel-inner">
            <div className="auth__panel-brand-row">
              <span className="auth__logo-surface auth__logo-surface--panel">
                <img
                  className="auth__brand-wordmark--mobile"
                  src={BRAND_LOGO}
                  alt="SikhaDenge"
                  width={188}
                  height={57}
                />
              </span>
              <span className="auth__trust-label">Simple · Secure · Smart</span>
            </div>

            <div className="auth__panel-heading">
              <h2 className="auth__compat-heading">Sign in</h2>
              <p className="auth__panel-kicker">SikhaDenge owned system</p>
              <h3 id="login-title">Welcome Back</h3>
              <p>Sign in to your WhatsApp Agent dashboard</p>
            </div>

            <LoginForm />

            <div className="auth__secure-note">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
              </svg>
              <span>Secure access for counselors, managers and admins.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
