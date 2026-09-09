"use client";

import { useState } from "react";

type Provider = "META_WHATSAPP" | "META_INSTAGRAM" | "META_MESSENGER";

type VerificationResult = {
  provider: Provider;
  verified: boolean;
  checkedAt: string;
  statusCode: number | null;
  accountReference: string | null;
  reason: string;
  externalWriteSent: false;
};

const PROVIDERS: Array<{ provider: Provider; label: string }> = [
  { provider: "META_WHATSAPP", label: "WhatsApp Cloud API" },
  { provider: "META_INSTAGRAM", label: "Instagram" },
  { provider: "META_MESSENGER", label: "Messenger" },
];

export default function VerifiedConnectionHealth() {
  const [busy, setBusy] = useState<Provider | "">("");
  const [results, setResults] = useState<Partial<Record<Provider, VerificationResult>>>({});
  const [error, setError] = useState("");

  async function verify(provider: Provider) {
    setBusy(provider);
    setError("");
    try {
      const response = await fetch("/api/integrations/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      const payload = (await response.json()) as VerificationResult & { error?: string };
      if (!response.ok && !payload.provider) {
        throw new Error(payload.error || "Connection verification failed.");
      }
      setResults((current) => ({ ...current, [provider]: payload }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Connection verification failed.");
    } finally {
      setBusy("");
    }
  }

  return (
    <section className="suite-card">
      <header>
        <div>
          <span>Verified connection health</span>
          <h3>Read-only provider identity checks</h3>
          <p>These checks make GET-only provider API calls. They do not send messages, create campaigns or expose access tokens.</p>
        </div>
      </header>

      {error ? <div className="suite-alert error">{error}</div> : null}

      <div className="suite-list">
        {PROVIDERS.map(({ provider, label }) => {
          const result = results[provider];
          return (
            <article key={provider}>
              <div>
                <strong>{label}</strong>
                <small>
                  {result
                    ? `${result.verified ? "Verified" : "Not verified"} · ${result.reason}`
                    : "Not verified in this browser session."}
                </small>
              </div>
              <div className="suite-actions">
                {result ? (
                  <span className={result.verified ? "ok" : "warn"}>
                    {result.verified ? "API verified" : "Verification required"}
                  </span>
                ) : null}
                <button
                  type="button"
                  disabled={busy === provider}
                  onClick={() => void verify(provider)}
                >
                  {busy === provider ? "Verifying…" : "Verify connection"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
