"use client";

import { useEffect } from "react";
import type { FunnelConfig } from "../../lib/funnel/types";
import { trackFunnelEvent } from "../../lib/funnel/client";

export default function FunnelTracker({ config }: { config: FunnelConfig }) {
  useEffect(() => {
    void trackFunnelEvent(config, "view_masterclass_offer");
  }, [config]);

  return null;
}
