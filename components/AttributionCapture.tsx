"use client";

import { useEffect } from "react";

type Attr = Record<string, string | null>;

export default function AttributionCapture() {
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);

      const keys = [
        "utm_source","utm_medium","utm_campaign","utm_content","utm_term",
        "utm_id","utm_campaign_id","utm_adset_id","utm_ad_id",
        "fbclid","gclid","msclkid"
      ];

      const out: Attr = {};
      for (const k of keys) {
        const v = sp.get(k);
        if (v) out[k] = v;
      }

      out["referrer"] = document.referrer || null;
      out["landing_url"] = window.location.href;     // FULL URL with query
      out["page_path"] = window.location.pathname;

      const existing = JSON.parse(localStorage.getItem("sd_attribution") || "{}") as Attr;
      localStorage.setItem("sd_attribution", JSON.stringify({ ...(existing || {}), ...out }));
    } catch {}
  }, []);

  return null;
}
