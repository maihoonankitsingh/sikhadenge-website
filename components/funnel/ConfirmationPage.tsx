"use client";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import type { FunnelConfig } from "../../lib/funnel/types";
import { trackFunnelEvent } from "../../lib/funnel/client";

function getCommunityUrl(product: FunnelConfig["product"]) {
  if (product === "chatgpt") {
    return (
      process.env.NEXT_PUBLIC_CHATGPT_COMMUNITY_URL ||
      process.env.NEXT_PUBLIC_MASTERCLASS_COMMUNITY_URL ||
      ""
    );
  }

  return (
    process.env.NEXT_PUBLIC_CLAUDE_COMMUNITY_URL ||
    process.env.NEXT_PUBLIC_MASTERCLASS_COMMUNITY_URL ||
    ""
  );
}

function getSupportWhatsAppUrl() {
  return process.env.NEXT_PUBLIC_FUNNEL_SUPPORT_WHATSAPP_URL || "";
}

export default function ConfirmationPage({ config }: { config: FunnelConfig }) {
  const router = useRouter();
  const leadId = typeof router.query.lead_id === "string" ? router.query.lead_id : undefined;
  const communityUrl = useMemo(() => getCommunityUrl(config.product), [config.product]);
  const supportWhatsAppUrl = getSupportWhatsAppUrl();

  return (
    <>
      <Head>
        <title>Registration Confirmed | {config.productLabel} Masterclass | SikhaDenge</title>
        <meta
          name="description"
          content={`Your SikhaDenge ${config.productLabel} Masterclass registration is confirmed.`}
        />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className={`funnel-confirmation funnel-theme-${config.theme}`}>
        <header className="funnel-confirmation-header">
          <a href="https://sikhadenge.in" aria-label="SikhaDenge home">
            <Image
              src="/funnels/shared/sikhadenge-logo.png"
              width={170}
              height={54}
              priority
              alt="SikhaDenge"
            />
          </a>
        </header>

        <section className="funnel-confirmation-card">
          <div className="funnel-confirmation-check" aria-hidden="true">✓</div>
          <span className="funnel-kicker">REGISTRATION CONFIRMED</span>
          <h1>Your {config.productLabel} Masterclass seat is registered.</h1>
          <p className="funnel-confirmation-lead">
            Critical joining instructions and reminders will be sent to the WhatsApp number you used while registering.
          </p>

          <div className="funnel-confirmation-event">
            <div><small>MASTERCLASS</small><strong>{config.productLabel}</strong></div>
            <div><small>DATE</small><strong>{config.dateLabel}</strong></div>
            <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
            <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
          </div>

          <div className="funnel-confirmation-steps">
            <article>
              <span>01</span>
              <div><h2>Check WhatsApp</h2><p>Your direct session communication will come to your registered number.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h2>Join the Community if you want shared updates</h2><p>Community is an engagement layer. Your critical joining information does not depend only on Community membership.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h2>Join from a distraction-free setup</h2><p>Keep a laptop available when possible so you can follow the practical workflows properly.</p></div>
            </article>
          </div>

          <div className="funnel-confirmation-actions">
            {communityUrl ? (
              <a
                className="funnel-primary-button"
                href={communityUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  void trackFunnelEvent(
                    config,
                    "community_click",
                    { destination: "official_masterclass_community" },
                    leadId
                  )
                }
              >
                Join WhatsApp Community
              </a>
            ) : null}

            {supportWhatsAppUrl ? (
              <a
                className="funnel-secondary-button"
                href={supportWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  void trackFunnelEvent(
                    config,
                    "whatsapp_cta_click",
                    { destination: "funnel_support" },
                    leadId
                  )
                }
              >
                Contact Support on WhatsApp
              </a>
            ) : null}
          </div>

          <p className="funnel-confirmation-note">
            SikhaDenge is an independent education provider operated by ThinkGrow Private Limited. ChatGPT is a product of OpenAI and Claude is a product of Anthropic. No affiliation or endorsement is implied.
          </p>
        </section>
      </main>
    </>
  );
}
