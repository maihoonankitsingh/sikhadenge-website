import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type Lesson = { id: string; title: string; type: string; videoUrl: string | null; isPreview: boolean };
type Module = { id: string; title: string; lessons: Lesson[] };
type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  priceInr: number;
  isPublished: boolean;
  modules: Module[];
};

const LESSON_TYPES = ["VIDEO", "LIVE_RECORDING", "PDF", "TEXT", "QUIZ", "ASSIGNMENT"];

export default function AdminCourseEdit() {
  const router = useRouter();
  const id = typeof router.query.id === "string" ? router.query.id : "";

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [moduleTitle, setModuleTitle] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    if (!id) return;
    const r = await fetch(`/api/admin/lms/course/${id}`);
    if (r.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const j = await r.json().catch(() => null);
    if (j?.ok) setCourse(j.course);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function patchCourse(data: Record<string, unknown>) {
    const r = await fetch(`/api/admin/lms/course/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) setMsg(j?.error || "Update failed");
    await load();
  }

  async function addModule(e: React.FormEvent) {
    e.preventDefault();
    if (moduleTitle.trim().length < 2) return;
    await fetch("/api/admin/lms/module", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: id, title: moduleTitle.trim() }),
    });
    setModuleTitle("");
    await load();
  }

  async function delModule(moduleId: string) {
    if (!confirm("Delete this module and all its lessons?")) return;
    await fetch("/api/admin/lms/module", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId }),
    });
    await load();
  }

  if (loading) return <Shell><div>Loading...</div></Shell>;
  if (!course) return <Shell><div>Course not found. <Link href="/admin/lms">Back</Link></div></Shell>;

  return (
    <Shell>
      <Link href="/admin/lms" style={{ fontSize: 12.5, color: "#64748b", textDecoration: "none" }}>← All courses</Link>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "8px 0 4px", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 20, fontWeight: 900 }}>{course.title}</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "#64748b" }}>{course.isPublished ? "Published" : "Draft"}</span>
          <button
            onClick={() => patchCourse({ isPublished: !course.isPublished })}
            style={{ ...smallBtn, background: course.isPublished ? "#fee2e2" : "#dcfce7", color: course.isPublished ? "#991b1b" : "#166534" }}
          >
            {course.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 16 }}>
        /{course.slug} · {course.priceInr > 0 ? `₹${course.priceInr}` : "Free"}
      </div>
      {msg && <div style={{ color: "#b91c1c", fontSize: 12.5, marginBottom: 10 }}>{msg}</div>}

      {/* Price editor */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 22 }}>
        <label style={{ fontSize: 12.5, fontWeight: 800 }}>Price ₹</label>
        <input
          defaultValue={course.priceInr}
          onBlur={(e) => patchCourse({ priceInr: Number(e.target.value) || 0 })}
          inputMode="numeric"
          style={{ ...input, width: 130 }}
        />
        <span style={{ fontSize: 11.5, color: "#94a3b8" }}>(0 = free)</span>
      </div>

      {/* Modules */}
      {course.modules.map((m, mi) => (
        <div key={m.id} style={{ border: "1px solid rgba(15,23,42,.1)", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f8fafc" }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{mi + 1}. {m.title}</div>
            <button onClick={() => delModule(m.id)} style={linkDanger}>Delete</button>
          </div>
          <div style={{ padding: "8px 14px" }}>
            {m.lessons.length === 0 && <div style={{ fontSize: 12.5, color: "#94a3b8", padding: "6px 0" }}>No lessons yet.</div>}
            {m.lessons.map((l) => (
              <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 13 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: "#64748b", marginRight: 8 }}>{l.type}</span>
                  {l.title}
                </div>
                <button onClick={() => delLesson(l.id, load)} style={linkDanger}>✕</button>
              </div>
            ))}
            <AddLesson moduleId={m.id} onAdded={load} />
          </div>
        </div>
      ))}

      {/* Add module */}
      <form onSubmit={addModule} style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} placeholder="New module title" style={{ ...input, flex: 1 }} />
        <button type="submit" style={primaryBtn}>+ Module</button>
      </form>
    </Shell>
  );
}

async function delLesson(lessonId: string, reload: () => void) {
  if (!confirm("Delete this lesson?")) return;
  await fetch("/api/admin/lms/lesson", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId }),
  });
  reload();
}

function AddLesson({ moduleId, onAdded }: { moduleId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("VIDEO");
  const [videoUrl, setVideoUrl] = useState("");

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 2) return;
    await fetch("/api/admin/lms/lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, title: title.trim(), type, videoUrl: videoUrl.trim() || undefined }),
    });
    setTitle("");
    setVideoUrl("");
    setOpen(false);
    onAdded();
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ ...smallBtn, marginTop: 8, background: "#eef2ff", color: "#3730a3" }}>
        + Add lesson
      </button>
    );
  }

  const needsUrl = type === "VIDEO" || type === "LIVE_RECORDING";
  return (
    <form onSubmit={add} style={{ display: "grid", gap: 6, marginTop: 8, padding: 10, background: "#f8fafc", borderRadius: 10 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lesson title" style={input} autoFocus />
      <div style={{ display: "flex", gap: 6 }}>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ ...input, width: 150 }}>
          {LESSON_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {needsUrl && (
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL (.m3u8 or .mp4)" style={{ ...input, flex: 1 }} />
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" style={primaryBtn}>Add</button>
        <button type="button" onClick={() => setOpen(false)} style={smallBtn}>Cancel</button>
      </div>
    </form>
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

const input: React.CSSProperties = {
  height: 40,
  borderRadius: 10,
  border: "1px solid rgba(15,23,42,.16)",
  padding: "0 12px",
  fontSize: 13.5,
  outline: "none",
};
const primaryBtn: React.CSSProperties = {
  height: 40,
  padding: "0 16px",
  borderRadius: 10,
  border: "none",
  fontWeight: 900,
  fontSize: 13,
  color: "#fff",
  background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
  cursor: "pointer",
};
const smallBtn: React.CSSProperties = {
  height: 34,
  padding: "0 12px",
  borderRadius: 9,
  border: "none",
  fontWeight: 800,
  fontSize: 12,
  cursor: "pointer",
  background: "#e2e8f0",
  color: "#0f172a",
};
const linkDanger: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#dc2626",
  fontWeight: 800,
  fontSize: 12,
  cursor: "pointer",
};
