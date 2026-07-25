"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTES: Record<string, string> = {
  Inbox: "/inbox",
  Contacts: "/contacts",
  Leads: "/leads",
  Analytics: "/analytics",
  Knowledge: "/knowledge",
  Campaigns: "/campaigns",
  Settings: "/settings",
};

export default function SidebarNavigationBridge() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    for (const [title, route] of Object.entries(ROUTES)) {
      const buttons = Array.from(
        document.querySelectorAll<HTMLButtonElement>(
          `.rail-button[title="${title}"]`,
        ),
      );

      for (const button of buttons) {
        const handler = () => router.push(route);
        button.addEventListener("click", handler);
        button.setAttribute("aria-label", title);
        button.classList.toggle("active", pathname === route);
        button.setAttribute("aria-current", pathname === route ? "page" : "false");
        cleanups.push(() => button.removeEventListener("click", handler));
      }
    }

    const brandMarks = Array.from(
      document.querySelectorAll<HTMLElement>(".brand-mark"),
    );

    for (const brandMark of brandMarks) {
      const handler = () => router.push("/inbox");
      brandMark.addEventListener("click", handler);
      brandMark.setAttribute("role", "button");
      brandMark.setAttribute("tabindex", "0");
      brandMark.setAttribute("aria-label", "Open inbox");
      cleanups.push(() => brandMark.removeEventListener("click", handler));
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname, router]);

  return null;
}
