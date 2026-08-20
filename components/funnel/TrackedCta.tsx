"use client";

import type { FunnelConfig } from "../../lib/funnel/types";
import { trackFunnelEvent } from "../../lib/funnel/client";

export default function TrackedCta({
  config,
  label,
  location,
  className = "funnel-primary-button",
}: {
  config: FunnelConfig;
  label?: string;
  location: string;
  className?: string;
}) {
  return (
    <a
      href="#register"
      className={className}
      onClick={() => void trackFunnelEvent(config, "masterclass_cta_click", { location })}
    >
      {label || config.ctaLabel}
    </a>
  );
}
