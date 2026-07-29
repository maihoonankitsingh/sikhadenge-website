"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTES: Record<string, string> = {
  Inbox: "/inbox",
  Contacts: "/contacts",
  Leads: "/leads",
  Team: "/team",
  Engagement: "/engagement",
  Analytics: "/analytics",
  Knowledge: "/knowledge",
  Campaigns: "/campaigns",
  Automation: "/automation",
  Templates: "/templates",
  Integrations: "/integrations",
  Admin: "/admin",
  Cutover: "/cutover",
  Settings: "/settings",
};

export default function SidebarNavigationBridge() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /*
     * Navigation items are now rendered directly by DashboardModuleShell and
     * InboxDashboardV2, including their inline SVG icons. Do not synthesize
     * missing buttons here: doing so once per <nav> duplicated menu entries and
     * produced text-only rows without icons in the rebuilt Inbox sidebar.
     */
    for (const [title, route] of Object.entries(ROUTES)) {
      const controls = Array.from(
        document.querySelectorAll<HTMLElement>(
          `.rail-button[title="${title}"]`,
        ),
      );

      for (const control of controls) {
        const handler = (event: Event) => {
          if (control instanceof HTMLAnchorElement) return;
          event.preventDefault();
          router.push(route);
        };

        control.addEventListener("click", handler);
        control.setAttribute("aria-label", title);
        control.classList.toggle("active", pathname === route);
        control.setAttribute("aria-current", pathname === route ? "page" : "false");
        cleanups.push(() => control.removeEventListener("click", handler));
      }
    }

    const brandMarks = Array.from(
      document.querySelectorAll<HTMLElement>(".brand-mark"),
    );

    for (const brandMark of brandMarks) {
      const handler = (event: Event) => {
        if (brandMark instanceof HTMLAnchorElement) return;
        event.preventDefault();
        router.push("/inbox");
      };

      brandMark.addEventListener("click", handler);
      brandMark.setAttribute("aria-label", "Open inbox");
      if (!(brandMark instanceof HTMLAnchorElement)) {
        brandMark.setAttribute("role", "button");
        brandMark.setAttribute("tabindex", "0");
      }
      cleanups.push(() => brandMark.removeEventListener("click", handler));
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname, router]);

  return null;
}
