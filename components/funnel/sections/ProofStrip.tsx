import type { FunnelConfig } from "../../../lib/funnel/types";

export default function ProofStrip({ config }: { config: FunnelConfig }) {
  const entry = config.offerMode === "free" ? "FREE ENTRY" : `₹${config.entryPrice} ENTRY`;

  return (
    <section className="funnel-proof-strip" aria-label="Masterclass trust highlights">
      <div className="funnel-container funnel-proof-grid funnel-proof-grid-premium">
        <div><small>FORMAT</small><strong>Live mentor-led</strong><span>Practical walkthroughs</span></div>
        <div><small>LEARNING</small><strong>Workflow-first</strong><span>No random tool dump</span></div>
        <div><small>ACCESS</small><strong>{entry}</strong><span>Clear next step</span></div>
        <div><small>UPDATES</small><strong>WhatsApp-first</strong><span>Joining + reminders</span></div>
      </div>
    </section>
  );
}
