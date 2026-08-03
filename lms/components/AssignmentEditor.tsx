// =============================================================
// AssignmentEditor (admin) — ASSIGNMENT lesson ki instructions + due date.
// Course-builder me use hota hai (upsert).
// =============================================================

import React, { useState } from "react";

export default function AssignmentEditor({ lessonId }: { lessonId: string }) {
  const [instructions, setInstructions] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSaved(false);
    const r = await fetch("/api/admin/lms/assignment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId,
        instructions: instructions.trim(),
        dueAt: dueAt ? new Date(dueAt).toISOString() : undefined,
      }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) return setErr(j?.error || "Save failed");
    setSaved(true);
  }

  return (
    <form onSubmit={save} style={{ background: "#f8fafc", borderRadius: 10, padding: 12, marginTop: 8, display: "grid", gap: 6 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#334155" }}>Assignment details</div>
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions (what to submit, requirements…)"
        rows={3}
        style={{ borderRadius: 8, border: "1px solid rgba(15,23,42,.16)", padding: 10, fontSize: 13, outline: "none", resize: "vertical" }}
      />
      <label style={{ fontSize: 12, color: "#64748b" }}>Due date (optional)</label>
      <input type="datetime-local" value={dueAt} onChange={(e) => setDueAt(e.target.value)} style={{ height: 34, borderRadius: 8, border: "1px solid rgba(15,23,42,.16)", padding: "0 10px", fontSize: 13, outline: "none" }} />
      {err && <div style={{ color: "#b91c1c", fontSize: 12 }}>{err}</div>}
      {saved && <div style={{ color: "#16a34a", fontSize: 12 }}>Saved ✓</div>}
      <button type="submit" style={{ justifySelf: "start", padding: "6px 12px", borderRadius: 8, border: "none", background: "#3730a3", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>Save</button>
    </form>
  );
}
