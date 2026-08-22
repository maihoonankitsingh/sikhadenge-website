import type { FunnelConfig } from "../../../lib/funnel/types";
import TrackedCta from "../TrackedCta";

export default function DemoSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-container">
      <div className="funnel-section-heading">
        <span className="funnel-kicker">SEE IT LIVE</span>
        <h2>Three transformations. No 30-tool information dump.</h2>
        <p>
          The goal is to show how better structure changes the quality of work — without turning
          the masterclass into a full paid curriculum.
        </p>
      </div>

      <div className="funnel-demo-grid">
        {config.demos.map((demo) => (
          <article className="funnel-demo-card" key={demo.title}>
            <span>{demo.eyebrow}</span>
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
          </article>
        ))}
      </div>

      <div className="funnel-inline-cta">
        <TrackedCta config={config} location="demo_section" />
      </div>
    </section>
  );
}
