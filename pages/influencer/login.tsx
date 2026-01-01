import React, { useEffect, useState } from "react";

export default function InfluencerLogin() {
  const [promoCode, setPromoCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/influencer/me");
      if (r.ok) window.location.href = "/influencer";
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/influencer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promoCode: promoCode.trim(),
          password,
        }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Login failed");
      window.location.href = "/influencer";
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  const can = promoCode.trim().length >= 3 && password.length >= 1 && !busy;

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div
        style={{
          width: "min(480px, 100%)",
          borderRadius: 18,
          padding: 16,
          background: "rgba(255,255,255,.96)",
          border: "1px solid rgba(15,23,42,.12)",
          boxShadow: "0 18px 50px rgba(0,0,0,.20)",
          color: "#0f172a",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18 }}>Influencer Login</div>
        <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)", marginTop: 4 }}>
          Use your promo code + password
        </div>

        {err && (
          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              color: "#b91c1c",
              background: "rgba(185,28,28,.08)",
              border: "1px solid rgba(185,28,28,.18)",
              padding: "10px 12px",
              borderRadius: 12,
            }}
          >
            {err}
          </div>
        )}

        <form onSubmit={submit} style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <Field label="Promo code">
            <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="e.g. SDRAM10" />
          </Field>

          <Field label="Password">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </Field>

          <button
            type="submit"
            disabled={!can}
            style={{
              height: 46,
              borderRadius: 14,
              border: "none",
              cursor: can ? "pointer" : "not-allowed",
              fontWeight: 900,
              fontSize: 14,
              color: "#fff",
              background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
              boxShadow: "0 12px 26px rgba(255,107,90,.35)",
              opacity: can ? 1 : 0.65,
            }}
          >
            {busy ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>{label}</label>
      <div
        style={{
          border: "1px solid rgba(15,23,42,.14)",
          borderRadius: 14,
          background: "#fff",
          padding: "0 12px",
          height: 44,
          display: "flex",
          alignItems: "center",
        }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children as any, {
              style: {
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: 14,
                background: "transparent",
              },
            })
          : children}
      </div>
    </div>
  );
}
