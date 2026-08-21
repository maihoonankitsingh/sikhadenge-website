import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";

export default function CoreProgramThankYou({
  config,
  verified,
}: {
  config: FunnelConfig;
  verified: boolean;
}) {
  return (
    <main className="core-confirmation-shell">
      <div className="core-confirmation-card">
        <Image src="/funnels/shared/sikhadenge-logo.png" width={174} height={56} alt="SikhaDenge" priority />
        {verified ? (
          <>
            <span className="core-confirmation-badge is-success">PAYMENT VERIFIED</span>
            <h1>Your AI Expert Program enrollment is confirmed.</h1>
            <p>
              The ₹{config.coreProgramPrice.toLocaleString("en-IN")} program payment was verified server-side and linked back to your original {config.productLabel} funnel journey.
            </p>
            <div className="core-confirmation-grid">
              <div><span>Program</span><strong>{config.coreProgramName}</strong></div>
              <div><span>Source track</span><strong>{config.productLabel}</strong></div>
              <div><span>Program structure</span><strong>{config.coreProgramDuration}</strong></div>
              <div><span>Next communication</span><strong>Registered WhatsApp / official SikhaDenge channel</strong></div>
            </div>
            <p className="core-confirmation-note">
              Keep your registered WhatsApp number active for onboarding, schedule and next-step communication. A browser URL alone cannot create this verified enrollment state.
            </p>
          </>
        ) : (
          <>
            <span className="core-confirmation-badge is-error">NOT VERIFIED</span>
            <h1>We could not verify a completed AI Expert Program payment for this link.</h1>
            <p>
              If you completed payment, use the same registered learner link or contact SikhaDenge support so the provider payment can be reconciled safely.
            </p>
          </>
        )}
        <a className="core-secondary-link" href="/">Go to SikhaDenge</a>
      </div>
    </main>
  );
}
