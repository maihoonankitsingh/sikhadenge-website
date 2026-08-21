import type { FunnelConfig } from "../../../lib/funnel/types";
import ProductGlyph from "../ProductGlyph";
import TrackedCta from "../TrackedCta";

const workflowSteps = [
  ["01", "Context", "Give the AI the right background"],
  ["02", "Method", "Turn intent into a repeatable process"],
  ["03", "Output", "Get work you can review and reuse"],
] as const;

export default function HeroSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-hero funnel-container">
      <div className="funnel-hero-copy">
        <div className="funnel-badge">{config.badge}</div>
        <h1>
          {config.heroTitle} <span>{config.heroHighlight}</span>
        </h1>
        <p className="funnel-hero-description">{config.heroDescription}</p>

        <div className="funnel-hero-proof" aria-label="Masterclass highlights">
          <span>Live workflow demos</span>
          <span>Beginner-friendly Hinglish</span>
          <span>Practical takeaways</span>
        </div>

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
              ? "Free entry • joining details on WhatsApp"
              : `One-time entry fee ₹${config.entryPrice} • secure checkout`}
          </p>
        </div>
      </div>

      <div className="funnel-hero-visual" aria-label={`${config.productLabel} workflow preview`}>
        <div className="funnel-visual-glow funnel-visual-glow-one" />
        <div className="funnel-visual-glow funnel-visual-glow-two" />

        <div className="funnel-command-window">
          <div className="funnel-command-topbar">
            <div className="funnel-window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>SIKHADENGE • AI WORKFLOW LAB</span>
            <b>LIVE</b>
          </div>

          <div className="funnel-command-product">
            <ProductGlyph product={config.product} />
            <div>
              <small>{config.productLabel.toUpperCase()} WORKFLOW</small>
              <strong>From prompt to professional output</strong>
              <span>Structure the task before asking AI to execute it.</span>
            </div>
          </div>

          <div className="funnel-command-steps">
            {workflowSteps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><small>{description}</small></div>
              </article>
            ))}
          </div>

          <div className="funnel-command-result">
            <span>WORKFLOW RESULT</span>
            <strong>Clear • Repeatable • Reviewable</strong>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="funnel-floating-note funnel-floating-note-one">
          <small>MASTERCLASS FOCUS</small>
          <strong>Real work, not prompt collecting</strong>
        </div>
        <div className="funnel-floating-note funnel-floating-note-two">
          <small>LEARNING STYLE</small>
          <strong>Watch → understand → apply</strong>
        </div>
      </div>
    </section>
  );
}
