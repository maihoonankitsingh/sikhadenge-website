import type { FunnelConfig } from "../../../lib/funnel/types";
import ProductGlyph from "../ProductGlyph";
import TrackedCta from "../TrackedCta";

export default function HeroSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-hero funnel-container">
      <div className="funnel-hero-copy">
        <div className="funnel-badge">{config.badge}</div>
        <h1>
          {config.heroTitle} <span>{config.heroHighlight}</span>
        </h1>
        <p className="funnel-hero-description">{config.heroDescription}</p>

        <div className="funnel-event-grid" aria-label="Masterclass details">
          <div><small>DATE</small><strong>{config.dateLabel}</strong></div>
          <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
          <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
          <div><small>FORMAT</small><strong>{config.durationLabel}</strong></div>
        </div>

        <div className="funnel-hero-actions">
          <TrackedCta config={config} location="hero" />
          <p>
            {config.offerMode === "free"
              ? "No payment required for this entry variant."
              : `One-time entry fee: ₹${config.entryPrice}.`}
          </p>
        </div>
      </div>

      <div className="funnel-hero-visual">
        <div className="funnel-visual-orbit funnel-orbit-one" />
        <div className="funnel-visual-orbit funnel-orbit-two" />
        <ProductGlyph product={config.product} />
        <div className="funnel-workflow-card funnel-workflow-one">
          <small>INPUT</small><strong>Messy task</strong><span>Unclear prompt • scattered context</span>
        </div>
        <div className="funnel-workflow-line" />
        <div className="funnel-workflow-card funnel-workflow-two">
          <small>WORKFLOW</small><strong>Structured AI process</strong><span>Context • method • output format</span>
        </div>
        <div className="funnel-workflow-card funnel-workflow-three">
          <small>OUTPUT</small><strong>Usable work</strong><span>Clear • repeatable • reviewable</span>
        </div>
      </div>
    </section>
  );
}
