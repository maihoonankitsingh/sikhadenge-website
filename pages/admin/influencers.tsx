import React, { useEffect, useMemo, useState } from "react";

type InfluencerItem = {
  id: string;
  name: string;
  email: string | null;
  promoCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  _count?: { leads: number };
};

type ListRes =
  | { ok: true; items: InfluencerItem[] }
  | { ok: false; error?: string };

export default function AdminInfluencersPage() {
  const [items, setItems] = useState<InfluencerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdMsg, setCreatedMsg] = useState<string | null>(null);

  const [rowBusyId, setRowBusyId] = useState<string | null>(null);

  const canCreate = useMemo(() => {
    return name.trim().length >= 2 && promoCode.trim().length >= 3 && password.length >= 6 && !creating;
  }, [name, promoCode, password, creating]);

  async function load() {
    setErr(null);
    setLoading(true);
    const res = await fetch("/api/admin/influencers");
    if (!res.ok) {
      window.location.href = "/admin/login";
      return;
    }
    const j = (await res.json().catch(() => null)) as ListRes | null;
    if (!j || j.ok !== true) {
      setErr(j?.error || "Failed to load");
      setLoading(false);
      return;
    }
    setItems(j.items);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createInfluencer(e: React.FormEvent) {
    e.preventDefault();
    if (!canCreate) return;

    setCreating(true);
    setErr(null);
    setCreatedMsg(null);

    try {
      const res = await fetch("/api/admin/influencers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() ? email.trim() : undefined,
          promoCode: promoCode.trim(),
          password,
        }),
      });

      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Create failed");

      setName("");
      setEmail("");
      setPromoCode("");
      setPassword("");
      setCreatedMsg(`Created: ${j.item.promoCode}`);
      await load();
    } catch (e: any) {
      setErr(e?.message || "Create failed");
    } finally {
      setCreating(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/admin/login";
  }

  async function toggleActive(it: InfluencerItem) {
    setRowBusyId(it.id);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/influencers/${it.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !it.isActive }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      await load();
    } catch (e: any) {
      setErr(e?.message || "Update failed");
    } finally {
      setRowBusyId(null);
    }
  }

  async function resetPassword(it: InfluencerItem) {
    const newPassword = window.prompt(`Set new password for ${it.name} (${it.promoCode}). Min 6 chars:`);
    if (!newPassword) return;

    setRowBusyId(it.id);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/influencers/${it.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Password reset failed");
      setCreatedMsg(`Password updated for: ${it.promoCode}`);
    } catch (e: any) {
      setErr(e?.message || "Password reset failed");
    } finally {
      setRowBusyId(null);
    }
  }

  return (
    <div style={{ minHeight: "100vh", padding: 16 }}>
      <div
        style={{
          width: "min(1100px, 100%)",
          margin: "0 auto",
          background: "rgba(255,255,255,.96)",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 18px 50px rgba(0,0,0,.20)",
          border: "1px solid rgba(15,23,42,.12)",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Influencers</div>
            <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
              Manage promo codes + passwords
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="/admin" style={{ fontWeight: 800, fontSize: 14 }}>Dashboard</a>
            <button
              onClick={logout}
              style={{
                height: 42,
                padding: "0 14px",
                borderRadius: 12,
                border: "1px solid rgba(15,23,42,.14)",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {(err || createdMsg) && (
          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
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
            {createdMsg && (
              <div
                style={{
                  fontSize: 12,
                  color: "#166534",
                  background: "rgba(22,101,52,.08)",
                  border: "1px solid rgba(22,101,52,.18)",
                  padding: "10px 12px",
                  borderRadius: 12,
                }}
              >
                {createdMsg}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 14, marginTop: 14 }}>
          {/* Create */}
          <div
            style={{
              border: "1px solid rgba(15,23,42,.12)",
              borderRadius: 16,
              padding: 14,
              background: "rgba(255,255,255,.92)",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Create influencer</div>

            <form onSubmit={createInfluencer} style={{ display: "grid", gap: 10 }}>
              <Field label="Name *">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul" />
              </Field>

              <Field label="Email (optional)">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@email.com"
                />
              </Field>

              <Field label="Promo code *">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. SDRAM10"
                />
              </Field>

              <Field label="Password * (min 6 chars)">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="set login password"
                />
              </Field>

              <button
                type="submit"
                disabled={!canCreate}
                style={{
                  height: 46,
                  borderRadius: 14,
                  border: "none",
                  cursor: canCreate ? "pointer" : "not-allowed",
                  fontWeight: 900,
                  fontSize: 14,
                  color: "#fff",
                  background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
                  boxShadow: "0 12px 26px rgba(255,107,90,.35)",
                  opacity: canCreate ? 1 : 0.65,
                }}
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </form>
          </div>

          {/* List */}
          <div
            style={{
              border: "1px solid rgba(15,23,42,.12)",
              borderRadius: 16,
              padding: 14,
              background: "rgba(255,255,255,.92)",
              overflow: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 900 }}>All influencers</div>
              <button
                onClick={load}
                style={{
                  height: 36,
                  padding: "0 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(15,23,42,.14)",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div style={{ marginTop: 12, color: "rgba(15,23,42,.7)" }}>Loading...</div>
            ) : items.length === 0 ? (
              <div style={{ marginTop: 12, color: "rgba(15,23,42,.7)" }}>No influencers yet.</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: 13 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: "rgba(15,23,42,.72)" }}>
                    <th style={th}>Name</th>
                    <th style={th}>Promo</th>
                    <th style={th}>Email</th>
                    <th style={th}>Leads</th>
                    <th style={th}>Active</th>
                    <th style={th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => {
                    const busy = rowBusyId === it.id;
                    return (
                      <tr key={it.id} style={{ borderTop: "1px solid rgba(15,23,42,.08)" }}>
                        <td style={td}><b>{it.name}</b></td>
                        <td style={td}><code>{it.promoCode}</code></td>
                        <td style={td}>{it.email || "-"}</td>
                        <td style={td}>{it._count?.leads ?? 0}</td>
                        <td style={td}>{it.isActive ? "Yes" : "No"}</td>
                        <td style={td}>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <button
                              disabled={busy}
                              onClick={() => toggleActive(it)}
                              style={{
                                height: 34,
                                padding: "0 10px",
                                borderRadius: 12,
                                border: "1px solid rgba(15,23,42,.14)",
                                background: "#fff",
                                cursor: busy ? "not-allowed" : "pointer",
                                fontWeight: 900,
                                fontSize: 12.5,
                                opacity: busy ? 0.6 : 1,
                              }}
                            >
                              {it.isActive ? "Disable" : "Enable"}
                            </button>

                            <button
                              disabled={busy}
                              onClick={() => resetPassword(it)}
                              style={{
                                height: 34,
                                padding: "0 10px",
                                borderRadius: 12,
                                border: "1px solid rgba(15,23,42,.14)",
                                background: "#fff",
                                cursor: busy ? "not-allowed" : "pointer",
                                fontWeight: 900,
                                fontSize: 12.5,
                                opacity: busy ? 0.6 : 1,
                              }}
                            >
                              Reset password
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(15,23,42,.75)" }}>{label}</label>
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

const th: React.CSSProperties = { padding: "10px 8px", fontWeight: 900, fontSize: 12.5 };
const td: React.CSSProperties = { padding: "10px 8px", color: "rgba(15,23,42,.85)" };

