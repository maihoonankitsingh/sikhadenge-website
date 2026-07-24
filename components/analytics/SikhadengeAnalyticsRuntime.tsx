"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  queueBrowserEvent,
} from "@/lib/sikhadenge-analytics/browser";

export function SikhadengeAnalyticsRuntime() {
  const pathname = usePathname() || "/";
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastTrackedPath.current === pathname) {
      return;
    }

    const navigationType =
      lastTrackedPath.current === null
        ? "initial_load"
        : "client_navigation";

    lastTrackedPath.current = pathname;

    queueBrowserEvent({
      event_name: "page_viewed",
      properties: {
        navigation_type: navigationType,
      },
    });
  }, [pathname]);

  return null;
}
