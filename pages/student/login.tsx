import React, { useEffect, useState } from "react";

type Mode = "login" | "signup";

export default function StudentLogin() {
  const [mode, setMode] = useState<Mode>("login");

  // login fields
  const [identifier, setIdentifier] = useState("");
  // signup fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/student/me");
      if (r.ok) window.location.href = "/student";
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const url = mode === "login" ? "/api/student/login" : "/api/student/signup";
      const body =
        mode === "login"
          ? { identifier: identifier.trim(), password }
          : { name: name.trim(), email: email.trim(), phone: phone.trim(), password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Something went wrong");
      window.location.href = "/student";
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const can =
    mode === "login"
      ? identifier.trim().length >= 3 && password.length >= 1 && !busy
      : name.trim().length >= 2 &&
        (email.trim().length >= 3 || phone.trim().length >= 10) &&
        password.length >= 6 &&
        !busy;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
        background: "#0B1220",
      }}
    >
      <div
        style={{
          width: "min(460px, 100%)",
          borderRadius: 18,
          padding: 20,
          background: "rgba(255,255,255,.97)",
          border: "1px solid rgba(15,23,42,.12)",
          boxShadow: "0 18px 50px rgba(0,0,0,.35)",
          color: "#0f172a",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 20 }}>
          {mode === "login" ? "Student Login" : "Create your account"}
        </div>
        <div style={{ fontSize: 12.5, color: "rgba(15,23,42,.62)", marginTop: 4 }}>
          {mode === "login"
            ? "Login with your email or phone"
            : "Start learning with Sikhadenge"}
        </div>

        {err && (
          <div
            style={{
              marginTop: 12,
              fontSize: 12.5,
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
          {mode === "signup" && (
            <>
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </Field>
              <Field label="Email">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
              </Field>
              <Field label="Phone">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" placeholder="10-digit mobile" />
              </Field>
            </>
          )}

          {mode === "login" && (
            <Field label="Email or phone">
              <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email or 10-digit phone" />
            </Field>
          )}

          <Field label="Password">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={mode === "signup" ? "Min 6 characters" : "Password"}
            />
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
            {busy ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        <div style={{ marginTop: 14, fontSize: 12.5, color: "rgba(15,23,42,.7)", textAlign: "center" }}>
          {mode === "login" ? (
            <>
              New here?{" "}
              <button onClick={() => { setErr(null); setMode("signup"); }} style={linkBtn}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => { setErr(null); setMode("login"); }} style={linkBtn}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#ff6b5a",
  fontWeight: 900,
  cursor: "pointer",
  fontSize: 12.5,
  padding: 0,
};

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
        {React.isValidElement<{ style?: React.CSSProperties }>(children)
          ? React.cloneElement(children, {
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
