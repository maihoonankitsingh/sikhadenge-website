import React, { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  name: string | null;
  phone: string | null;
  status: string | null;
  createdAt: string;
  course: string | null;
  promoCode: string | null;
  source: string | null;
};

type Res =
  | {
      ok: true;
      influencer: { id: string; name: string; promoCode: string };
      total: number;
      take: number;
      skip: number;
      items: Item[];
    }
  | { ok: false; error?: string };

export default function InfluencerDashboard() {
  const [me, setMe] = useState<{ name: string; promoCode: string } | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const take = 30;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const page = useMemo(() => Math.floor(skip / take) + 1, [skip]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / take)), [total]);

  async function load(nextSkip = 0) {
    setErr(null);
    setLoading(true);

    const params = new URLSearchParams();
    params.set("take", String(take));
    params.set("skip", String(nextSkip));

    const r = await fetch("/api/influencer/leads?" + params.toString());
    if (!r.ok) {
      window.location.href = "/influencer/login";
      return;
    }
    const j = (await r.json().catch(() => null)) as Res | null;
    if (!j || j.ok !== true) {
      window.location.href = "/influencer/login";
      return;
    }

    setMe({ name: j.influencer.name, promoCode: j.influencer.promoCode });
    setItems(j.items);
    setTotal(j.total);
    setSkip(nextSkip);
    setLoading(false);
  }

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await fetch("/api/influencer/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/influencer/login";
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
            <div style={{ fontWeight: 900, fontSize: 18 }}>Influencer Dashboard</div>
            <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
              {me ? (
                <>
                  <b>{me.name}</b> • Promo: <code>{me.promoCode}</code>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          </div>

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

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Stat title="Total Leads" value={String(total)} />
          <Stat title="This Page" value={String(items.length)} />
          <Stat title="Pages" value={`${page}/${totalPages}`} />
        </div>

        {err && <div style={{ marginTop: 12, ...errorBox }}>{err}</div>}

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
                  <th style={th}>Course</th>
                  <th style={th}>Status</th>
                  <th style={th}>Source</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} style={{ borderTop: "1px solid rgba(15,23,42,.08)" }}>
                    <td style={td}>{new Date(it.createdAt).toLocaleString()}</td>
                    <td style={td}>
                      <b>{it.name || "-"}</b>
                    </td>
                    <td style={td}>{it.phone || "-"}</td>
                    <td style={td}>{it.course || "-"}</td>
                    <td style={td}>{it.status || "-"}</td>
                    <td style={td}>{it.source || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
            Page {page} of {totalPages}
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
              disabled={skip + take >= total || loading}
              style={{
                ...ghostBtn,
                opacity: skip + take >= total || loading ? 0.6 : 1,
                cursor: skip + take >= total || loading ? "not-allowed" : "pointer",
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

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(15,23,42,.12)",
        borderRadius: 16,
        padding: 14,
        background: "rgba(255,255,255,.92)",
      }}
    >
      <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)", fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 4 }}>{value}</div>
    </div>
  );
}

const th: React.CSSProperties = { padding: "10px 10px", fontWeight: 900, fontSize: 12.5, whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "10px 10px", color: "rgba(15,23,42,.85)", whiteSpace: "nowrap" };

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

const errorBox: React.CSSProperties = {
  fontSize: 12,
  color: "#b91c1c",
  background: "rgba(185,28,28,.08)",
  border: "1px solid rgba(185,28,28,.18)",
  padding: "10px 12px",
  borderRadius: 12,
};
