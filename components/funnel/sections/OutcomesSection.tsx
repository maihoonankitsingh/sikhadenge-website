import type { FunnelConfig } from "../../../lib/funnel/types";

export default function OutcomesSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-section-alt">
      <div className="funnel-container">
        <div className="funnel-section-heading">
          <span className="funnel-kicker">WHAT YOU WILL LEARN</span>
          <h2>Build practical capability, not a collection of AI tricks</h2>
          <p>The session focuses on workflows you can understand, adapt and use after the masterclass.</p>
        </div>

        <div className="funnel-outcome-grid">
          {config.outcomes.map((outcome, index) => (
            <article className="funnel-outcome-card" key={outcome.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
