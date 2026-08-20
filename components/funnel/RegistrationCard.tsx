"use client";

import { FormEvent, useMemo, useState } from "react";
import type { FunnelConfig } from "../../lib/funnel/types";
import { getAttribution, trackFunnelEvent } from "../../lib/funnel/client";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  goal: string;
  laptop: string;
  hp: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  occupation: "",
  goal: "",
  laptop: "",
  hp: "",
};

export default function RegistrationCard({ config }: { config: FunnelConfig }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const priceLabel = useMemo(
    () => (config.offerMode === "free" ? "FREE" : `₹${config.entryPrice}`),
    [config.entryPrice, config.offerMode]
  );

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    const attribution = getAttribution();

    try {
      const response = await fetch("/api/funnel/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          funnel: config.product,
          offerMode: config.offerMode,
          entryPrice: config.entryPrice,
          batchId: `${config.product}:${config.dateLabel}:${config.timeLabel}`,
          page: window.location.pathname,
          attribution,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      void trackFunnelEvent(
        config,
        "generate_lead",
        { registration_status: "success" },
        data.leadId,
        { persist: false }
      );

      setStatus("done");

      if (config.offerMode === "paid") {
        if (data.checkoutUrl) {
          setCheckoutUrl(data.checkoutUrl);
          setMessage(
            `Registration details saved. Continue to the secure ₹${config.entryPrice} checkout.`
          );
        } else {
          setMessage(
            "Your details are saved. Paid checkout is not active on this preview yet."
          );
        }
      } else {
        setMessage(
          "Registration confirmed. Joining instructions will be sent to your registered WhatsApp number."
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div id="register" className="funnel-register-card" aria-label="Masterclass registration">
      <div className="funnel-register-head">
        <span className="funnel-kicker">RESERVE YOUR SEAT</span>
        <strong>{priceLabel}</strong>
        <p>
          {config.offerMode === "free"
            ? "Complete the form once. We will send the live-session instructions on WhatsApp."
            : `Complete the form, then continue to the ₹${config.entryPrice} secure checkout.`}
        </p>
      </div>

      <form onSubmit={submit} className="funnel-form">
        <label>
          Full name
          <input
            required
            minLength={2}
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Your full name"
          />
        </label>

        <div className="funnel-form-grid">
          <label>
            WhatsApp number
            <input
              required
              inputMode="numeric"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="10-digit mobile number"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
          />
          </label>
        </div>

        <div className="funnel-form-grid">
          <label>
            Current status
            <select
              required
              value={form.occupation}
              onChange={(e) => setForm({ ...form, occupation: e.target.value })}
            >
              <option value="">Select one</option>
              <option>Student / Job Seeker</option>
              <option>Working Professional</option>
              <option>Freelancer / Creator</option>
              <option>Business Owner</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Primary goal
            <select
              required
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            >
              <option value="">Select one</option>
              <option>Career / Job</option>
              <option>Work Productivity</option>
              <option>Freelancing / Content</option>
              <option>Business Growth</option>
              <option>Study / Research</option>
            </select>
          </label>
        </div>

        <label>
          Laptop access for practical work
          <select
            required
            value={form.laptop}
            onChange={(e) => setForm({ ...form, laptop: e.target.value })}
          >
            <option value="">Select one</option>
            <option value="yes">Yes, I have access</option>
            <option value="sometimes">Sometimes / shared device</option>
            <option value="no">No, mobile only</option>
          </select>
        </label>

        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="funnel-hp"
          value={form.hp}
          onChange={(e) => setForm({ ...form, hp: e.target.value })}
          name="company_website"
        />

        <button
          type="submit"
          className="funnel-primary-button"
          disabled={status === "sending"}
          onClick={() => void trackFunnelEvent(config, "registration_submit_click")}
        >
          {status === "sending" ? "Saving..." : config.ctaLabel}
        </button>

        <p className="funnel-form-note">
          By registering, you agree to receive masterclass-related updates from SikhaDenge.
          You can opt out of promotional communication later.
        </p>

        {message ? (
          <div
            className={`funnel-status ${status === "error" ? "is-error" : "is-success"}`}
            role="status"
          >
            {message}
            {checkoutUrl ? (
              <a
                className="funnel-checkout-link"
                href={checkoutUrl}
                onClick={() => void trackFunnelEvent(config, "begin_checkout")}
              >
                Continue to secure checkout →
              </a>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}
