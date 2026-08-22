import type { FunnelConfig } from "../../../lib/funnel/types";

export default function FaqSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-container">
      <div className="funnel-section-heading">
        <span className="funnel-kicker">FAQ</span>
        <h2>Before you register</h2>
      </div>

      <div className="funnel-faq-list">
        {config.faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
