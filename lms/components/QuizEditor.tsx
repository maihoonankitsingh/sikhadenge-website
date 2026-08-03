// =============================================================
// QuizEditor (admin) — QUIZ lesson me questions add/delete karna.
// Course-builder me use hota hai.
// =============================================================

import React, { useCallback, useEffect, useState } from "react";

type Question = { id: string; text: string; options: string[]; correctIndex: number };

export default function QuizEditor({ lessonId }: { lessonId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/lms/quiz?lessonId=${lessonId}`);
    const j = await r.json().catch(() => null);
    if (j?.ok) setQuestions(j.quiz?.questions || []);
  }, [lessonId]);

  useEffect(() => {
    load();
  }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const opts = options.map((o) => o.trim()).filter(Boolean);
    if (text.trim().length < 1) return setErr("Question text required");
    if (opts.length < 2) return setErr("At least 2 options");
    if (correct >= opts.length) return setErr("Correct answer must be a filled option");

    const r = await fetch("/api/admin/lms/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, text: text.trim(), options: opts, correctIndex: correct }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) return setErr(j?.error || "Add failed");
    setText("");
    setOptions(["", "", "", ""]);
    setCorrect(0);
    await load();
  }

  async function del(questionId: string) {
    await fetch("/api/admin/lms/quiz", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId }),
    });
    await load();
  }

  return (
    <div style={{ background: "#f8fafc", borderRadius: 10, padding: 12, marginTop: 8 }}>
      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#334155", marginBottom: 8 }}>Quiz questions ({questions.length})</div>

      {questions.map((q, qi) => (
        <div key={q.id} style={{ padding: "6px 0", borderBottom: "1px solid #eef2f7", fontSize: 12.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700 }}>{qi + 1}. {q.text}</span>
            <button onClick={() => del(q.id)} style={del_}>✕</button>
          </div>
          <div style={{ color: "#16a34a", marginTop: 2 }}>✓ {q.options[q.correctIndex]}</div>
        </div>
      ))}

      <form onSubmit={add} style={{ display: "grid", gap: 6, marginTop: 10 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Question" style={inp} />
        {options.map((o, i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input type="radio" name={`c-${lessonId}`} checked={correct === i} onChange={() => setCorrect(i)} title="Mark correct" />
            <input
              value={o}
              onChange={(e) => setOptions((prev) => prev.map((x, xi) => (xi === i ? e.target.value : x)))}
              placeholder={`Option ${i + 1}`}
              style={{ ...inp, flex: 1 }}
            />
          </div>
        ))}
        {err && <div style={{ color: "#b91c1c", fontSize: 12 }}>{err}</div>}
        <button type="submit" style={addBtn}>+ Add question</button>
      </form>
    </div>
  );
}

const inp: React.CSSProperties = { height: 34, borderRadius: 8, border: "1px solid rgba(15,23,42,.16)", padding: "0 10px", fontSize: 13, outline: "none" };
const addBtn: React.CSSProperties = { justifySelf: "start", padding: "6px 12px", borderRadius: 8, border: "none", background: "#3730a3", color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" };
const del_: React.CSSProperties = { border: "none", background: "transparent", color: "#dc2626", fontWeight: 800, cursor: "pointer" };
