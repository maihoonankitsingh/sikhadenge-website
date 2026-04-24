declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type TrackEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  page_path?: string;
};

export function trackEvent({
  action,
  category = "engagement",
  label,
  value,
  page_path,
}: TrackEventParams) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    page_path,
  });
}
