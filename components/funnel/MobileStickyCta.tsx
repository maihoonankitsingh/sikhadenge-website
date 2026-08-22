import type { FunnelConfig } from "../../lib/funnel/types";
import TrackedCta from "./TrackedCta";

export default function MobileStickyCta({ config }: { config: FunnelConfig }) {
  return (
    <div className="funnel-mobile-cta">
      <div>
        <small>{config.productLabel} LIVE</small>
        <strong>{config.offerMode === "free" ? "FREE" : `₹${config.entryPrice}`}</strong>
      </div>
      <TrackedCta config={config} location="mobile_sticky" label="Reserve Seat" />
    </div>
  );
}
