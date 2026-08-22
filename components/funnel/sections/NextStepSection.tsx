import type { FunnelConfig } from "../../../lib/funnel/types";

export default function NextStepSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-container">
      <div className="funnel-next-step">
        <span className="funnel-kicker">YOUR OPTIONAL LEARNING PATH</span>
        <h2>Discover first. Implement next. Go deeper only if it makes sense for you.</h2>
        <p>
          The masterclass is designed to stand on its own. Learners who want hands-on implementation
          can optionally continue into the <strong>{config.workshopName}</strong> after the live session.
        </p>

        <div className="funnel-learning-path">
          <article className="is-current">
            <span>01</span>
            <small>NOW</small>
            <strong>{config.productLabel} Masterclass</strong>
            <p>Understand the workflow and see it applied live.</p>
          </article>
          <article>
            <span>02</span>
            <small>OPTIONAL NEXT STEP</small>
            <strong>{config.workshopName}</strong>
            <p>Guided practice, assignments and implementation at the configured cohort offer.</p>
            <b>₹{config.workshopPrice}</b>
          </article>
          <article>
            <span>03</span>
            <small>ADVANCED PATH</small>
            <strong>{config.coreProgramName}</strong>
            <p>A broader structured program available separately after the implementation stage.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
