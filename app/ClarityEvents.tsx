"use client";

import { useEffect } from "react";
import { trackGoogleEvent } from "@/lib/analytics";
import { hasAdvertisingConsent } from "@/lib/consent";

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

type TouchData = {
  source: string;
  medium: string;
  campaign: string;
  landing_path: string;
  referrer_host: string;
  captured_at: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;

  utm_campaign_id?: string;
  utm_adset_id?: string;
  utm_ad_id?: string;

  fbclid?: string;
  gclid?: string;
  msclkid?: string;

  landing_url?: string;
  referrer?: string;
};

const FIRST_TOUCH_KEY = "sd_first_touch";
const LAST_TOUCH_KEY = "sd_last_touch";
const LEAD_SCORE_KEY = "sd_lead_score";

function clean(value: string | null | undefined, max = 100) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\-./:@]/g, "")
    .trim()
    .slice(0, max);
}

function getPageGroup(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.includes("register")) return "registration";
  if (pathname.includes("gen-ai-masterclass")) return "gen_ai_masterclass";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/learn")) return "learn";
  if (pathname.includes("ai-content-creation")) return "ai_content_creation";
  if (pathname.includes("bolt-new-course")) return "bolt_course";
  if (pathname.includes("contact")) return "contact";
  if (pathname.includes("about")) return "about";
  if (pathname.includes("admission")) return "admission";
  if (pathname.includes("payment")) return "payment";
  if (pathname.includes("checkout")) return "checkout";
  if (pathname.includes("dashboard")) return "dashboard";
  return "other_page";
}

function getReferrerHost() {
  try {
    if (!document.referrer) return "direct";
    return new URL(document.referrer).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

function detectSource(params: URLSearchParams, referrerHost: string) {
  const utmSource = clean(params.get("utm_source"));
  const utmMedium = clean(params.get("utm_medium"));
  const utmCampaign = clean(params.get("utm_campaign"));

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium || "utm",
      campaign: utmCampaign || "not_set",
    };
  }

  if (params.get("gclid")) return { source: "google_ads", medium: "paid_search", campaign: "gclid" };
  if (params.get("fbclid")) return { source: "meta", medium: "paid_social_or_social", campaign: "fbclid" };
  if (params.get("msclkid")) return { source: "microsoft_ads", medium: "paid_search", campaign: "msclkid" };

  if (referrerHost.includes("google.")) return { source: "google", medium: "organic_search", campaign: "not_set" };
  if (referrerHost.includes("bing.")) return { source: "bing", medium: "organic_search", campaign: "not_set" };
  if (referrerHost.includes("facebook.") || referrerHost.includes("instagram.")) return { source: "meta", medium: "organic_social", campaign: "not_set" };
  if (referrerHost.includes("youtube.")) return { source: "youtube", medium: "organic_social", campaign: "not_set" };
  if (referrerHost.includes("whatsapp.")) return { source: "whatsapp", medium: "messaging", campaign: "not_set" };
  if (referrerHost === "direct") return { source: "direct", medium: "direct", campaign: "not_set" };

  return { source: referrerHost, medium: "referral", campaign: "not_set" };
}

function readTouch(key: string): TouchData | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as TouchData) : null;
  } catch {
    return null;
  }
}

function writeTouch(key: string, value: TouchData) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function readLeadScore() {
  try {
    return Number(window.localStorage.getItem(LEAD_SCORE_KEY) || "0") || 0;
  } catch {
    return 0;
  }
}

function writeLeadScore(score: number) {
  try {
    window.localStorage.setItem(LEAD_SCORE_KEY, String(score));
  } catch {}
}

function getScrollDepthPercent() {
  const doc = document.documentElement;
  const body = document.body;

  const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0;
  const scrollHeight = Math.max(
    body.scrollHeight,
    doc.scrollHeight,
    body.offsetHeight,
    doc.offsetHeight,
    body.clientHeight,
    doc.clientHeight
  );

  const viewport = window.innerHeight || doc.clientHeight || 1;
  const maxScrollable = Math.max(scrollHeight - viewport, 1);

  return Math.min(100, Math.max(0, Math.round((scrollTop / maxScrollable) * 100)));
}

function maskSensitiveElements() {
  const selectors = [
    "input",
    "textarea",
    "select",
    "[contenteditable='true']",
    "[data-sensitive='true']",
    "[data-sd-sensitive='true']"
  ];

  try {
    document.querySelectorAll<HTMLElement>(selectors.join(",")).forEach((el) => {
      el.setAttribute("data-clarity-mask", "true");
      el.setAttribute("autocomplete", el.getAttribute("autocomplete") || "off");
    });
  } catch {}
}

export default function ClarityEvents() {
  useEffect(() => {
    const sent = new Set<string>();
    const timers: number[] = [];

    const setTag = (key: string, value: string | number) => {
      const safe = clean(String(value), 120);
      if (!safe) return;

      try {
        window.clarity?.("set", key, safe);
      } catch {}
    };

    const sendEvent = (name: string) => {
      try {
        window.clarity?.("event", name);
      } catch {}
    };

    const sendOnce = (key: string, eventName: string) => {
      if (sent.has(key)) return;
      sent.add(key);
      sendEvent(eventName);
    };

    const bumpLeadScore = (points: number, reason: string) => {
      const next = Math.min(100, readLeadScore() + points);
      writeLeadScore(next);
      setTag("lead_score", next);
      setTag("lead_score_reason", reason);
    };

    const tagAttribution = (allowReferrerRefresh = false) => {
      const params = new URLSearchParams(window.location.search);
      const referrerHost = getReferrerHost();
      const currentHost = window.location.hostname.replace(/^www\./, "");
      const sourceData = detectSource(params, referrerHost);
      const advertisingAllowed = hasAdvertisingConsent();

      const getParam = (...keys: string[]) => {
        for (const key of keys) {
          const value = clean(params.get(key), 250);
          if (value) return value;
        }
        return "";
      };

      const safeLandingUrl = new URL(window.location.href);

      if (!advertisingAllowed) {
        safeLandingUrl.searchParams.delete("fbclid");
        safeLandingUrl.searchParams.delete("gclid");
        safeLandingUrl.searchParams.delete("msclkid");
      }

      const touch: TouchData = {
        source: sourceData.source,
        medium: sourceData.medium,
        campaign: sourceData.campaign,
        landing_path: window.location.pathname,
        referrer_host: referrerHost,
        captured_at: new Date().toISOString(),

        utm_source: getParam("utm_source"),
        utm_medium: getParam("utm_medium"),
        utm_campaign: getParam("utm_campaign"),
        utm_content: getParam("utm_content"),
        utm_term: getParam("utm_term"),
        utm_id: getParam("utm_id"),

        utm_campaign_id: getParam(
          "utm_campaign_id",
          "campaign_id"
        ),
        utm_adset_id: getParam(
          "utm_adset_id",
          "adset_id"
        ),
        utm_ad_id: getParam(
          "utm_ad_id",
          "ad_id"
        ),

        fbclid: advertisingAllowed
          ? getParam("fbclid")
          : "",
        gclid: advertisingAllowed
          ? getParam("gclid")
          : "",
        msclkid: advertisingAllowed
          ? getParam("msclkid")
          : "",

        landing_url: safeLandingUrl.toString().slice(0, 2000),
        referrer: String(document.referrer || "").slice(0, 2000),
      };

      const firstTouch = readTouch(FIRST_TOUCH_KEY);
      const lastTouch = readTouch(LAST_TOUCH_KEY);

      if (!firstTouch) {
        writeTouch(FIRST_TOUCH_KEY, touch);
      }

      const hasCampaignSignal = Boolean(
        touch.utm_source ||
        touch.utm_medium ||
        touch.utm_campaign ||
        touch.utm_content ||
        touch.utm_term ||
        touch.utm_id ||
        touch.utm_campaign_id ||
        touch.utm_adset_id ||
        touch.utm_ad_id ||
        touch.fbclid ||
        touch.gclid ||
        touch.msclkid
      );

      const externalReferrer =
        referrerHost !== "direct" &&
        referrerHost !== "unknown" &&
        referrerHost !== currentHost;

      const shouldRefreshLastTouch =
        !lastTouch ||
        hasCampaignSignal ||
        (allowReferrerRefresh && externalReferrer);

      if (shouldRefreshLastTouch) {
        writeTouch(LAST_TOUCH_KEY, touch);
      }

      const activeFirstTouch = firstTouch || touch;

      const activeLastTouch = shouldRefreshLastTouch
        ? touch
        : lastTouch || touch;

      setTag("traffic_source", activeLastTouch.source);
      setTag("traffic_medium", activeLastTouch.medium);
      setTag("traffic_campaign", activeLastTouch.campaign);
      setTag("referrer_host", activeLastTouch.referrer_host);
      setTag("landing_path", activeLastTouch.landing_path);

      setTag("first_touch_source", activeFirstTouch.source);
      setTag("first_touch_medium", activeFirstTouch.medium);
      setTag("first_touch_campaign", activeFirstTouch.campaign);

      setTag("last_touch_source", activeLastTouch.source);
      setTag("last_touch_medium", activeLastTouch.medium);
      setTag("last_touch_campaign", activeLastTouch.campaign);

      setTag("lead_score", readLeadScore());
    };

    const tagCurrentPage = () => {
      const pathname = window.location.pathname;
      const group = getPageGroup(pathname);

      setTag("page_group", group);
      setTag("current_path", pathname);
      sendEvent(`${group}_page_view`);

      if (pathname.includes("/payment-success")) {
        sendOnce(`${pathname}:payment_success_view`, "payment_success_view");
        setTag("conversion_stage", "payment_success");
        bumpLeadScore(60, "payment_success");
      }

      if (pathname.includes("/admission/complete")) {
        sendOnce(`${pathname}:admission_complete_view`, "admission_complete_view");
        setTag("conversion_stage", "admission_complete");
        bumpLeadScore(50, "admission_complete");
      }

      if (pathname.includes("/gen-ai-masterclass/welcome")) {
        sendOnce(`${pathname}:masterclass_welcome_view`, "masterclass_welcome_view");
        setTag("conversion_stage", "masterclass_welcome");
        bumpLeadScore(45, "masterclass_welcome");
      }

      if (pathname.includes("/gen-ai-masterclass/register")) {
        sendOnce(`${pathname}:masterclass_register_page_view`, "masterclass_register_page_view");
        setTag("conversion_stage", "masterclass_register_page");
      }

      if (pathname.includes("/checkout")) {
        sendOnce(`${pathname}:checkout_view`, "checkout_view");
        setTag("conversion_stage", "checkout_view");
        bumpLeadScore(30, "checkout_view");
      }
    };

    const onScroll = () => {
      const depth = getScrollDepthPercent();
      setTag("max_scroll_depth", depth);

      [25, 50, 75, 90].forEach((milestone) => {
        if (depth >= milestone) {
          sendOnce(`${window.location.pathname}:scroll_${milestone}`, `scroll_depth_${milestone}`);
          if (milestone >= 75) bumpLeadScore(5, `scroll_${milestone}`);
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.("a,button,[role='button']") as HTMLElement | null;
      if (!el) return;

      const href = el instanceof HTMLAnchorElement ? el.href : el.getAttribute("href") || "";
      const text = clean(el.textContent, 100);
      const aria = clean(el.getAttribute("aria-label"), 100);
      const dataCta = clean(el.getAttribute("data-sd-cta"), 100);

      const combined = `${href} ${text} ${aria} ${dataCta}`.toLowerCase();

      try {
        if (href && href.startsWith("http")) {
          const linkHost = new URL(href).hostname.replace(/^www\./, "");
          const currentHost = window.location.hostname.replace(/^www\./, "");

          if (linkHost && linkHost !== currentHost) {
            sendEvent("outbound_link_click");
            setTag("outbound_host", linkHost);
          }
        }
      } catch {}

      if (/wa\.me|whatsapp|api\.whatsapp\.com/.test(combined)) {
        sendEvent("whatsapp_click");

        trackGoogleEvent("whatsapp_click", {
          event_category: "lead_intent",
          event_label: "whatsapp",
          page_path: window.location.pathname,
        });
        setTag("lead_intent", "whatsapp");
        setTag("last_click_type", "whatsapp");
        bumpLeadScore(40, "whatsapp_click");
        return;
      }

      if (href.startsWith("tel:")) {
        sendEvent("phone_click");

        trackGoogleEvent("phone_click", {
          event_category: "lead_intent",
          event_label: "phone",
          page_path: window.location.pathname,
        });
        setTag("lead_intent", "phone");
        setTag("last_click_type", "phone");
        bumpLeadScore(40, "phone_click");
        return;
      }

      if (href.startsWith("mailto:")) {
        sendEvent("email_click");
        setTag("lead_intent", "email");
        setTag("last_click_type", "email");
        bumpLeadScore(25, "email_click");
        return;
      }

      if (/zoom|join class|join session|join live/.test(combined)) {
        sendEvent("zoom_join_click");
        setTag("lead_intent", "zoom_join");
        setTag("last_click_type", "zoom_join");
        bumpLeadScore(35, "zoom_join_click");
        return;
      }

      if (/register|registration|admission|enroll|apply|book demo|join now|start now/.test(combined)) {
        sendEvent("register_button_click");
        setTag("lead_intent", "registration");
        setTag("last_click_type", "registration");
        bumpLeadScore(30, "register_button_click");
        return;
      }

      if (/payment|checkout|pay now|buy now|complete payment/.test(combined)) {
        sendEvent("payment_click");
        setTag("lead_intent", "payment");
        setTag("last_click_type", "payment");
        bumpLeadScore(45, "payment_click");
        return;
      }

      if (/course|masterclass|training|syllabus|curriculum/.test(combined)) {
        sendEvent("course_cta_click");
        setTag("last_click_type", "course_cta");
        bumpLeadScore(15, "course_cta_click");
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const isFormField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.getAttribute("contenteditable") === "true";

      if (!isFormField) return;

      sendOnce(`${window.location.pathname}:form_start`, "lead_form_start");
      setTag("conversion_stage", "form_start");
      bumpLeadScore(20, "form_start");
    };

    const onSubmit = () => {
      sendEvent("lead_form_submit");
      setTag("lead_intent", "form_submit");
      setTag("conversion_stage", "lead_form_submit");
      bumpLeadScore(50, "lead_form_submit");
    };

    const onMediaPlay = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLVideoElement)) return;

      sendOnce(`${window.location.pathname}:video_play`, "video_play");
      setTag("content_engagement", "video_play");
      bumpLeadScore(10, "video_play");
    };

    const onMediaEnded = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLVideoElement)) return;

      sendOnce(`${window.location.pathname}:video_complete`, "video_complete");
      setTag("content_engagement", "video_complete");
      bumpLeadScore(15, "video_complete");
    };

    const onFrontendError = () => {
      sendOnce("frontend_error", "frontend_error");
      setTag("frontend_health", "error_seen");
    };

    const onRouteChange = () => {
      window.setTimeout(() => {
        tagAttribution();
        maskSensitiveElements();
        tagCurrentPage();
        onScroll();
      }, 50);
    };

    tagAttribution(true);
    maskSensitiveElements();
    tagCurrentPage();
    onScroll();

    [15, 30, 60, 120, 300].forEach((seconds) => {
      const timer = window.setTimeout(() => {
        sendOnce(`${window.location.pathname}:engaged_${seconds}`, `engaged_${seconds}_sec`);
        setTag("engagement_time_sec", seconds);
        if (seconds >= 60) bumpLeadScore(10, `engaged_${seconds}_sec`);
      }, seconds * 1000);

      timers.push(timer);
    });

    const observer = new MutationObserver(() => maskSensitiveElements());
    observer.observe(document.body, { childList: true, subtree: true });

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (data: any, unused: string, url?: string | URL | null) {
      const result = originalPushState.apply(this, [data, unused, url] as any);
      onRouteChange();
      return result;
    };

    window.history.replaceState = function (data: any, unused: string, url?: string | URL | null) {
      const result = originalReplaceState.apply(this, [data, unused, url] as any);
      onRouteChange();
      return result;
    };

    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("error", onFrontendError);
    window.addEventListener("unhandledrejection", onFrontendError);

    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("play", onMediaPlay, true);
    document.addEventListener("ended", onMediaEnded, true);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();

      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;

      window.removeEventListener("popstate", onRouteChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("error", onFrontendError);
      window.removeEventListener("unhandledrejection", onFrontendError);

      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("play", onMediaPlay, true);
      document.removeEventListener("ended", onMediaEnded, true);
    };
  }, []);

  return null;
}
