import Link from "next/link";
import type { ReactNode } from "react";

import LogoutButton from "../auth/LogoutButton";
import MetaConnectionStatus from "./MetaConnectionStatus";
import SidebarMenuIcon, { type SidebarMenuTitle } from "./SidebarMenuIcon";

type DashboardModuleShellProps = {
  activeTitle:
    | "Inbox"
    | "Contacts"
    | "Leads"
    | "Team"
    | "Engagement"
    | "Analytics"
    | "Knowledge"
    | "Agent Training"
    | "Campaigns"
    | "Automation"
    | "Templates"
    | "Integrations"
    | "Admin"
    | "Cutover"
    | "Settings";
  eyebrow: string;
  title: string;
  description: string;
  userName: string;
  userRole: string;
  children: ReactNode;
};

const PRIMARY_NAV: ReadonlySet<string> = new Set([
  "Inbox",
  "Contacts",
  "Leads",
  "Team",
  "Engagement",
  "Analytics",
]);

const navItems: ReadonlyArray<{
  title: Exclude<SidebarMenuTitle, "Settings">;
  href: string;
}> = [
  { title: "Inbox", href: "/inbox" },
  { title: "Contacts", href: "/contacts" },
  { title: "Leads", href: "/leads" },
  { title: "Team", href: "/team" },
  { title: "Engagement", href: "/engagement" },
  { title: "Analytics", href: "/analytics" },
  { title: "Knowledge", href: "/knowledge" },
  { title: "Agent Training", href: "/training" },
  { title: "Campaigns", href: "/campaigns" },
  { title: "Automation", href: "/automation" },
  { title: "Templates", href: "/templates" },
  { title: "Integrations", href: "/integrations" },
  { title: "Admin", href: "/admin" },
  { title: "Cutover", href: "/cutover" },
];

const primaryItems = navItems.filter((i) => PRIMARY_NAV.has(i.title));
const operationsItems = navItems.filter((i) => !PRIMARY_NAV.has(i.title));

export default function DashboardModuleShell({
  activeTitle,
  eyebrow,
  title,
  description,
  userName,
  userRole,
  children,
}: DashboardModuleShellProps) {
  const initials = userName
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="sx-module">
      <aside className="sx-side rail" aria-label="Primary navigation">
        <Link className="brand-mark" href="/inbox" aria-label="Open inbox">
          <span className="sx-brand-logo">
            <SidebarMenuIcon title="Inbox" size={20} />
          </span>
          <span className="sx-brand-name">
            SikhaDenge<small>Dashboard</small>
          </span>
        </Link>

        <div className="sx-side-scroll">
          <nav className="sx-nav">
            {primaryItems.map((item) => (
              <Link
                key={item.title}
                className={`rail-button sx-navitem ${activeTitle === item.title ? "is-active" : ""}`}
                title={item.title}
                aria-label={item.title}
                aria-current={activeTitle === item.title ? "page" : undefined}
                href={item.href}
              >
                <span className="sx-navic">
                  <SidebarMenuIcon title={item.title} />
                </span>
                <span className="sx-navlabel">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="sx-side-group">
            <p className="sx-side-label">Operations</p>
            <nav className="sx-nav">
              {operationsItems.map((item) => (
                <Link
                  key={item.title}
                  className={`rail-button sx-navitem ${activeTitle === item.title ? "is-active" : ""}`}
                  title={item.title}
                  aria-label={item.title}
                  aria-current={
                    activeTitle === item.title ? "page" : undefined
                  }
                  href={item.href}
                >
                  <span className="sx-navic">
                    <SidebarMenuIcon title={item.title} />
                  </span>
                  <span className="sx-navlabel">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="sx-side-foot">
          <Link
            className={`rail-button sx-navitem ${activeTitle === "Settings" ? "is-active" : ""}`}
            title="Settings"
            aria-label="Settings"
            aria-current={activeTitle === "Settings" ? "page" : undefined}
            href="/settings"
          >
            <span className="sx-navic">
              <SidebarMenuIcon title="Settings" />
            </span>
            <span className="sx-navlabel">Settings</span>
          </Link>

          <div className="sx-account">
            <span className="sx-acc-avatar">{initials}</span>
            <div className="sx-acc-copy">
              <strong>{userName}</strong>
              <small>{userRole.toLowerCase()}</small>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="sx-workspace">
        <header className="sx-workspace-head">
          <div className="sx-workspace-head-left">
            <span className="sx-workspace-icon">
              <SidebarMenuIcon title={activeTitle} size={22} />
            </span>
            <div className="sx-workspace-copy">
              <p className="sx-workspace-eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
            </div>
          </div>
          <div className="sx-workspace-head-right">
            <MetaConnectionStatus />
            <span className="sx-workspace-badge">{activeTitle} module</span>
          </div>
        </header>

        <div className="sx-workspace-body">{children}</div>
      </main>
    </div>
  );
}
