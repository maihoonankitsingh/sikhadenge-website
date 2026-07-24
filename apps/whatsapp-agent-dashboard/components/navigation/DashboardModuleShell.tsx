import type { ReactNode } from "react";

import LogoutButton from "../auth/LogoutButton";

type DashboardModuleShellProps = {
  activeTitle: "Inbox" | "Contacts" | "Leads" | "Analytics" | "Knowledge" | "Settings";
  eyebrow: string;
  title: string;
  description: string;
  userName: string;
  userRole: string;
  children: ReactNode;
};

const navItems = ["Inbox", "Contacts", "Leads", "Analytics", "Knowledge"] as const;

const moduleIcons: Record<DashboardModuleShellProps["activeTitle"], string> = {
  Inbox: "/dashboard-icons/02-conversations.png",
  Contacts: "/dashboard-icons/03-contacts.png",
  Leads: "/dashboard-icons/05-qualified-leads.png",
  Analytics: "/dashboard-icons/07-analytics.png",
  Knowledge: "/dashboard-icons/08-knowledge.png",
  Settings: "/dashboard-icons/10-settings.png",
};

export default function DashboardModuleShell({
  activeTitle,
  eyebrow,
  title,
  description,
  userName,
  userRole,
  children,
}: DashboardModuleShellProps) {
  const moduleKey = activeTitle.toLowerCase();

  return (
    <>
      <div className="session-toolbar" aria-label="Signed-in account">
        <span>
          <strong>{userName}</strong>
          <small>{userRole.toLowerCase()}</small>
        </span>
        <LogoutButton />
      </div>

      <main className="dashboard-shell">
        <aside className="rail" aria-label="Primary navigation">
          <div className="brand-mark">S</div>
          <nav>
            {navItems.map((item) => (
              <button
                key={item}
                className={`rail-button ${activeTitle === item ? "active" : ""}`}
                title={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            className={`rail-button rail-bottom ${activeTitle === "Settings" ? "active" : ""}`}
            title="Settings"
            type="button"
          >
            Settings
          </button>
        </aside>

        <section className="workspace module-workspace">
          <header className="topbar">
            <div>
              <p className="eyebrow">SikhaDenge owned system</p>
              <h1>WhatsApp AI Agent</h1>
            </div>
            <div className="topbar-actions">
              <div className="system-status"><span /> Database connected</div>
              <button className="secondary-button" disabled>
                Meta connection pending
              </button>
            </div>
          </header>

          <section className="module-page-card" data-module={moduleKey}>
            <header className="module-page-header">
              <div className="module-page-heading">
                <div className="module-page-icon" aria-hidden="true">
                  <img src={moduleIcons[activeTitle]} alt="" />
                </div>
                <div className="module-page-copy">
                  <p className="eyebrow">{eyebrow}</p>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </div>
              <span className="module-page-badge">{activeTitle} module</span>
            </header>
            <div className="module-page-content">{children}</div>
          </section>
        </section>
      </main>
    </>
  );
}
