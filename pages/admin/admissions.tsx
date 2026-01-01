import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";

type MeOk = { ok: true; user: { username: string } };
type MeFail = { ok: false };
type MeResponse = MeOk | MeFail;

type Admission = {
  id: string;
  leadId?: string | null;
  name: string;
  phone: string;
  course?: string | null;
  feeTotal?: number | null;
  feePaid?: number | null;
  createdAt: string;
};

export default function AdminAdmissions() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState<Admission[]>([]);
  const [total, setTotal] = useState(0);
  const [take] = useState(25);
  const [skip, setSkip] = useState(0);

  const [form, setForm] = useState({
    leadId: "",
    name: "",
    phone: "",
    course: "",
    feeTotal: "",
    feePaid: "",
  });

  const pages = useMemo(() => Math.max(1, Math.ceil(total / take)), [total, take]);
  const pageNo = useMemo(() => Math.floor(skip / take) + 1, [skip, take]);

  async function loadMe() {
    const r = await fetch("/api/admin/me", { credentials: "include" });
    const j = (await r.json()) as MeResponse;
    setMe(j);
    return j;
  }

  async function loadList(nextSkip = skip) {
    const r = await fetch(`/api/admin/admissions?take=${take}&skip=${nextSkip}`, {
      credentials: "include",
    });
    const j = await r.json();
    if (j?.ok) {
      setItems(j.items || []);
      setTotal(j.total || 0);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const m = await loadMe();
      if (!m.ok) {
        window.location.href = "/admin/login?next=/admin/admissions";
        return;
      }
      await loadList(0);
      setSkip(0);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  }

  async function createAdmission(e: any) {
    e.preventDefault();
    const payload = {
      leadId: form.leadId.trim() || null,
      name: form.name.trim(),
      phone: form.phone.trim(),
      course: form.course.trim() || null,
      feeTotal: form.feeTotal.trim() ? Number(form.feeTotal) : null,
      feePaid: form.feePaid.trim() ? Number(form.feePaid) : 0,
    };

    const r = await fetch("/api/admin/admissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const j = await r.json();
    if (!j?.ok) {
      alert(j?.error || "Create failed");
      return;
    }

    setForm({ leadId: "", name: "", phone: "", course: "", feeTotal: "", feePaid: "" });
    await loadList(0);
    setSkip(0);
  }

  if (loading) return null;

  return (
    <>
      <Head>
        <title>Admin • Admissions</title>
      </Head>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 18px 40px" }}>
        <div
          style={{
            background: "rgba(255,255,255,.94)",
            borderRadius: 18,
            padding: 18,
            border: "1px solid rgba(15,23,42,.10)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Admissions</div>
              <div style={{ fontSize: 12, color: "rgba(15,23,42,.62)" }}>
                Signed in as {"ok" in (me || {}) && (me as any).ok ? <b>{(me as MeOk).user.username}</b> : null}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Link href="/admin" style={{ fontWeight: 700, fontSize: 13 }}>
                Dashboard
              </Link>
              <Link href="/admin/leads" style={{ fontWeight: 700, fontSize: 13 }}>
                Leads
              </Link>
              <Link href="/admin/influencers" style={{ fontWeight: 700, fontSize: 13 }}>
                Influencers
              </Link>
              <button
                onClick={logout}
                style={{
                  border: "1px solid rgba(15,23,42,.12)",
                  borderRadius: 12,
                  padding: "8px 12px",
                  fontWeight: 800,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 14, marginTop: 14 }}>
            <div style={{ border: "1px solid rgba(15,23,42,.10)", borderRadius: 16, padding: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Create admission</div>

              <form onSubmit={createAdmission} style={{ display: "grid", gap: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>
                  Lead ID (optional)
                  <input
                    value={form.leadId}
                    onChange={(e) => setForm((s) => ({ ...s, leadId: e.target.value }))}
                    placeholder="Lead id if converting"
                    style={inputStyle}
                  />
                </label>

                <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>
                  Name *
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Student name"
                    style={inputStyle}
                    required
                  />
                </label>

                <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>
                  Phone *
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="10-digit"
                    style={inputStyle}
                    required
                  />
                </label>

                <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>
                  Course
                  <input
                    value={form.course}
                    onChange={(e) => setForm((s) => ({ ...s, course: e.target.value }))}
                    placeholder="Course name"
                    style={inputStyle}
                  />
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>
                    Fee Total
                    <input
                      value={form.feeTotal}
                      onChange={(e) => setForm((s) => ({ ...s, feeTotal: e.target.value }))}
                      placeholder="e.g. 15000"
                      style={inputStyle}
                    />
                  </label>
                  <label style={{ fontSize: 12, fontWeight: 800, color: "rgba(15,23,42,.75)" }}>
                    Fee Paid
                    <input
                      value={form.feePaid}
                      onChange={(e) => setForm((s) => ({ ...s, feePaid: e.target.value }))}
                      placeholder="e.g. 1000"
                      style={inputStyle}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 4,
                    border: 0,
                    borderRadius: 14,
                    padding: "12px 12px",
                    fontWeight: 900,
                    cursor: "pointer",
                    background: "linear-gradient(180deg, #ff7b6d, #ff6b5a)",
                    color: "#fff",
                  }}
                >
                  Create
                </button>
              </form>
            </div>

            <div style={{ border: "1px solid rgba(15,23,42,.10)", borderRadius: 16, padding: 14, overflow: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div style={{ fontWeight: 900 }}>All admissions</div>
                <button
                  onClick={() => loadList(skip)}
                  style={{
                    border: "1px solid rgba(15,23,42,.12)",
                    borderRadius: 12,
                    padding: "8px 12px",
                    fontWeight: 800,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Refresh
                </button>
              </div>

              <div style={{ marginTop: 10, fontSize: 12, color: "rgba(15,23,42,.65)" }}>
                Total: <b>{total}</b> • Page <b>{pageNo}</b>/<b>{pages}</b>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: 13 }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(15,23,42,.10)" }}>
                    <th style={th}>Date</th>
                    <th style={th}>Name</th>
                    <th style={th}>Phone</th>
                    <th style={th}>Course</th>
                    <th style={th}>Fee</th>
                    <th style={th}>Paid</th>
                    <th style={th}>LeadId</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} style={{ borderBottom: "1px solid rgba(15,23,42,.06)" }}>
                      <td style={td}>{new Date(it.createdAt).toLocaleString()}</td>
                      <td style={td}><b>{it.name}</b></td>
                      <td style={td}>{it.phone}</td>
                      <td style={td}>{it.course || "-"}</td>
                      <td style={td}>{it.feeTotal ?? "-"}</td>
                      <td style={td}>{it.feePaid ?? "-"}</td>
                      <td style={td}>{it.leadId || "-"}</td>
                    </tr>
                  ))}
                  {items.length === 0 ? (
                    <tr>
                      <td style={{ ...td, padding: "14px 10px", color: "rgba(15,23,42,.55)" }} colSpan={7}>
                        No admissions found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
                <button
                  disabled={skip === 0}
                  onClick={async () => {
                    const next = Math.max(0, skip - take);
                    setSkip(next);
                    await loadList(next);
                  }}
                  style={pagerBtn(skip === 0)}
                >
                  Prev
                </button>

                <button
                  disabled={skip + take >= total}
                  onClick={async () => {
                    const next = skip + take;
                    setSkip(next);
                    await loadList(next);
                  }}
                  style={pagerBtn(skip + take >= total)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: "rgba(15,23,42,.55)" }}>
            Next: leads page se “Convert to admission” button.
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: "11px 12px",
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,.12)",
  outline: "none",
  fontSize: 14,
};

const th: React.CSSProperties = { padding: "10px 10px", fontSize: 12, color: "rgba(15,23,42,.65)" };
const td: React.CSSProperties = { padding: "10px 10px", verticalAlign: "top" };

function pagerBtn(disabled: boolean): React.CSSProperties {
  return {
    border: "1px solid rgba(15,23,42,.12)",
    borderRadius: 12,
    padding: "8px 12px",
    fontWeight: 800,
    background: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };
}

