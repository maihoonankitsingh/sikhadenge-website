"use client";

import { useEffect } from "react";

export default function TrackingInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_adset",
      "utm_ad",
      "utm_campaign_id",
      "utm_adset_id",
      "utm_ad_id",
      "fbclid",
    ];

    keys.forEach((key) => {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(key, value);
      }
    });

    localStorage.setItem("landing_page", window.location.href);
    if (document.referrer) {
      localStorage.setItem("referrer", document.referrer);
    }
  }, []);

  return null;
}
