// =============================================================
// QuizPanel — lesson quiz lene ka UI (student).
// Answers submit karne par server auto-grade karta hai aur correct
// answers reveal hote hain.
// =============================================================

import React, { useCallback, useEffect, useState } from "react";

type Question = { id: string; text: string; options: string[]; order: number };
type BestAttempt = { score: number; total: number; passed: boolean } | null;
type Result = { score: number; total: number; passed: boolean; passPercent: number; correct: number[] } | null;

export default function QuizPanel({ lessonId }: { lessonId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [passPercent, setPassPercent] = useState(60);
  const [best, setBest] = useState<BestAttempt>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setResult(null);
    setAnswers({});
    const r = await fetch(`/api/student/quiz/${lessonId}`);
    const j = await r.json().catch(() => null);
    if (r.ok && j?.ok) {
      setQuestions(j.quiz.questions || []);
      setPassPercent(j.quiz.passPercent);
      setBest(j.bestAttempt || null);
      setErr(null);
    } else {
      setErr(j?.error || "No quiz");
    }
    setLoading(false);
  }, [lessonId]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit() {
    if (Object.keys(answers).length !== questions.length) {
      setErr("Please answer all questions");
      return;
    }
    setErr(null);
    setBusy(true);
    const ordered = questions.map((_, i) => answers[i]);
    const r = await fetch(`/api/student/quiz/${lessonId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: ordered }),
    });
    const j = await r.json().catch(() => null);
    if (r.ok && j?.ok) setResult(j);
    else setErr(j?.error || "Submit failed");
    setBusy(false);
  }

  if (loading) return <Box>Loading quiz…</Box>;
  if (err && questions.length === 0) return <Box>{err}</Box>;

  return (
    <Box>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 15 }}>Quiz</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Pass: {passPercent}%{best ? ` · Best: ${best.score}/${best.total}` : ""}</div>
      </div>

      {questions.map((q, qi) => (
        <div key={q.id} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{qi + 1}. {q.text}</div>
          <div style={{ display: "grid", gap: 6 }}>
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const isCorrect = result && result.correct[qi] === oi;
              const isWrongChosen = result && chosen && result.correct[qi] !== oi;
              return (
                <label
                  key={oi}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,.12)",
                    background: isCorrect ? "rgba(74,222,128,.15)" : isWrongChosen ? "rgba(239,68,68,.15)" : chosen ? "rgba(255,107,90,.12)" : "transparent",
                    cursor: result ? "default" : "pointer",
                    fontSize: 13.5,
                  }}
                >
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    checked={chosen}
                    disabled={!!result}
                    onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  />
                  {opt}
                  {isCorrect && <span style={{ marginLeft: "auto", color: "#4ade80", fontWeight: 800 }}>✓</span>}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {err && <div style={{ color: "#ffb4a8", fontSize: 12.5, marginBottom: 10 }}>{err}</div>}

      {result ? (
        <div style={{ padding: "12px 14px", borderRadius: 12, background: result.passed ? "rgba(74,222,128,.15)" : "rgba(239,68,68,.15)", fontSize: 14, fontWeight: 800 }}>
          {result.passed ? "🎉 Passed!" : "Try again"} — Score: {result.score}/{result.total}
          <button onClick={load} style={{ ...retryBtn }}>Retake</button>
        </div>
      ) : (
        <button onClick={submit} disabled={busy} style={submitBtn}>{busy ? "Submitting…" : "Submit Quiz"}</button>
      )}
    </Box>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "#111827", borderRadius: 12, padding: 18 }}>{children}</div>;
}

const submitBtn: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 12,
  border: "none",
  fontWeight: 900,
  fontSize: 13.5,
  color: "#fff",
  background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)",
  cursor: "pointer",
};
const retryBtn: React.CSSProperties = {
  marginLeft: 12,
  padding: "6px 12px",
  borderRadius: 9,
  border: "1px solid rgba(255,255,255,.2)",
  background: "transparent",
  color: "#fff",
  fontWeight: 800,
  fontSize: 12,
  cursor: "pointer",
};
