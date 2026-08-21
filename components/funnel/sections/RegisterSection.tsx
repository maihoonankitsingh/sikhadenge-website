import type { FunnelConfig } from "../../../lib/funnel/types";
import RegistrationCard from "../RegistrationCard";

export default function RegisterSection({ config }: { config: FunnelConfig }) {
  const entryLabel = config.offerMode === "free" ? "FREE" : `₹${config.entryPrice}`;

  return (
    <section className="funnel-section funnel-section-alt">
      <div className="funnel-container funnel-register-layout">
        <div className="funnel-register-copy">
          <span className="funnel-kicker">JOIN THE LIVE MASTERCLASS</span>
          <h2>Your seat is one short registration away.</h2>
          <p>
            Use the WhatsApp number you actively check. Your registration, joining instructions
            and session reminders stay connected to the same learner journey.
          </p>

          <div className="funnel-register-facts">
            <div><small>ENTRY</small><strong>{entryLabel}</strong></div>
            <div><small>WHEN</small><strong>{config.dateLabel} • {config.timeLabel}</strong></div>
            <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
          </div>

          <div className="funnel-register-assurance">
            <span>✓ One clear registration flow</span>
            <span>✓ Direct WhatsApp joining instructions</span>
            <span>✓ Secure checkout on paid-entry variant</span>
            <span>✓ No income, employment or outcome guarantee</span>
          </div>
        </div>
        <RegistrationCard config={config} />
      </div>
    </section>
  );
}
