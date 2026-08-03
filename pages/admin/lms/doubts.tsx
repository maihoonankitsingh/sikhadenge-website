import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Reply = { id: string; body: string; authorName: string; isStaff: boolean; createdAt: string };
type Doubt = {
  id: string;
  title: string;
  body: string;
  authorName: string;
  resolved: boolean;
  createdAt: string;
  course: { title: string };
  replies: Reply[];
};

export default function AdminDoubts() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/lms/doubts?status=${status}`);
    if (r.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const j = await r.json().catch(() => null);
    if (j?.ok) setDoubts(j.doubts || []);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900 }}>Doubts & Discussion</h1>
        <Link href="/admin/lms" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>← Courses</Link>
      </div>

      <div style={{ display: "flex", gap: 8, margin: "14px 0" }}>
        {["open", "resolved", "all"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{ padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 12.5, background: status === s ? "#0f172a" : "#e2e8f0", color: status === s ? "#fff" : "#0f172a" }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : doubts.length === 0 ? (
        <div style={{ color: "#64748b", fontSize: 13 }}>No doubts.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {doubts.map((d) => (
            <DoubtCard key={d.id} doubt={d} onChange={load} />
          ))}
        </div>
      )}
    </Shell>
  );
}

function DoubtCard({ doubt, onChange }: { doubt: Doubt; onChange: () => void }) {
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    if (reply.trim().length < 1) return;
    setBusy(true);
    await fetch("/api/admin/lms/doubts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doubtId: doubt.id, body: reply.trim() }),
    });
    setReply("");
    setBusy(false);
    await onChange();
  }

  async function toggle() {
    await fetch("/api/admin/lms/doubts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doubtId: doubt.id, resolved: !doubt.resolved }),
    });
    await onChange();
  }

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>{doubt.title}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: "#64748b" }}>{doubt.course.title}</span>
          <button onClick={toggle} style={{ ...miniBtn, color: doubt.resolved ? "#92400e" : "#166534" }}>
            {doubt.resolved ? "Reopen" : "Resolve"}
          </button>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#334155", marginTop: 4, whiteSpace: "pre-wrap" }}>{doubt.body}</div>
      <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 3 }}>— {doubt.authorName}</div>

      {doubt.replies.length > 0 && (
        <div style={{ marginTop: 10, display: "grid", gap: 5, borderLeft: "2px solid #e2e8f0", paddingLeft: 10 }}>
          {doubt.replies.map((r) => (
            <div key={r.id} style={{ fontSize: 12.5 }}>
              <span style={{ fontWeight: 800, color: r.isStaff ? "#c2410c" : "#0f172a" }}>{r.authorName}{r.isStaff ? " · Team" : ""}:</span>{" "}
              <span style={{ color: "#475569" }}>{r.body}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Answer as Team…" style={{ ...inp, flex: 1 }} />
        <button onClick={send} disabled={busy} style={sendBtn}>{busy ? "…" : "Reply"}</button>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: 16, color: "#0f172a" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,.08)" }}>
        {children}
      </div>
    </div>
  );
}

const inp: React.CSSProperties = { height: 38, borderRadius: 9, border: "1px solid rgba(15,23,42,.16)", padding: "0 10px", fontSize: 13, outline: "none" };
const sendBtn: React.CSSProperties = { height: 38, padding: "0 16px", borderRadius: 9, border: "none", background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)", color: "#fff", fontWeight: 900, fontSize: 12.5, cursor: "pointer" };
const miniBtn: React.CSSProperties = { padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(15,23,42,.15)", background: "#fff", fontWeight: 800, fontSize: 11.5, cursor: "pointer" };
