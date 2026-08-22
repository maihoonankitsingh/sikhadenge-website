import Head from "next/head";
import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";

export default function WorkshopConfirmationPage({
  config,
  confirmationVerified,
}: {
  config: FunnelConfig;
  confirmationVerified: boolean;
}) {
  return (
    <>
      <Head>
        <title>{confirmationVerified ? "Workshop Enrollment Confirmed" : "Workshop Verification Required"} | SikhaDenge</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className={`workshop-shell workshop-theme-${config.theme}`}>
        <header className="workshop-topbar">
          <Image src="/funnels/shared/sikhadenge-logo.png" width={168} height={54} alt="SikhaDenge" priority />
          <span>{config.workshopName}</span>
        </header>

        <section className="workshop-final-cta" style={{ marginTop: 80 }}>
          <div className="funnel-confirmation-check" aria-hidden="true">
            {confirmationVerified ? "✓" : "!"}
          </div>
          <span className="workshop-kicker">
            {confirmationVerified ? "PAYMENT VERIFIED" : "VERIFICATION REQUIRED"}
          </span>
          <h2>
            {confirmationVerified
              ? `You're enrolled in the ${config.productLabel} implementation workshop.`
              : "This workshop enrollment could not be verified."}
          </h2>
          <p>
            {confirmationVerified
              ? "Your payment has been matched to a captured workshop payment record. Batch instructions and implementation updates should be sent through the registered WhatsApp communication flow."
              : "Opening a thank-you URL is not enough to confirm enrollment. A captured payment record is required. If you completed payment, use the original checkout flow or contact SikhaDenge support with your payment reference."}
          </p>

          {confirmationVerified ? (
            <div className="workshop-three-grid" style={{ marginTop: 32, textAlign: "left" }}>
              <article><strong>01</strong><h3>Check WhatsApp</h3><p>Batch instructions and session updates should arrive on the registered number.</p></article>
              <article><strong>02</strong><h3>Keep a laptop ready</h3><p>This is an implementation workshop, so practical work matters more than passive watching.</p></article>
              <article><strong>03</strong><h3>Complete the outputs</h3><p>Assignments and the mini-project are what convert the workshop into a usable skill system.</p></article>
            </div>
          ) : null}
        </section>

        <footer className="workshop-footer">
          <span>SikhaDenge • ThinkGrow Private Limited</span>
          <p>SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI and Claude is a product of Anthropic.</p>
          <nav><a href="/terms">Terms</a><a href="/privacy-policy">Privacy</a><a href="/refund-policy">Refund Policy</a></nav>
        </footer>
      </main>
    </>
  );
}
