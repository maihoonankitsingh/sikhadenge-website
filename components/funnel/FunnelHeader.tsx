import Image from "next/image";
import type { FunnelConfig } from "../../lib/funnel/types";

export default function FunnelHeader({ config }: { config: FunnelConfig }) {
  return (
    <>
      <div className="funnel-announcement">
        <span className="funnel-live-dot" />
        <span>Live masterclass • {config.dateLabel} • {config.timeLabel}</span>
      </div>

      <header className="funnel-topbar">
        <a href="https://sikhadenge.in" className="funnel-brand" aria-label="SikhaDenge home">
          <Image
            src="/funnels/shared/sikhadenge-logo.png"
            width={170}
            height={54}
            priority
            alt="SikhaDenge"
          />
        </a>
        <div className="funnel-top-meta">
          <span>Live</span>
          <span>Practical</span>
          <span>Beginner Friendly</span>
        </div>
      </header>
    </>
  );
}
