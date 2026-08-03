import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import VideoPlayer from "../../../lms/components/VideoPlayer";
import QuizPanel from "../../../lms/components/QuizPanel";
import AssignmentPanel from "../../../lms/components/AssignmentPanel";
import DoubtsPanel from "../../../lms/components/DoubtsPanel";

type Lesson = {
  id: string;
  title: string;
  type: string;
  videoUrl: string | null;
  durationSec: number | null;
  contentMd: string | null;
  isPreview: boolean;
  completed: boolean;
  lastPosSec: number;
};
type Module = { id: string; title: string; lessons: Lesson[] };
type Course = {
  id: string;
  title: string;
  slug: string;
  modules: Module[];
  totalLessons: number;
  completedLessons: number;
};
type Me = { id: string; name: string; email: string | null; phone: string | null };

export default function LearnPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  const [me, setMe] = useState<Me | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!slug) return;
    const r = await fetch(`/api/student/content/${slug}`);
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) {
      setError(j?.error || "Could not load course");
      setLoading(false);
      return;
    }
    setCourse(j.course);
    setActiveId((prev) => prev ?? firstLessonId(j.course));
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/student/me");
      if (!r.ok) {
        window.location.href = "/student/login";
        return;
      }
      const j = await r.json().catch(() => null);
      if (j?.ok) setMe(j.user);
      await load();
    })();
  }, [load]);

  const active: Lesson | null = useMemo(() => {
    if (!course || !activeId) return null;
    for (const m of course.modules) {
      const l = m.lessons.find((x) => x.id === activeId);
      if (l) return l;
    }
    return null;
  }, [course, activeId]);

  const saveProgress = useCallback(
    async (lessonId: string, currentSec: number, completed: boolean) => {
      await fetch("/api/student/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, lastPosSec: Math.floor(currentSec), completed }),
      }).catch(() => null);
    },
    []
  );

  async function markComplete(lessonId: string) {
    await saveProgress(lessonId, active?.lastPosSec || 0, true);
    await load();
  }

  const watermark = me ? me.phone || me.email || me.name : undefined;

  if (loading) return <Shell><div style={{ padding: 24 }}>Loading...</div></Shell>;
  if (error) {
    return (
      <Shell>
        <div style={{ padding: 24 }}>
          <div style={{ color: "#ffb4a8", marginBottom: 12 }}>{error}</div>
          <Link href="/student" style={{ color: "#ff6b5a", fontWeight: 800 }}>← Back to dashboard</Link>
        </div>
      </Shell>
    );
  }
  if (!course) return null;

  const pct = course.totalLessons ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0;

  return (
    <Shell>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 20, alignItems: "start", padding: 20 }}>
        {/* Main */}
        <div>
          <Link href="/student" style={{ fontSize: 13, color: "rgba(255,255,255,.6)", textDecoration: "none" }}>← Dashboard</Link>
          <h1 style={{ fontSize: 20, fontWeight: 900, margin: "8px 0 16px" }}>{course.title}</h1>

          {active ? (
            <>
              {(active.type === "VIDEO" || active.type === "LIVE_RECORDING") && active.videoUrl ? (
                <VideoPlayer
                  key={active.id}
                  src={active.videoUrl}
                  watermark={watermark}
                  initialPosSec={active.lastPosSec}
                  onProgress={(t) => saveProgress(active.id, t, false)}
                  onComplete={() => markComplete(active.id)}
                />
              ) : active.type === "TEXT" && active.contentMd ? (
                <div style={{ background: "#111827", borderRadius: 12, padding: 18, whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 14 }}>
                  {active.contentMd}
                </div>
              ) : active.type === "QUIZ" ? (
                <QuizPanel key={active.id} lessonId={active.id} />
              ) : active.type === "ASSIGNMENT" ? (
                <AssignmentPanel key={active.id} lessonId={active.id} />
              ) : (
                <div style={{ background: "#111827", borderRadius: 12, padding: 40, textAlign: "center", color: "rgba(255,255,255,.5)" }}>
                  Content coming soon for this lesson.
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{active.title}</div>
                {active.completed ? (
                  <span style={{ fontSize: 12.5, color: "#4ade80", fontWeight: 800 }}>✓ Completed</span>
                ) : (
                  <button onClick={() => markComplete(active.id)} style={completeBtn}>Mark as complete</button>
                )}
              </div>
            </>
          ) : (
            <div style={{ color: "rgba(255,255,255,.6)" }}>Select a lesson from the right.</div>
          )}

          {/* Doubts & discussion (course-level) */}
          <DoubtsPanel courseId={course.id} lessonId={active?.id} />
        </div>

        {/* Sidebar */}
        <div style={{ background: "#0f172a", borderRadius: 14, border: "1px solid rgba(255,255,255,.08)", overflow: "hidden" }}>
          <div style={{ padding: 14, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", marginBottom: 6 }}>
              Progress: {course.completedLessons}/{course.totalLessons} ({pct}%)
            </div>
            <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,.1)", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#ff7a6d,#ff6b5a)" }} />
            </div>
          </div>

          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {course.modules.map((m, mi) => (
              <div key={m.id}>
                <div style={{ padding: "12px 14px 6px", fontSize: 12, fontWeight: 900, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                  {mi + 1}. {m.title}
                </div>
                {m.lessons.map((l) => {
                  const isActive = l.id === activeId;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setActiveId(l.id)}
                      style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "left",
                        gap: 10,
                        alignItems: "center",
                        padding: "10px 14px",
                        border: "none",
                        cursor: "pointer",
                        background: isActive ? "rgba(255,107,90,.14)" : "transparent",
                        color: "#fff",
                        borderLeft: isActive ? "3px solid #ff6b5a" : "3px solid transparent",
                      }}
                    >
                      <span style={{ fontSize: 13, color: l.completed ? "#4ade80" : "rgba(255,255,255,.35)" }}>
                        {l.completed ? "✓" : "○"}
                      </span>
                      <span style={{ fontSize: 13, flex: 1 }}>{l.title}</span>
                      <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.35)" }}>{lessonTag(l.type)}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function firstLessonId(course: Course): string | null {
  for (const m of course.modules) if (m.lessons[0]) return m.lessons[0].id;
  return null;
}

function lessonTag(type: string): string {
  if (type === "VIDEO") return "▶";
  if (type === "LIVE_RECORDING") return "REC";
  if (type === "PDF") return "PDF";
  if (type === "TEXT") return "TXT";
  if (type === "QUIZ") return "QUIZ";
  if (type === "ASSIGNMENT") return "TASK";
  return "";
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0B1220", color: "#fff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>{children}</div>
    </div>
  );
}

const completeBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 10,
  fontWeight: 800,
  fontSize: 12.5,
  color: "#fff",
  background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
  border: "none",
  cursor: "pointer",
};
