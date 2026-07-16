import { hasAdvertisingConsent } from "./consent";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export function trackMetaEvent(
  eventName: string,
  payload: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  if (!hasAdvertisingConsent()) return;
  if (!window.fbq || !META_PIXEL_ID) return;

  window.fbq("track", eventName, payload);
}

export function pageView() {
  trackMetaEvent("PageView");
}

export function trackLead(payload: Record<string, unknown> = {}) {
  trackMetaEvent("Lead", payload);
}
