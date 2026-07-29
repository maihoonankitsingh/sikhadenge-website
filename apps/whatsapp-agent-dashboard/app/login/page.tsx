import { redirect } from "next/navigation";

import LoginForm from "../../components/auth/LoginForm";
import { getCurrentDashboardUser } from "../../lib/auth/session";
import "../login-experience.css";

export const dynamic = "force-dynamic";

const BRAND_MARK = "/dashboard-icons/01-sikhadenge-brand.png";

export default async function LoginPage() {
  const user = await getCurrentDashboardUser();
  if (user) redirect("/inbox");

  return (
    <main className="auth">
      <div className="auth__shell">
        <aside className="auth__aside" aria-hidden="true">
          <div className="auth__aside-top">
            <img className="auth__logo" src={BRAND_MARK} alt="" width={46} height={46} />
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
              <img src={BRAND_MARK} alt="" width={40} height={40} />
              <span>SikhaDenge</span>
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
