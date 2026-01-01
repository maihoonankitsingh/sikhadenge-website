import React, { useEffect, useMemo, useState } from "react";

type LeadItem = {
  id: string;
  name: string | null;
  phone: string | null;
  source: string | null;
  status: string | null;
  promoCode: string | null;
  createdAt: string;
  influencerId: string | null;
  influencer: null | { id: string; name: string; promoCode: string; isActive: boolean };
  notes: string | null;
};

type LeadsRes =
  | { ok: true; total: number; take: number; skip: number; items: LeadItem[] }
  | { ok: false; error?: string };

const STATUS_OPTIONS = ["new", "called", "followup", "converted", "not_interested"] as const;

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [skip, setSkip] = useState(0);
  const take = 30;

  const [rowBusyId, setRowBusyId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<Record<string, string>>({});

  const page = useMemo(() => Math.floor(skip / take) + 1, [skip]);

  async function load(nextSkip = 0) {
    setErr(null);
    setMsg(null);
    setLoading(true);

    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status.trim()) params.set("status", status.trim());
    params.set("take", String(take));
    params.set("skip", String(nextSkip));

    const res = await fetch("/api/admin/leads?" + params.toString());
    if (!res.ok) {
      window.location.href = "/admin/login";
      return;
    }
    const j = (await res.json().catch(() => null)) as LeadsRes | null;
    if (!j || j.ok !== true) {
      setErr(j?.error || "Failed to load");
      setLoading(false);
      return;
    }

    setItems(j.items);
    setSkip(nextSkip);
    const ds: Record<string, string> = {};
    j.items.forEach((it) => {
      ds[it.id] = it.status || "new";
    });
    setDraftStatus(ds);
    setLoading(false);
  }

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    load(0);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/admin/login";
  }

  async function saveStatus(id: string) {
    const next = draftStatus[id];
    if (!next) return;

    setRowBusyId(id);
    setErr(null);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) throw new Error(j?.error || "Update failed");
      setMsg("Saved");
      await load(skip);
    } catch (e: any) {
      setErr(e?.message || "Update failed");
    } finally {
      setRowBusyId(null);
    }
  }

  return (
    <div style={{ minHeight: "100vh", padding: 16 }}>
      <div
        style={{
          width: "min(1200px, 100%)",
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
            <div style={{ fontWeight: 900, fontSize: 18 }}>Leads</div>
            <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
              Search + promo tracking + status update
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="/admin" style={{ fontWeight: 800, fontSize: 14 }}>Dashboard</a>
            <a href="/admin/influencers" style={{ fontWeight: 800, fontSize: 14 }}>Influencers</a>
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

        <form onSubmit={onSearch} style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={pill}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: name / phone / promo / influencer"
              style={pillInput}
            />
          </div>

          <div style={pill}>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={pillInput as any}>
              <option value="">All status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button type="submit" style={primaryBtn}>
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              setQ("");
              setStatus("");
              load(0);
            }}
            style={ghostBtn}
          >
            Reset
          </button>
        </form>

        {(err || msg) && (
          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            {err && <div style={{ ...errorBox }}>{err}</div>}
            {msg && <div style={{ ...successBox }}>{msg}</div>}
          </div>
        )}

        <div style={{ marginTop: 12, border: "1px solid rgba(15,23,42,.10)", borderRadius: 16, overflow: "auto" }}>
          {loading ? (
            <div style={{ padding: 12, color: "rgba(15,23,42,.7)" }}>Loading...</div>
          ) : items.length === 0 ? (
            <div style={{ padding: 12, color: "rgba(15,23,42,.7)" }}>No leads found.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "rgba(15,23,42,.72)" }}>
                  <th style={th}>Date</th>
                  <th style={th}>Name</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Promo</th>
                  <th style={th}>Influencer</th>
                  <th style={th}>Source</th>
                  <th style={th}>Status</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => {
                  const busy = rowBusyId === it.id;
                  const cur = draftStatus[it.id] ?? (it.status || "new");
                  return (
                    <tr key={it.id} style={{ borderTop: "1px solid rgba(15,23,42,.08)" }}>
                      <td style={td}>{new Date(it.createdAt).toLocaleString()}</td>
                      <td style={td}><b>{it.name || "-"}</b></td>
                      <td style={td}>{it.phone || "-"}</td>
                      <td style={td}>{it.promoCode ? <code>{it.promoCode}</code> : "-"}</td>
                      <td style={td}>
                        {it.influencer ? (
                          <span>
                            <b>{it.influencer.name}</b>{" "}
                            <span style={{ color: "rgba(15,23,42,.62)" }}>({it.influencer.promoCode})</span>
                          </span>
                        ) : "-"}
                      </td>
                      <td style={td}>{it.source || "-"}</td>

                      <td style={td}>
                        <div style={pillSmall}>
                          <select
                            value={cur}
                            onChange={(e) =>
                              setDraftStatus((p) => ({
                                ...p,
                                [it.id]: e.target.value,
                              }))
                            }
                            style={{ ...pillInputSmall }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td style={td}>
                        <button
                          disabled={busy}
                          onClick={() => saveStatus(it.id)}
                          style={{
                            height: 36,
                            padding: "0 12px",
                            borderRadius: 12,
                            border: "none",
                            cursor: busy ? "not-allowed" : "pointer",
                            fontWeight: 900,
                            fontSize: 13,
                            color: "#fff",
                            background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
                            boxShadow: "0 10px 20px rgba(255,107,90,.28)",
                            opacity: busy ? 0.7 : 1,
                          }}
                        >
                          {busy ? "Saving..." : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
            Page {page} (showing {items.length})
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => load(Math.max(0, skip - take))}
              disabled={skip === 0 || loading}
              style={{
                ...ghostBtn,
                opacity: skip === 0 || loading ? 0.6 : 1,
                cursor: skip === 0 || loading ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => load(skip + take)}
              disabled={items.length < take || loading}
              style={{
                ...ghostBtn,
                opacity: items.length < take || loading ? 0.6 : 1,
                cursor: items.length < take || loading ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const pill: React.CSSProperties = {
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(15,23,42,.14)",
  background: "#fff",
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
};

const pillSmall: React.CSSProperties = {
  height: 36,
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,.14)",
  background: "#fff",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
};

const pillInput: React.CSSProperties = {
  width: 320,
  maxWidth: "70vw",
  border: "none",
  outline: "none",
  fontSize: 14,
  background: "transparent",
};

const pillInputSmall: React.CSSProperties = {
  width: 160,
  border: "none",
  outline: "none",
  fontSize: 13,
  background: "transparent",
};

const primaryBtn: React.CSSProperties = {
  height: 42,
  padding: "0 14px",
  borderRadius: 14,
  border: "none",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 14,
  color: "#fff",
  background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
  boxShadow: "0 12px 26px rgba(255,107,90,.35)",
};

const ghostBtn: React.CSSProperties = {
  height: 42,
  padding: "0 14px",
  borderRadius: 14,
  border: "1px solid rgba(15,23,42,.14)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 14,
};

const th: React.CSSProperties = { padding: "10px 10px", fontWeight: 900, fontSize: 12.5, whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "10px 10px", color: "rgba(15,23,42,.85)", whiteSpace: "nowrap" };

const errorBox: React.CSSProperties = {
  fontSize: 12,
  color: "#b91c1c",
  background: "rgba(185,28,28,.08)",
  border: "1px solid rgba(185,28,28,.18)",
  padding: "10px 12px",
  borderRadius: 12,
};

const successBox: React.CSSProperties = {
  fontSize: 12,
  color: "#166534",
  background: "rgba(22,101,52,.08)",
  border: "1px solid rgba(22,101,52,.18)",
  padding: "10px 12px",
  borderRadius: 12,
};

