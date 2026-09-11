import { redirect } from "next/navigation";

import LoginForm from "../../components/auth/LoginForm";
import { getCurrentDashboardUser } from "../../lib/auth/session";
import "../login-experience.css";

export const dynamic = "force-dynamic";

const BRAND_MARK = "/sikhadenge-header-safe-320.png";

export default async function LoginPage() {
  const user = await getCurrentDashboardUser();
  if (user) redirect("/inbox");

  return (
    <main className="auth">
      <div className="auth__shell">
        <aside className="auth__aside" aria-hidden="true">
          <div className="auth__aside-top">
            <div className="auth__aside-brand">
              <img
                className="auth__brand-wordmark auth__brand-wordmark--aside"
                src={BRAND_MARK}
                alt=""
                width={184}
                height={56}
              />
            </div>
          </div>
          <div className="auth__aside-content">
            <h2 className="auth__aside-title">The WhatsApp AI Agent workspace</h2>
            <p className="auth__aside-copy">
              Manage conversations, qualified leads, agent knowledge and counselor
              handoffs — all from one owned dashboard.
            </p>
          </div>
        </aside>

        <section className="auth__panel">
          <div className="auth__panel-inner">
            <div className="auth__brand-mobile">
              <img
                className="auth__brand-wordmark auth__brand-wordmark--mobile"
                src={BRAND_MARK}
                alt="SikhaDenge"
                width={176}
                height={54}
              />
            </div>

            <p className="auth__eyebrow">SikhaDenge owned system</p>
            <h1 className="auth__title">Sign in</h1>
            <p className="auth__subtitle">
              Access the WhatsApp AI Agent dashboard to manage conversations,
              qualified leads, agent knowledge and counselor handoffs.
            </p>

            <LoginForm />

            <p className="auth__footnote">
              Access is restricted to authorized SikhaDenge team members.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
