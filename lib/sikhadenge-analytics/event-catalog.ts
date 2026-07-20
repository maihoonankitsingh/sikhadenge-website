export const EVENT_CATALOG = {
  page_viewed: {
    category: "page",
    critical: false,
    ga4: "page_view",
    meta: null,
  },
  landing_page_viewed: {
    category: "page",
    critical: false,
    ga4: "view_item",
    meta: "ViewContent",
  },
  course_viewed: {
    category: "page",
    critical: false,
    ga4: "view_item",
    meta: "ViewContent",
  },
  pricing_viewed: {
    category: "page",
    critical: false,
    ga4: "view_item",
    meta: "ViewContent",
  },

  cta_viewed: {
    category: "engagement",
    critical: false,
    ga4: null,
    meta: null,
  },
  cta_clicked: {
    category: "engagement",
    critical: false,
    ga4: "select_content",
    meta: null,
  },
  whatsapp_clicked: {
    category: "engagement",
    critical: false,
    ga4: "whatsapp_click",
    meta: "Contact",
  },
  call_clicked: {
    category: "engagement",
    critical: false,
    ga4: "phone_click",
    meta: "Contact",
  },

  form_viewed: {
    category: "form",
    critical: false,
    ga4: null,
    meta: null,
  },
  form_started: {
    category: "form",
    critical: false,
    ga4: "form_start",
    meta: null,
  },
  form_field_error: {
    category: "form",
    critical: false,
    ga4: null,
    meta: null,
  },
  form_abandoned: {
    category: "form",
    critical: false,
    ga4: null,
    meta: null,
  },
  form_submitted: {
    category: "form",
    critical: true,
    ga4: "form_submit",
    meta: null,
  },
  lead_created: {
    category: "lead",
    critical: true,
    ga4: "generate_lead",
    meta: "Lead",
  },

  video_started: {
    category: "video",
    critical: false,
    ga4: "video_start",
    meta: null,
  },
  video_25_percent: {
    category: "video",
    critical: false,
    ga4: "video_progress",
    meta: null,
  },
  video_50_percent: {
    category: "video",
    critical: false,
    ga4: "video_progress",
    meta: null,
  },
  video_75_percent: {
    category: "video",
    critical: false,
    ga4: "video_progress",
    meta: null,
  },
  video_completed: {
    category: "video",
    critical: false,
    ga4: "video_complete",
    meta: null,
  },

  checkout_started: {
    category: "commerce",
    critical: true,
    ga4: "begin_checkout",
    meta: "InitiateCheckout",
  },
  payment_information_added: {
    category: "commerce",
    critical: true,
    ga4: "add_payment_info",
    meta: "AddPaymentInfo",
  },
  payment_successful: {
    category: "commerce",
    critical: true,
    ga4: "purchase",
    meta: "Purchase",
  },
  payment_failed: {
    category: "commerce",
    critical: true,
    ga4: null,
    meta: null,
  },
  refund_completed: {
    category: "commerce",
    critical: true,
    ga4: "refund",
    meta: null,
  },
} as const;

export type SikhadengeEventName =
  keyof typeof EVENT_CATALOG;

export function isSikhadengeEventName(
  value: string,
): value is SikhadengeEventName {
  return Object.prototype.hasOwnProperty.call(
    EVENT_CATALOG,
    value,
  );
}
