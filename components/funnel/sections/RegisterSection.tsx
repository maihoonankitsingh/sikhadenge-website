import type { FunnelConfig } from "../../../lib/funnel/types";
import RegistrationCard from "../RegistrationCard";

export default function RegisterSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="funnel-section funnel-section-alt">
      <div className="funnel-container funnel-register-layout">
        <div className="funnel-register-copy">
          <span className="funnel-kicker">RESERVE YOUR SEAT</span>
          <h2>One form. One clear next step.</h2>
          <p>
            Register with the WhatsApp number you actively use. Critical joining instructions are
            sent directly, so the session does not depend only on a community join.
          </p>
          <div className="funnel-register-assurance">
            <span>✓ No password required</span>
            <span>✓ Clear event communication</span>
            <span>✓ Attribution tracked end-to-end</span>
          </div>
        </div>
        <RegistrationCard config={config} />
      </div>
    </section>
  );
}
