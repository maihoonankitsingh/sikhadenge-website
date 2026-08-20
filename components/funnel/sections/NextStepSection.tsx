import type { FunnelConfig } from "../../../lib/funnel/types";

export default function NextStepSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-container">
      <div className="funnel-next-step">
        <span className="funnel-kicker">WHAT COMES AFTER</span>
        <h2>The masterclass is discovery. The workshop is implementation.</h2>
        <p>
          After the live masterclass, learners who want structured hands-on implementation may be
          invited to the <strong>{config.workshopName}</strong>. It is an optional next step for
          learners who want guided practice, assignments and a more structured implementation path.
        </p>
      </div>
    </section>
  );
}
