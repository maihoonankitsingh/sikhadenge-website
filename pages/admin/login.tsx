import React, { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Login failed");
      }
      window.location.href = "/admin";
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div
        style={{
          width: "min(420px, 100%)",
          background: "rgba(255,255,255,.96)",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 18px 50px rgba(0,0,0,.20)",
          border: "1px solid rgba(15,23,42,.12)",
          color: "#0f172a",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10, color: "#0f172a" }}>
          Admin Login
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(15,23,42,.75)" }}>
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                height: 46,
                borderRadius: 14,
                border: "1px solid rgba(15,23,42,.14)",
                padding: "0 12px",
                fontSize: 16,
                outline: "none",
              }}
              autoComplete="username"
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(15,23,42,.75)" }}>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              style={{
                height: 46,
                borderRadius: 14,
                border: "1px solid rgba(15,23,42,.14)",
                padding: "0 12px",
                fontSize: 16,
                outline: "none",
              }}
              autoComplete="current-password"
            />
          </div>

          {err && (
            <div
              style={{
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

          <button
            type="submit"
            disabled={loading}
            style={{
              height: 52,
              borderRadius: 14,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 900,
              fontSize: 15,
              color: "#fff",
              background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
              boxShadow: "0 14px 30px rgba(255,107,90,.42)",
              opacity: loading ? 0.75 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
            URL: <b>/admin</b>
          </div>
        </form>
      </div>
    </div>
  );
}

