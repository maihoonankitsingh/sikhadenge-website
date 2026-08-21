"use client";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { FunnelConfig } from "../../../lib/funnel/types";
import { trackFunnelEvent } from "../../../lib/funnel/client";
import CoreHeroSection from "./CoreHeroSection";
import CoreOutcomesSection from "./CoreOutcomesSection";
import CoreRoadmapSection from "./CoreRoadmapSection";
import CoreEnrollmentSection from "./CoreEnrollmentSection";
import CoreFaqSection from "./CoreFaqSection";

export default function CoreProgramPage({
  config,
  leadId,
  eligible,
}: {
  config: FunnelConfig;
  leadId: string;
  eligible: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const advisorUrl = process.env.NEXT_PUBLIC_AI_EXPERT_ADVISOR_URL || "";

  useEffect(() => {
    if (!eligible || !leadId) return;
    void trackFunnelEvent(
      config,
      "core_offer_seen",
      { value: config.coreProgramPrice, currency: "INR", program: "ai_expert" },
      leadId
    );
  }, [config, eligible, leadId]);

  async function startEnrollment() {
    if (!eligible || !leadId || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/funnel/core/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      const body = await response.json();
      if (!response.ok || !body?.ok) throw new Error(body?.error || "Unable to prepare program checkout");
      if (body.alreadyEnrolled && body.confirmationUrl) {
        window.location.assign(body.confirmationUrl);
        return;
      }
      if (!body.checkoutUrl) throw new Error("Secure checkout link was not created");
      window.location.assign(body.checkoutUrl);
    } catch (error) {
      setBusy(false);
      setMessage(error instanceof Error ? error.message : "Unable to continue to secure checkout");
    }
  }

  function openAdvisor() {
    if (!advisorUrl || !eligible || !leadId) return;
    void trackFunnelEvent(
      config,
      "advisor_cta_click",
      { program: "ai_expert", value: config.coreProgramPrice },
      leadId
    );
    window.open(advisorUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Head>
        <title>{config.coreProgramName} | SikhaDenge</title>
        <meta
          name="description"
          content="Advanced SikhaDenge AI Expert Program offer for verified implementation-workshop learners."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="core-shell">
        <header className="core-topbar">
          <Image src="/funnels/shared/sikhadenge-logo.png" width={168} height={54} alt="SikhaDenge" priority />
          <span>AI Expert Program • Verified Workshop Learner Offer</span>
        </header>

        {eligible ? (
          <>
            <CoreHeroSection config={config} />
            <CoreOutcomesSection />
            <CoreRoadmapSection config={config} />
            <CoreEnrollmentSection
              config={config}
              busy={busy}
              message={message}
              advisorAvailable={Boolean(advisorUrl)}
              onEnroll={startEnrollment}
              onAdvisor={openAdvisor}
            />
            <CoreFaqSection />
          </>
        ) : (
          <section className="core-access-blocked">
            <span className="core-kicker">PERSONALIZED BACKEND OFFER</span>
            <h1>This program offer is not active for this link.</h1>
            <p>
              The AI Expert Program checkout in this funnel is available only after a verified implementation-workshop purchase. Open the personalized link issued to the registered workshop learner.
            </p>
            <a href="/" className="core-secondary-link">Return to SikhaDenge</a>
          </section>
        )}

        <footer className="core-footer">
          <div>
            <strong>SikhaDenge • ThinkGrow Private Limited</strong>
            <span>Independent AI education and practical skill development.</span>
          </div>
          <p>
            SikhaDenge is not affiliated with or endorsed by OpenAI or Anthropic. Educational participation does not guarantee employment, income, salary or business outcomes.
          </p>
          <nav><a href="/terms">Terms</a><a href="/privacy-policy">Privacy</a><a href="/refund-policy">Refund Policy</a></nav>
        </footer>
      </main>
    </>
  );
}
