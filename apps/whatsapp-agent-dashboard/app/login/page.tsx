import { redirect } from "next/navigation";

import LoginForm from "../../components/auth/LoginForm";
import { getCurrentDashboardUser } from "../../lib/auth/session";
import "../login-page01-split.css";
import "../login-page01-approved.css";

export const dynamic = "force-dynamic";

const BRAND_LOGO = "/sikhadenge-header-safe-320.png";

function FeatureIcon({ kind }: { kind: "inbox" | "leads" | "ai" | "analytics" | "automation" }) {
  if (kind === "inbox") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 6.5h15v10h-10L6 19v-2.5H4.5z" />
        <path d="M8 10h8M8 13h5" />
      </svg>
    );
  }
  if (kind === "leads") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 18c.5-3.2 2.4-5 5.5-5s5 1.8 5.5 5M16 11a2.5 2.5 0 1 0 0-5M16 13c2.6.3 4 1.8 4.3 4.5" />
      </svg>
    );
  }
  if (kind === "analytics") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19v-6M10 19V9M15 19v-4M20 19V5" />
      </svg>
    );
  }
  if (kind === "automation") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7.5h8a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z" />
      <path d="M12 4v3.5M9 12h.01M15 12h.01M9.5 15h5" />
    </svg>
  );
}

const conversations = [
  ["RS", "Riya Sharma", "I’m interested in the course…", "10:24 AM"],
  ["AV", "Aman Verma", "Can you share the details?", "09:48 AM"],
  ["NG", "Neha Gupta", "Thank you for the information!", "09:12 AM"],
  ["RM", "Rahul Mehta", "I have a few questions…", "08:45 AM"],
] as const;

export default async function LoginPage() {
  const user = await getCurrentDashboardUser();
  if (user) redirect("/inbox");

  return (
    <main className="split01" data-page="login-page01-approved-v2">
      <section className="split01__hero" aria-labelledby="split01-title">
        <div className="split01__dots split01__dots--top" aria-hidden="true" />
        <div className="split01__dots split01__dots--mid" aria-hidden="true" />

        <a className="split01__brand" href="https://sikhadenge.in/" aria-label="SikhaDenge home">
          <img src={BRAND_LOGO} alt="SikhaDenge" width={320} height={80} />
        </a>

        <div className="split01__copy">
          <span className="split01__chip"><i />AI Agent workspace</span>
          <h1 id="split01-title">The WhatsApp AI Agent <span>workspace</span></h1>
          <p>Manage conversations, qualified leads, agent knowledge and counselor handoffs — all in one powerful platform.</p>
        </div>

        <div className="split01__orbit" aria-hidden="true">
          <div className="split01__ring split01__ring--one" />
          <div className="split01__ring split01__ring--two" />
          <div className="split01__ring split01__ring--three" />
          <i className="split01__node split01__node--one" />
          <i className="split01__node split01__node--two" />
          <i className="split01__node split01__node--three" />
          <i className="split01__node split01__node--four" />

          <div className="split01__bot">
            <span className="split01__antenna" />
            <span className="split01__bot-face"><i /><i /></span>
          </div>

          <article className="split01__feature split01__feature--inbox">
            <span className="split01__feature-icon split01__feature-icon--green"><FeatureIcon kind="inbox" /></span>
            <span><b>Inbox</b><small>Live conversations</small></span>
          </article>
          <article className="split01__feature split01__feature--leads">
            <span className="split01__feature-icon split01__feature-icon--violet"><FeatureIcon kind="leads" /></span>
            <span><b>Leads</b><small>Qualified & nurtured</small></span>
          </article>
          <article className="split01__feature split01__feature--ai">
            <span className="split01__feature-icon split01__feature-icon--cyan"><FeatureIcon kind="ai" /></span>
            <span><b>AI Agent</b><small>Knowledge & RAG</small></span>
          </article>
          <article className="split01__feature split01__feature--automation">
            <span className="split01__feature-icon split01__feature-icon--violet"><FeatureIcon kind="automation" /></span>
            <span><b>Automation</b><small>Workflows & campaigns</small></span>
          </article>
          <article className="split01__feature split01__feature--analytics">
            <span className="split01__feature-icon split01__feature-icon--blue"><FeatureIcon kind="analytics" /></span>
            <span><b>Analytics</b><small>Insights & growth</small></span>
          </article>
        </div>

        <div className="split01__preview" aria-hidden="true">
          <div className="split01__preview-nav">
            <span className="split01__mini-brand"><img src={BRAND_LOGO} alt="" /></span>
            <span className="is-active">▣ <b>Inbox</b></span>
            <span>♙ <b>Leads</b></span>
            <span>▤ <b>Contacts</b></span>
            <span>➤ <b>Campaigns</b></span>
            <span>⚙ <b>Automation</b></span>
            <span>▥ <b>Analytics</b></span>
            <span>⚙ <b>Settings</b></span>
          </div>
          <div className="split01__preview-list">
            <div className="split01__preview-title">Inbox</div>
            <div className="split01__search">⌕&nbsp;&nbsp; Search conversations…</div>
            {conversations.map(([initials, name, message, time], index) => (
              <div className={index === 0 ? "split01__conversation is-active" : "split01__conversation"} key={name}>
                <span className="split01__avatar">{initials}</span>
                <span><b>{name}</b><small>{message}</small></span>
                <time>{time}</time>
              </div>
            ))}
          </div>
          <div className="split01__preview-ai">
            <div className="split01__preview-ai-head"><span><FeatureIcon kind="ai" /></span>AI Agent</div>
            <p>Here are the best next steps for this lead…</p>
            <div className="split01__preview-card"><span className="green-dot" /> <b>Lead Status</b><small>✓ Qualified</small></div>
            <div className="split01__preview-card"><span className="violet-dot" /> <b>Counselor Handoff</b><small>Ready for human support</small></div>
          </div>
        </div>

        <svg className="split01__wave" viewBox="0 0 900 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#0dc8ff" stopOpacity=".12" />
              <stop offset=".42" stopColor="#1b70ff" stopOpacity=".9" />
              <stop offset=".76" stopColor="#7b3fff" stopOpacity=".72" />
              <stop offset="1" stopColor="#1136ff" stopOpacity=".12" />
            </linearGradient>
          </defs>
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d={`M-40 ${112 + i * 7} C160 ${38 + i * 4}, 285 ${238 - i * 3}, 470 ${155 + i * 2} S770 ${80 + i * 5}, 940 ${132 + i * 5}`} fill="none" stroke="url(#waveStroke)" strokeWidth="1" opacity={0.2 + i * 0.045} />
          ))}
        </svg>

        <div className="split01__hero-foot"><span>⬡</span> Owned SikhaDenge system <i /> Secure team access</div>
      </section>

      <section className="split01__signin" aria-labelledby="login-title">
        <div className="split01__orb split01__orb--top" aria-hidden="true" />
        <div className="split01__orb split01__orb--bottom" aria-hidden="true" />
        <div className="split01__right-dots" aria-hidden="true" />

        <div className="split01__signin-inner">
          <div className="split01__signin-brand">
            <img src={BRAND_LOGO} alt="SikhaDenge" width={320} height={80} />
            <strong>EngageOS</strong>
          </div>

          <div className="split01__signin-heading">
            <p>SECURE TEAM ACCESS</p>
            <h2 id="login-title">Welcome back</h2>
            <span>Sign in to manage conversations, qualified leads, agent knowledge and counselor handoffs.</span>
          </div>

          <div className="split01__form-card">
            <LoginForm />
            <p className="split01__access-note">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3Z" /></svg>
              Access is restricted to authorized SikhaDenge team members.
            </p>
          </div>
        </div>

        <div className="split01__tagline"><i /> Better Conversations. Brighter Futures.</div>
      </section>
    </main>
  );
}
