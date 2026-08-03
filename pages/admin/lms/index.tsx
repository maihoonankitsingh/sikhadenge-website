import React, { useEffect, useState } from "react";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  slug: string;
  priceInr: number;
  isPublished: boolean;
  _count: { modules: number; enrollments: number };
};

export default function AdminLmsCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const r = await fetch("/api/admin/lms/courses");
    if (r.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const j = await r.json().catch(() => null);
    if (j?.ok) setCourses(j.courses || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createCourse(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/lms/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), priceInr: Number(price) || 0 }),
      });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Create failed");
      window.location.href = `/admin/lms/${j.course.id}`;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>LMS · Courses</h1>
        <Link href="/admin/lms/submissions" style={{ fontSize: 12.5, fontWeight: 800, color: "#3730a3", textDecoration: "none" }}>
          Grade submissions →
        </Link>
      </div>
      <div style={{ fontSize: 12.5, color: "#64748b", marginBottom: 18 }}>Create and manage course content</div>

      <form onSubmit={createCourse} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New course title"
          style={{ ...input, flex: "1 1 240px" }}
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price ₹ (0 = free)"
          inputMode="numeric"
          style={{ ...input, width: 150 }}
        />
        <button type="submit" disabled={busy || title.trim().length < 2} style={primaryBtn}>
          {busy ? "Creating..." : "+ Create"}
        </button>
      </form>
      {err && <div style={{ color: "#b91c1c", fontSize: 12.5, marginBottom: 12 }}>{err}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : courses.length === 0 ? (
        <div style={{ color: "#64748b", fontSize: 13 }}>No courses yet. Create one above.</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {courses.map((c) => (
            <Link key={c.id} href={`/admin/lms/${c.id}`} style={row}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  /{c.slug} · {c._count.modules} modules · {c._count.enrollments} enrolled
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: c.priceInr > 0 ? "#0f172a" : "#16a34a" }}>
                  {c.priceInr > 0 ? `₹${c.priceInr}` : "Free"}
                </span>
                <span style={{ ...badge, background: c.isPublished ? "#dcfce7" : "#fef3c7", color: c.isPublished ? "#166534" : "#92400e" }}>
                  {c.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Shell>
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
  height: 42,
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,.16)",
  padding: "0 12px",
  fontSize: 14,
  outline: "none",
};
const primaryBtn: React.CSSProperties = {
  height: 42,
  padding: "0 18px",
  borderRadius: 12,
  border: "none",
  fontWeight: 900,
  fontSize: 13,
  color: "#fff",
  background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
  cursor: "pointer",
};
const row: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,.1)",
  textDecoration: "none",
  color: "#0f172a",
  background: "#fff",
};
const badge: React.CSSProperties = { fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999 };
