import {
  hasAdvertisingConsent,
} from "./consent";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    __sdLastLeadEventId?: string;
  }
}

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  "";

type MetaPayload =
  Record<string, unknown>;

function readCookie(name: string) {
  if (
    typeof document === "undefined"
  ) {
    return undefined;
  }

  const prefix = `${name}=`;

  for (
    const item
    of document.cookie.split(";")
  ) {
    const value = item.trim();

    if (!value.startsWith(prefix)) {
      continue;
    }

    const raw =
      value.slice(prefix.length);

    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }

  return undefined;
}

export function readMetaBrowserIdentifiers() {
  if (
    typeof window === "undefined"
  ) {
    return {
      fbp: undefined,
      fbc: undefined,
    };
  }

  const query =
    new URLSearchParams(
      window.location.search
    );

  const fbclid =
    query.get("fbclid") ||
    undefined;

  const fbp =
    readCookie("_fbp");

  const cookieFbc =
    readCookie("_fbc");

  const fbc =
    cookieFbc ||
    (
      fbclid
        ? `fb.1.${Date.now()}.${fbclid}`
        : undefined
    );

  return {
    fbp,
    fbc,
  };
}

export function trackMetaEvent(
  eventName: string,
  payload: MetaPayload = {},
  eventId?: string
): boolean {
  if (
    typeof window === "undefined" ||
    !hasAdvertisingConsent() ||
    !META_PIXEL_ID ||
    typeof window.fbq !== "function"
  ) {
    return false;
  }

  if (eventId) {
    window.fbq(
      "track",
      eventName,
      payload,
      {
        eventID: eventId,
      }
    );
  } else {
    window.fbq(
      "track",
      eventName,
      payload
    );
  }

  return true;
}

export function pageView() {
  return trackMetaEvent(
    "PageView"
  );
}

export function trackLead(
  payload: MetaPayload = {},
  eventId?: string
) {
  const resolvedEventId =
    eventId ||
    (
      typeof window !== "undefined"
        ? window.__sdLastLeadEventId
        : undefined
    );

  return trackMetaEvent(
    "Lead",
    payload,
    resolvedEventId
  );
}
