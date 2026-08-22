import type { FunnelConfig } from "../../../lib/funnel/types";

export default function AudienceSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-section-alt">
      <div className="funnel-container">
        <div className="funnel-section-heading">
          <span className="funnel-kicker">WHO SHOULD ATTEND</span>
          <h2>Built for people who want practical AI skills</h2>
        </div>

        <div className="funnel-audience-grid">
          {config.audiences.map((audience) => (
            <article key={audience.title}>
              <h3>{audience.title}</h3>
              <p>{audience.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
