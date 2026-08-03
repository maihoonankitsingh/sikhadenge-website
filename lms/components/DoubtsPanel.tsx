// =============================================================
// DoubtsPanel — course ke doubts (student). Ask + list + reply + resolve.
// Learn page ke bottom me lagta hai (course-level discussion).
// =============================================================

import React, { useCallback, useEffect, useState } from "react";

type Reply = { id: string; body: string; authorName: string; isStaff: boolean; createdAt: string };
type Doubt = {
  id: string;
  title: string;
  body: string;
  authorName: string;
  resolved: boolean;
  createdAt: string;
  isOwn: boolean;
  replies: Reply[];
};

export default function DoubtsPanel({ courseId, lessonId }: { courseId: string; lessonId?: string }) {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [asking, setAsking] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const r = await fetch(`/api/student/doubts?courseId=${courseId}`);
    const j = await r.json().catch(() => null);
    if (j?.ok) setDoubts(j.doubts || []);
    setLoading(false);
  }, [courseId]);

  useEffect(() => {
    load();
  }, [load]);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (title.trim().length < 3 || body.trim().length < 3) {
      setErr("Title aur detail dono likho (min 3 chars)");
      return;
    }
    const r = await fetch("/api/student/doubts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, lessonId, title: title.trim(), body: body.trim() }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) return setErr(j?.error || "Could not post");
    setTitle("");
    setBody("");
    setAsking(false);
    await load();
  }

  return (
    <div style={{ marginTop: 22, background: "#0f172a", borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 15 }}>Doubts & Discussion</div>
        <button onClick={() => setAsking((v) => !v)} style={askBtn}>{asking ? "Cancel" : "Ask a doubt"}</button>
      </div>

      {asking && (
        <form onSubmit={ask} style={{ display: "grid", gap: 8, marginBottom: 16, padding: 12, background: "#111827", borderRadius: 10 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Doubt title" style={inp} autoFocus />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Apna doubt detail me likho…" rows={3} style={{ ...inp, height: "auto", padding: 10, resize: "vertical" }} />
          {err && <div style={{ color: "#ffb4a8", fontSize: 12 }}>{err}</div>}
          <button type="submit" style={postBtn}>Post doubt</button>
        </form>
      )}

      {loading ? (
        <div style={{ color: "rgba(255,255,255,.5)", fontSize: 13 }}>Loading…</div>
      ) : doubts.length === 0 ? (
        <div style={{ color: "rgba(255,255,255,.5)", fontSize: 13 }}>Abhi koi doubt nahi. Pehle tum pucho!</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {doubts.map((d) => (
            <DoubtCard key={d.id} doubt={d} onChange={load} />
          ))}
        </div>
      )}
    </div>
  );
}

function DoubtCard({ doubt, onChange }: { doubt: Doubt; onChange: () => void }) {
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);

  async function sendReply() {
    if (reply.trim().length < 1) return;
    await fetch(`/api/student/doubts/${doubt.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: reply.trim() }),
    });
    setReply("");
    await onChange();
  }

  async function toggleResolved() {
    await fetch(`/api/student/doubts/${doubt.id}/reply`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolved: !doubt.resolved }),
    });
    await onChange();
  }

  return (
    <div style={{ background: "#111827", borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>{doubt.title}</div>
        {doubt.resolved && <span style={{ fontSize: 11, fontWeight: 800, color: "#4ade80" }}>✓ Resolved</span>}
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginTop: 4, whiteSpace: "pre-wrap" }}>{doubt.body}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 4 }}>— {doubt.authorName}</div>

      {doubt.replies.length > 0 && (
        <div style={{ marginTop: 10, display: "grid", gap: 6, borderLeft: "2px solid rgba(255,255,255,.1)", paddingLeft: 10 }}>
          {doubt.replies.map((r) => (
            <div key={r.id} style={{ fontSize: 12.5 }}>
              <span style={{ fontWeight: 800, color: r.isStaff ? "#ff9d90" : "rgba(255,255,255,.85)" }}>
                {r.authorName}{r.isStaff ? " · Team" : ""}:
              </span>{" "}
              <span style={{ color: "rgba(255,255,255,.75)" }}>{r.body}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
        <button onClick={() => setOpen((v) => !v)} style={miniBtn}>Reply</button>
        {doubt.isOwn && <button onClick={toggleResolved} style={miniBtn}>{doubt.resolved ? "Reopen" : "Mark resolved"}</button>}
      </div>

      {open && (
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply…" style={{ ...inp, flex: 1 }} />
          <button onClick={sendReply} style={postBtn}>Send</button>
        </div>
      )}
    </div>
  );
}

const inp: React.CSSProperties = {
  height: 40,
  borderRadius: 9,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(255,255,255,.04)",
  color: "#fff",
  padding: "0 12px",
  fontSize: 13.5,
  outline: "none",
};
const askBtn: React.CSSProperties = { padding: "7px 14px", borderRadius: 9, border: "1px solid rgba(255,255,255,.2)", background: "transparent", color: "#fff", fontWeight: 800, fontSize: 12.5, cursor: "pointer" };
const postBtn: React.CSSProperties = { padding: "8px 16px", borderRadius: 9, border: "none", background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)", color: "#fff", fontWeight: 900, fontSize: 12.5, cursor: "pointer" };
const miniBtn: React.CSSProperties = { padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "rgba(255,255,255,.8)", fontWeight: 700, fontSize: 11.5, cursor: "pointer" };
