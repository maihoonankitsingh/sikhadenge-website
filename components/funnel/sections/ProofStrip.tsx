import type { FunnelConfig } from "../../../lib/funnel/types";

export default function ProofStrip({ config }: { config: FunnelConfig }) {
  const entry = config.offerMode === "free" ? "FREE" : `₹${config.entryPrice}`;

  return (
    <section className="funnel-proof-strip" aria-label="SikhaDenge masterclass proof">
      <div className="funnel-container funnel-proof-grid funnel-proof-grid-premium">
        <div><small>SIKHADENGE LEARNERS</small><strong>1.5 Lakh+</strong><span>Learning community reach</span></div>
        <div><small>LEARNER RATING</small><strong>4.9 / 5</strong><span>Brand social-proof benchmark</span></div>
        <div><small>CURRENT ENTRY</small><strong>{entry}</strong><span>Clear registration path</span></div>
        <div><small>SESSION DELIVERY</small><strong>Live + WhatsApp</strong><span>Joining link + reminders</span></div>
      </div>
    </section>
  );
}
