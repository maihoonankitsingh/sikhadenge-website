import type { FunnelConfig } from "../../../lib/funnel/types";

export default function CoreEnrollmentSection({
  config,
  busy,
  message,
  advisorAvailable,
  onEnroll,
  onAdvisor,
}: {
  config: FunnelConfig;
  busy: boolean;
  message: string;
  advisorAvailable: boolean;
  onEnroll: () => void;
  onAdvisor: () => void;
}) {
  return (
    <section className="core-section core-enrollment-section">
      <div className="core-enrollment-copy">
        <span className="core-kicker">DECIDE THE NEXT LEVEL</span>
        <h2>Enroll directly if the program fit is clear. Talk to an advisor only if you need help deciding.</h2>
        <p>
          The advisor path is not a mandatory sales call and does not unlock a different price. It exists for workshop learners who need clarity on fit, schedule or expected program depth before paying.
        </p>
        <div className="core-decision-grid">
          <div><strong>Direct enrollment</strong><span>For learners ready to continue into the full structured program.</span></div>
          <div><strong>Advisor conversation</strong><span>For genuine fit questions before enrollment, when the advisor channel is configured.</span></div>
        </div>
      </div>

      <aside className="core-enrollment-card">
        <span>Verified workshop-buyer price</span>
        <strong>₹{config.coreProgramPrice.toLocaleString("en-IN")}</strong>
        <button type="button" className="core-primary-button" disabled={busy} onClick={onEnroll}>
          {busy ? "Preparing secure checkout…" : `Enroll for ₹${config.coreProgramPrice.toLocaleString("en-IN")}`}
        </button>
        {advisorAvailable ? (
          <button type="button" className="core-secondary-button" disabled={busy} onClick={onAdvisor}>
            Talk to an Advisor
          </button>
        ) : null}
        <small>Secure Razorpay checkout • payment verified server-side • original funnel attribution preserved</small>
        {message ? <div className="core-message" role="status">{message}</div> : null}
      </aside>
    </section>
  );
}
