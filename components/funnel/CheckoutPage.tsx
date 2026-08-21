"use client";

import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import type { FunnelConfig } from "../../lib/funnel/types";
import type { CheckoutPurpose } from "../../lib/funnel/checkoutToken";
import { trackFunnelEvent } from "../../lib/funnel/client";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: any) => void) => void;
    };
  }
}

type OrderData = {
  ok: true;
  alreadyPaid?: boolean;
  confirmationUrl?: string;
  keyId?: string;
  paymentRecordId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  name?: string;
  email?: string;
  contact?: string;
  description?: string;
};

export default function CheckoutPage({
  config,
  purpose = "masterclass_entry",
}: {
  config: FunnelConfig;
  purpose?: CheckoutPurpose;
}) {
  const router = useRouter();
  const leadId = typeof router.query.lead_id === "string" ? router.query.lead_id : "";
  const checkoutToken = typeof router.query.token === "string" ? router.query.token : "";
  const [sdkReady, setSdkReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "paying" | "verifying" | "error">("idle");
  const [message, setMessage] = useState("");

  const isWorkshop = purpose === "implementation_workshop";
  const isCore = purpose === "core_program";
  const price = useMemo(
    () => (isCore ? config.coreProgramPrice : isWorkshop ? config.workshopPrice : config.entryPrice),
    [config.coreProgramPrice, config.entryPrice, config.workshopPrice, isCore, isWorkshop]
  );
  const productTitle = isCore
    ? config.coreProgramName
    : isWorkshop
      ? config.workshopName
      : `${config.productLabel} Live Masterclass`;

  useEffect(() => {
    if (!router.isReady) return;
    if (!leadId || !checkoutToken) {
      setStatus("error");
      setMessage(
        isCore
          ? "This AI Expert Program checkout link is incomplete. Open the personalized program offer issued after your implementation workshop."
          : isWorkshop
            ? "This secure workshop checkout link is incomplete. Open the personalized workshop link sent to your registered WhatsApp number."
            : "This secure checkout link is incomplete. Please return to the masterclass page and register again."
      );
    }
  }, [router.isReady, leadId, checkoutToken, isCore, isWorkshop]);

  async function startPayment() {
    if (!leadId || !checkoutToken || status === "loading" || status === "paying" || status === "verifying") return;
    if (!sdkReady || !window.Razorpay) {
      setStatus("error");
      setMessage("Secure payment window is still loading. Please try again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const orderResponse = await fetch("/api/funnel/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, funnel: config.product, purpose, checkoutToken }),
      });
      const order = (await orderResponse.json()) as OrderData & { error?: string };
      if (!orderResponse.ok || !order.ok) throw new Error(order.error || "Unable to start payment");

      if (order.alreadyPaid && order.confirmationUrl) {
        window.location.assign(order.confirmationUrl);
        return;
      }

      if (!order.keyId || !order.paymentRecordId || !order.orderId || !order.amount || !order.currency) {
        throw new Error("Secure checkout is not fully configured");
      }

      setStatus("paying");
      const checkoutEvent = isCore ? "core_checkout_started" : isWorkshop ? "workshop_checkout_started" : "begin_checkout";
      void trackFunnelEvent(
        config,
        checkoutEvent,
        { value: price, currency: "INR", provider: "razorpay", payment_purpose: purpose },
        leadId
      );

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "SikhaDenge",
        description: order.description || productTitle,
        order_id: order.orderId,
        image: "/funnels/shared/sikhadenge-logo.png",
        prefill: { name: order.name || "", email: order.email || "", contact: order.contact || "" },
        notes: { lead_id: leadId, funnel: config.product, batch_id: config.batchId, purpose },
        theme: { color: isCore ? "#2563EB" : config.theme === "amber" ? "#D97757" : "#10A37F" },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setMessage("Payment window closed. Enrollment is not confirmed until payment succeeds.");
          },
        },
        handler: async (result: any) => {
          setStatus("verifying");
          setMessage("Payment received. Securely verifying it now…");
          try {
            const verifyResponse = await fetch("/api/funnel/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentRecordId: order.paymentRecordId,
                razorpay_order_id: result.razorpay_order_id,
                razorpay_payment_id: result.razorpay_payment_id,
                razorpay_signature: result.razorpay_signature,
              }),
            });
            const verified = await verifyResponse.json();
            if (!verifyResponse.ok || !verified?.ok) throw new Error(verified?.error || "Payment verification failed");

            if (verified.purchaseEventId) {
              const purchaseEvent = isCore ? "close_convert_lead" : isWorkshop ? "workshop_purchase" : "purchase";
              void trackFunnelEvent(
                config,
                purchaseEvent,
                { value: price, currency: "INR", provider: "razorpay", payment_purpose: purpose },
                leadId,
                { persist: false, eventId: verified.purchaseEventId }
              );
            }

            setMessage(
              isCore
                ? "Payment verified. Your AI Expert Program enrollment is confirmed."
                : isWorkshop
                  ? "Payment verified. Your implementation workshop enrollment is confirmed."
                  : "Payment verified. Your masterclass seat is confirmed."
            );
            if (verified.confirmationUrl) window.setTimeout(() => window.location.assign(verified.confirmationUrl), 250);
          } catch (error) {
            setStatus("error");
            setMessage(error instanceof Error ? error.message : "Payment was received but verification needs attention. Please contact support.");
          }
        },
      });

      razorpay.on("payment.failed", (failure: any) => {
        setStatus("error");
        setMessage(failure?.error?.description || "Payment did not complete. No enrollment has been marked as paid.");
      });
      razorpay.open();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to open secure checkout");
    }
  }

  const busy = status === "loading" || status === "paying" || status === "verifying";
  const stageLabel = isCore ? "Advanced Program" : isWorkshop ? "Implementation" : "Masterclass";
  const stageClass = isCore ? "core" : isWorkshop ? "workshop" : "masterclass";

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
        onError={() => {
          setSdkReady(false);
          setMessage("Secure payment library could not load. Please check your connection and retry.");
        }}
      />

      <main className={`funnel-checkout-shell funnel-stage-${stageClass} funnel-theme-${isCore ? "blue" : config.theme}`}>
        <header className="funnel-checkout-topbar">
          <Image src="/funnels/shared/sikhadenge-logo.png" width={166} height={52} alt="SikhaDenge" priority />
          <span>{isCore ? "Secure AI Expert Program checkout" : isWorkshop ? "Secure implementation workshop checkout" : "Secure masterclass checkout"}</span>
        </header>

        <section className="funnel-checkout-wrap">
          <div className="funnel-checkout-copy">
            <span className="funnel-kicker">FINAL STEP</span>
            <h1>
              {isCore
                ? "Confirm your SikhaDenge AI Expert Program enrollment."
                : isWorkshop
                  ? `Confirm your ${config.productLabel} implementation workshop enrollment.`
                  : `Confirm your ${config.productLabel} masterclass seat.`}
            </h1>
            <p>
              {isCore
                ? "Your implementation-workshop purchase and original acquisition attribution are linked. Complete the verified program payment to activate enrollment."
                : isWorkshop
                  ? "Your masterclass lead and attribution are linked. Complete the secure workshop payment to activate the next implementation stage."
                  : "Your registration details are saved. Complete the secure entry payment to confirm this paid masterclass seat."}
            </p>

            <div className="funnel-checkout-trust">
              <div><strong>Server-fixed price</strong><span>The browser cannot change the payable amount.</span></div>
              <div><strong>Verified payment</strong><span>Signature, exact amount and captured provider status are checked before confirmation.</span></div>
              <div><strong>Correct revenue stage</strong><span>{isCore ? "Core-program revenue stays separate from entry and workshop revenue." : isWorkshop ? "Workshop revenue stays separate from masterclass entry revenue." : "Only a verified successful entry payment is counted as a purchase."}</span></div>
            </div>
          </div>

          <aside className="funnel-payment-card">
            <div className="funnel-payment-title"><span>{productTitle}</span><strong>₹{price}</strong></div>
            <dl>
              <div><dt>Format</dt><dd>Live / structured online</dd></div>
              <div><dt>Stage</dt><dd>{stageLabel}</dd></div>
              <div><dt>Source track</dt><dd>{config.productLabel}</dd></div>
              <div><dt>Language</dt><dd>{config.languageLabel}</dd></div>
            </dl>
            <div className="funnel-payment-total"><span>Amount payable</span><strong>₹{price}</strong></div>
            <button type="button" className="funnel-primary-button funnel-pay-button" disabled={busy || !leadId || !checkoutToken} onClick={startPayment}>
              {status === "loading" ? "Preparing secure payment…" : status === "paying" ? "Payment window open…" : status === "verifying" ? "Verifying payment…" : `Pay ₹${price} Securely`}
            </button>
            <p className="funnel-payment-note">Payment is processed by Razorpay. SikhaDenge does not store full card or banking credentials.</p>
            {message ? <div className={`funnel-payment-message ${status === "error" ? "is-error" : ""}`} role="status">{message}</div> : null}
          </aside>
        </section>

        <footer className="funnel-checkout-footer">
          <span>SikhaDenge · ThinkGrow Private Limited</span>
          <nav><a href="/privacy-policy">Privacy</a><a href="/terms">Terms</a><a href="/refund-policy">Refund Policy</a></nav>
        </footer>
      </main>
    </>
  );
}
