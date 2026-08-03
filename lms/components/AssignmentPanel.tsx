// =============================================================
// AssignmentPanel — project/assignment submit karne ka UI (student).
// File link (Drive/Behance/YouTube etc.) ya text submit karo; instructor
// grade + feedback deta hai jo yahin dikhta hai.
// =============================================================

import React, { useCallback, useEffect, useState } from "react";

type Assignment = { instructions: string | null; dueAt: string | null };
type Submission = {
  fileUrl: string | null;
  text: string | null;
  grade: number | null;
  feedback: string | null;
  status: string;
  submittedAt: string;
} | null;

export default function AssignmentPanel({ lessonId }: { lessonId: string }) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submission, setSubmission] = useState<Submission>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`/api/student/assignment/${lessonId}`);
    const j = await r.json().catch(() => null);
    if (r.ok && j?.ok) {
      setAssignment(j.assignment);
      setSubmission(j.submission || null);
      setFileUrl(j.submission?.fileUrl || "");
      setText(j.submission?.text || "");
      setErr(null);
    } else {
      setErr(j?.error || "No assignment");
    }
    setLoading(false);
  }, [lessonId]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit() {
    if (!fileUrl.trim() && !text.trim()) {
      setErr("Add a file link or text");
      return;
    }
    setErr(null);
    setBusy(true);
    const r = await fetch(`/api/student/assignment/${lessonId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl: fileUrl.trim(), text: text.trim() }),
    });
    const j = await r.json().catch(() => null);
    if (r.ok && j?.ok) await load();
    else setErr(j?.error || "Submit failed");
    setBusy(false);
  }

  if (loading) return <Box>Loading assignment…</Box>;
  if (err && !assignment) return <Box>{err}</Box>;

  const graded = submission?.status === "graded";

  return (
    <Box>
      <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>Assignment</div>
      {assignment?.instructions && (
        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.75)", whiteSpace: "pre-wrap", marginBottom: 10, lineHeight: 1.5 }}>
          {assignment.instructions}
        </div>
      )}
      {assignment?.dueAt && (
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 12 }}>
          Due: {new Date(assignment.dueAt).toLocaleString()}
        </div>
      )}

      {graded && (
        <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(74,222,128,.15)", marginBottom: 14 }}>
          <div style={{ fontWeight: 900, fontSize: 15 }}>Grade: {submission?.grade}/100</div>
          {submission?.feedback && <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", marginTop: 4 }}>{submission.feedback}</div>}
        </div>
      )}

      {submission && !graded && (
        <div style={{ fontSize: 12.5, color: "#facc15", marginBottom: 12 }}>Submitted — awaiting review.</div>
      )}

      <label style={label}>Submission link (Drive / Behance / YouTube / etc.)</label>
      <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://…" style={input} />

      <label style={{ ...label, marginTop: 10 }}>Notes (optional)</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Anything you want to add…" style={{ ...input, height: "auto", padding: 10, resize: "vertical" }} />

      {err && <div style={{ color: "#ffb4a8", fontSize: 12.5, marginTop: 8 }}>{err}</div>}

      <button onClick={submit} disabled={busy} style={submitBtn}>
        {busy ? "Submitting…" : submission ? "Re-submit" : "Submit"}
      </button>
    </Box>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "#111827", borderRadius: 12, padding: 18 }}>{children}</div>;
}

const label: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 800, color: "rgba(255,255,255,.7)", marginBottom: 6 };
const input: React.CSSProperties = {
  width: "100%",
  height: 42,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(255,255,255,.04)",
  color: "#fff",
  padding: "0 12px",
  fontSize: 13.5,
  outline: "none",
};
const submitBtn: React.CSSProperties = {
  marginTop: 14,
  padding: "10px 18px",
  borderRadius: 12,
  border: "none",
  fontWeight: 900,
  fontSize: 13.5,
  color: "#fff",
  background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)",
  cursor: "pointer",
};
