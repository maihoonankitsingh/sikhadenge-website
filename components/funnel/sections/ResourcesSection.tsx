import type { FunnelConfig } from "../../../lib/funnel/types";

export default function ResourcesSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-section-alt">
      <div className="funnel-container">
        <div className="funnel-section-heading">
          <span className="funnel-kicker">MASTERCLASS RESOURCES</span>
          <h2>Useful resources that support implementation</h2>
          <p>No inflated bonus values. Only resources connected to the masterclass outcome.</p>
        </div>

        <div className="funnel-bonus-grid">
          {config.bonuses.map((bonus, index) => (
            <div className="funnel-bonus-card" key={bonus}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{bonus}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
