import Link from "next/link";
import type { ReactNode } from "react";

import LogoutButton from "../auth/LogoutButton";
import MetaConnectionStatus from "./MetaConnectionStatus";
import SidebarMenuIcon, { type SidebarMenuTitle } from "./SidebarMenuIcon";

type DashboardModuleShellProps = {
  activeTitle: SidebarMenuTitle;
  eyebrow: string;
  title: string;
  description: string;
  userName: string;
  userRole: string;
  children: ReactNode;
};

type NavItem = {
  title: SidebarMenuTitle;
  href: string;
};

const PRIMARY_NAV: ReadonlySet<SidebarMenuTitle> = new Set([
  "Inbox",
  "Contacts",
  "Leads",
  "Team",
  "Engagement",
  "Analytics",
]);

const navItems: ReadonlyArray<NavItem> = [
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

const settingsItem: NavItem = { title: "Settings", href: "/settings" };
const primaryItems = navItems.filter((item) => PRIMARY_NAV.has(item.title));
const operationsItems = navItems.filter((item) => !PRIMARY_NAV.has(item.title));
const mobileDockItems: ReadonlyArray<NavItem> = [
  navItems[0],
  navItems[1],
  navItems[2],
  navItems[8],
  settingsItem,
];

function NavigationLink({
  item,
  activeTitle,
  className = "",
}: {
  item: NavItem;
  activeTitle: SidebarMenuTitle;
  className?: string;
}) {
  const isActive = activeTitle === item.title;

  return (
    <Link
      className={`rail-button sx-navitem ${isActive ? "is-active" : ""} ${className}`.trim()}
      title={item.title}
      aria-label={item.title}
      aria-current={isActive ? "page" : undefined}
      data-nav-title={item.title}
      href={item.href}
    >
      <span className="sx-navic">
        <SidebarMenuIcon title={item.title} />
      </span>
      <span className="sx-navlabel">{item.title}</span>
    </Link>
  );
}

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
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="sx-module">
      <a className="sx-skip-link" href="#dashboard-main">
        Skip to dashboard content
      </a>

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
          <nav className="sx-nav" aria-label="Core modules">
            {primaryItems.map((item) => (
              <NavigationLink
                key={item.title}
                item={item}
                activeTitle={activeTitle}
              />
            ))}
          </nav>

          <div className="sx-side-group">
            <p className="sx-side-label">Operations</p>
            <nav className="sx-nav" aria-label="Operations modules">
              {operationsItems.map((item) => (
                <NavigationLink
                  key={item.title}
                  item={item}
                  activeTitle={activeTitle}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="sx-side-foot">
          <NavigationLink item={settingsItem} activeTitle={activeTitle} />

          <div className="sx-account">
            <span className="sx-acc-avatar" aria-hidden="true">
              {initials}
            </span>
            <div className="sx-acc-copy">
              <strong>{userName}</strong>
              <small>{userRole.toLowerCase()}</small>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main id="dashboard-main" className="sx-workspace" tabIndex={-1}>
        <header className="sx-workspace-head">
          <div className="sx-workspace-head-left">
            <details className="sx-mobile-nav">
              <summary aria-label="Open all dashboard modules">
                <SidebarMenuIcon title={activeTitle} size={20} />
                <span>Menu</span>
              </summary>
              <div className="sx-mobile-nav-panel">
                <div className="sx-mobile-nav-heading">
                  <div>
                    <strong>All modules</strong>
                    <span>{userName}</span>
                  </div>
                  <MetaConnectionStatus />
                </div>
                <nav aria-label="All dashboard modules">
                  {[...navItems, settingsItem].map((item) => (
                    <NavigationLink
                      key={item.title}
                      item={item}
                      activeTitle={activeTitle}
                      className="sx-mobile-menu-link"
                    />
                  ))}
                </nav>
              </div>
            </details>

            <span className="sx-workspace-icon">
              <SidebarMenuIcon title={activeTitle} size={22} />
            </span>
            <div className="sx-workspace-copy">
              <p className="sx-workspace-eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="sx-workspace-description">{description}</p>
            </div>
          </div>
          <div className="sx-workspace-head-right">
            <MetaConnectionStatus />
            <span className="sx-workspace-badge">{activeTitle} module</span>
          </div>
        </header>

        <div className="sx-workspace-body">{children}</div>
      </main>

      <nav className="sx-mobile-dock" aria-label="Mobile quick navigation">
        {mobileDockItems.map((item) => (
          <NavigationLink
            key={item.title}
            item={item}
            activeTitle={activeTitle}
            className="sx-mobile-dock-link"
          />
        ))}
      </nav>
    </div>
  );
}
