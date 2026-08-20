import type { FunnelConfig } from "../../../lib/funnel/types";
import ProductGlyph from "../ProductGlyph";
import TrackedCta from "../TrackedCta";

export default function FinalCtaSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-final-cta">
      <div className="funnel-container">
        <ProductGlyph product={config.product} />
        <h2>Learn the workflow. Then decide how far you want to take it.</h2>
        <p>{config.productLabel} masterclass • {config.dateLabel} • {config.timeLabel}</p>
        <TrackedCta config={config} location="final_cta" />
      </div>
    </section>
  );
}
