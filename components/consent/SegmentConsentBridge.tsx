"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SEGMENT_WRITE_KEY =
  process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || "";

const SEGMENT_SCRIPT_ID =
  "segment-analytics-js";

type SegmentMethod =
  (...args: unknown[]) => unknown;

type SegmentAnalytics =
  unknown[] & {
    invoked?: boolean;
    methods?: string[];
    factory?: (
      method: string
    ) => SegmentMethod;
    load?: (
      writeKey: string
    ) => void;
    page?: SegmentMethod;
    reset?: SegmentMethod;
    track?: SegmentMethod;
    identify?: SegmentMethod;
    _writeKey?: string;
    SNIPPET_VERSION?: string;
  };

type SegmentWindow =
  typeof window & {
    analytics?: SegmentAnalytics;
    __sdSegmentInitialized?: boolean;
    __sdSegmentLastPageKey?: string;
  };

const SEGMENT_METHODS = [
  "trackSubmit",
  "trackClick",
  "trackLink",
  "trackForm",
  "pageview",
  "identify",
  "reset",
  "group",
  "track",
  "ready",
  "alias",
  "debug",
  "page",
  "screen",
  "once",
  "off",
  "on",
  "addSourceMiddleware",
  "addIntegrationMiddleware",
  "setAnonymousId",
  "addDestinationMiddleware",
  "register",
];

function hasValidWriteKey(): boolean {
  return /^[A-Za-z0-9_-]{20,80}$/.test(
    SEGMENT_WRITE_KEY
  );
}

function getOrCreateAnalytics():
  SegmentAnalytics {
  const segmentWindow =
    window as SegmentWindow;

  const existing =
    segmentWindow.analytics;

  if (
    existing &&
    typeof existing.page === "function" &&
    typeof existing.load === "function"
  ) {
    return existing;
  }

  const analytics =
    (
      Array.isArray(existing)
        ? existing
        : []
    ) as SegmentAnalytics;

  analytics.invoked = true;
  analytics.methods = SEGMENT_METHODS;

  analytics.factory = (
    method: string
  ) => {
    return (...args: unknown[]) => {
      analytics.push([
        method,
        ...args,
      ]);

      return analytics;
    };
  };

  for (
    const method
    of SEGMENT_METHODS
  ) {
    if (
      typeof (
        analytics as unknown as
          Record<string, unknown>
      )[method] === "function"
    ) {
      continue;
    }

    (
      analytics as unknown as
        Record<string, unknown>
    )[method] =
      analytics.factory(method);
  }

  analytics.load = (
    writeKey: string
  ) => {
    if (
      document.getElementById(
        SEGMENT_SCRIPT_ID
      )
    ) {
      return;
    }

    const script =
      document.createElement(
        "script"
      );

    script.id =
      SEGMENT_SCRIPT_ID;

    script.async = true;

    script.src =
      "https://cdn.segment.com/" +
      "analytics.js/v1/" +
      encodeURIComponent(writeKey) +
      "/analytics.min.js";

    script.setAttribute(
      "data-global-segment-analytics-key",
      "analytics"
    );

    document.head.appendChild(
      script
    );

    analytics._writeKey =
      writeKey;
  };

  analytics.SNIPPET_VERSION =
    "5.2.1";

  segmentWindow.analytics =
    analytics;

  return analytics;
}

export function SegmentConsentBridge() {
  const pathname = usePathname();

  useEffect(() => {
    if (!hasValidWriteKey()) {
      return;
    }

    const segmentWindow =
      window as SegmentWindow;

    const analytics =
      getOrCreateAnalytics();

    if (
      !segmentWindow
        .__sdSegmentInitialized
    ) {
      segmentWindow
        .__sdSegmentInitialized =
          true;

      analytics.load?.(
        SEGMENT_WRITE_KEY
      );
    }

    const pagePath =
      pathname ||
      window.location.pathname;

    const pageKey =
      pagePath +
      window.location.search;

    if (
      segmentWindow
        .__sdSegmentLastPageKey
      === pageKey
    ) {
      return;
    }

    segmentWindow
      .__sdSegmentLastPageKey =
        pageKey;

    analytics.page?.();
  }, [pathname]);

  useEffect(() => {
    return () => {
      const segmentWindow =
        window as SegmentWindow;

      segmentWindow
        .__sdSegmentLastPageKey =
          undefined;

      if (
        typeof segmentWindow
          .analytics?.reset
        === "function"
      ) {
        segmentWindow
          .analytics
          .reset();
      }
    };
  }, []);

  return null;
}
