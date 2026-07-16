"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/metaPixel";

type Props = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[] | string;
  value?: number;
  currency?: string;
};

export default function FbqViewContent({
  content_name,
  content_category,
  content_ids,
  value,
  currency = "INR",
}: Props) {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name,
      content_category,
      content_ids,
      value,
      currency,
    });
  }, [
    content_name,
    content_category,
    content_ids,
    value,
    currency,
  ]);

  return null;
}
