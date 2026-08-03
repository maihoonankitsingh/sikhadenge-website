import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Submission = {
  id: string;
  fileUrl: string | null;
  text: string | null;
  grade: number | null;
  feedback: string | null;
  status: string;
  submittedAt: string;
  user: { name: string; email: string | null; phone: string | null };
  assignment: { lesson: { title: string; module: { course: { title: string } } } };
};

export default function AdminSubmissions() {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [status, setStatus] = useState("submitted");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/lms/submissions?status=${status}`);
    if (r.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const j = await r.json().catch(() => null);
    if (j?.ok) setSubs(j.submissions || []);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900 }}>Assignment Submissions</h1>
        <Link href="/admin/lms" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>← Courses</Link>
      </div>

      <div style={{ display: "flex", gap: 8, margin: "14px 0" }}>
        {["submitted", "graded", "all"].map((s) => (
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
      ) : subs.length === 0 ? (
        <div style={{ color: "#64748b", fontSize: 13 }}>No submissions.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {subs.map((s) => (
            <SubmissionCard key={s.id} sub={s} onGraded={load} />
          ))}
        </div>
      )}
    </Shell>
  );
}

function SubmissionCard({ sub, onGraded }: { sub: Submission; onGraded: () => void }) {
  const [grade, setGrade] = useState(sub.grade?.toString() ?? "");
  const [feedback, setFeedback] = useState(sub.feedback ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submitGrade() {
    setErr(null);
    setBusy(true);
    const r = await fetch("/api/admin/lms/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId: sub.id, grade: Number(grade), feedback }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) setErr(j?.error || "Failed");
    else onGraded();
    setBusy(false);
  }

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{sub.user.name}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{sub.user.email || sub.user.phone || ""}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{sub.assignment.lesson.module.course.title}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{sub.assignment.lesson.title}</div>
        </div>
      </div>

      <div style={{ margin: "10px 0", fontSize: 13 }}>
        {sub.fileUrl && (
          <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#3730a3", fontWeight: 700 }}>
            🔗 Open submission
          </a>
        )}
        {sub.text && <div style={{ marginTop: 6, color: "#334155", whiteSpace: "pre-wrap" }}>{sub.text}</div>}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade /100" inputMode="numeric" style={{ ...inp, width: 100 }} />
        <input value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Feedback" style={{ ...inp, flex: 1, minWidth: 160 }} />
        <button onClick={submitGrade} disabled={busy} style={gradeBtn}>{busy ? "…" : sub.status === "graded" ? "Update" : "Grade"}</button>
        {sub.status === "graded" && <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 800 }}>Graded: {sub.grade}</span>}
      </div>
      {err && <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>{err}</div>}
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
const gradeBtn: React.CSSProperties = { height: 38, padding: "0 16px", borderRadius: 9, border: "none", background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)", color: "#fff", fontWeight: 900, fontSize: 12.5, cursor: "pointer" };
