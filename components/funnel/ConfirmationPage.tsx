"use client";

import Head from "next/head";
import Image from "next/image";
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

export default function ConfirmationPage({
  config,
  confirmationVerified,
  leadId,
}: {
  config: FunnelConfig;
  confirmationVerified: boolean;
  leadId?: string;
}) {
  const communityUrl = useMemo(() => getCommunityUrl(config.product), [config.product]);
  const supportWhatsAppUrl = getSupportWhatsAppUrl();
  const isPaid = config.offerMode === "paid";
  const canConfirmSeat = confirmationVerified;

  const title = canConfirmSeat
    ? isPaid
      ? `Payment Verified | ${config.productLabel} Masterclass | SikhaDenge`
      : `Registration Confirmed | ${config.productLabel} Masterclass | SikhaDenge`
    : isPaid
      ? `Payment Not Confirmed | ${config.productLabel} Masterclass | SikhaDenge`
      : `Registration Not Confirmed | ${config.productLabel} Masterclass | SikhaDenge`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            canConfirmSeat
              ? `Your SikhaDenge ${config.productLabel} Masterclass seat is confirmed.`
              : `Your SikhaDenge ${config.productLabel} Masterclass confirmation could not be verified.`
          }
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
          <div
            className={`funnel-confirmation-check ${!canConfirmSeat ? "is-pending" : ""}`}
            aria-hidden="true"
          >
            {canConfirmSeat ? "✓" : "!"}
          </div>

          <span className="funnel-kicker">
            {canConfirmSeat
              ? isPaid
                ? "PAYMENT VERIFIED • SEAT CONFIRMED"
                : "REGISTRATION CONFIRMED"
              : isPaid
                ? "PAYMENT NOT VERIFIED"
                : "REGISTRATION NOT VERIFIED"}
          </span>

          <h1>
            {canConfirmSeat
              ? isPaid
                ? `Payment verified. Your ${config.productLabel} Masterclass seat is confirmed.`
                : `Your ${config.productLabel} Masterclass seat is registered.`
              : isPaid
                ? `Your ${config.productLabel} Masterclass paid seat is not confirmed yet.`
                : `We could not verify this ${config.productLabel} Masterclass registration.`}
          </h1>

          <p className="funnel-confirmation-lead">
            {canConfirmSeat
              ? "Critical joining instructions and reminders will be sent to the WhatsApp number you used while registering."
              : isPaid
                ? "A paid seat is confirmed only after SikhaDenge verifies a captured payment in the payment system. If you have not completed payment, return to the paid masterclass page and register again."
                : "This confirmation link does not match a valid stored registration. Please return to the masterclass page and complete the registration form."}
          </p>

          <div className="funnel-confirmation-event">
            <div><small>MASTERCLASS</small><strong>{config.productLabel}</strong></div>
            <div><small>DATE</small><strong>{config.dateLabel}</strong></div>
            <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
            <div><small>{isPaid ? "ENTRY" : "LANGUAGE"}</small><strong>{isPaid ? `₹${config.entryPrice}` : config.languageLabel}</strong></div>
          </div>

          {canConfirmSeat ? (
            <>
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
            </>
          ) : (
            <div className="funnel-confirmation-actions">
              <a
                className="funnel-primary-button"
                href={`/masterclass/${config.product}/${isPaid ? "paid" : "free"}`}
              >
                Return to Masterclass Registration
              </a>
              {supportWhatsAppUrl ? (
                <a className="funnel-secondary-button" href={supportWhatsAppUrl} target="_blank" rel="noreferrer">
                  Contact Support
                </a>
              ) : null}
            </div>
          )}

          <p className="funnel-confirmation-note">
            SikhaDenge is an independent education provider operated by ThinkGrow Private Limited. ChatGPT is a product of OpenAI and Claude is a product of Anthropic. No affiliation or endorsement is implied.
          </p>
        </section>
      </main>
    </>
  );
}
