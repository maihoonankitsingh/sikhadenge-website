"use client";

import { useEffect } from "react";

type Props = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[] | string;
  value?: number;
  currency?: string;
};

export default function FbqViewContent(props: Props) {
  useEffect(() => {
    const fbq = (globalThis as any).fbq;
    if (typeof fbq !== "function") return;

    // Meta Pixel ViewContent (safe no-op if fbq not loaded)
    try {
      fbq("track", "ViewContent", {
        content_name: props.content_name,
        content_category: props.content_category,
        content_ids: props.content_ids,
        value: props.value,
        currency: props.currency || "INR",
      });
    } catch {}
  }, [props]);

  return null;
}
