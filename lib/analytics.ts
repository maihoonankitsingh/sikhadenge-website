import { hasAnalyticsConsent } from "./consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  page_path?: string;
};

export function trackGoogleEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}

export function trackEvent({
  action,
  category = "engagement",
  label,
  value,
  page_path,
}: TrackEventParams) {
  trackGoogleEvent(action, {
    event_category: category,
    event_label: label,
    value,
    page_path,
  });
}
