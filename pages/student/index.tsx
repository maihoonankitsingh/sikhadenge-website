import React, { useEffect, useState } from "react";

type User = { id: string; name: string; email: string | null; phone: string | null; role: string };

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  priceInr: number;
  enrollmentStatus?: string;
  _count?: { modules: number };
};

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [enrolled, setEnrolled] = useState<Course[]>([]);
  const [available, setAvailable] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function loadCourses() {
    const r = await fetch("/api/student/courses");
    if (!r.ok) return;
    const j = await r.json().catch(() => null);
    if (j?.ok) {
      setEnrolled(j.enrolled || []);
      setAvailable(j.available || []);
    }
  }

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/student/me");
      if (!r.ok) {
        window.location.href = "/student/login";
        return;
      }
      const j = (await r.json().catch(() => null)) as { ok: boolean; user: User } | null;
      if (!j?.ok) {
        window.location.href = "/student/login";
        return;
      }
      setUser(j.user);
      await loadCourses();
      setLoading(false);
    })();
  }, []);

  async function logout() {
    await fetch("/api/student/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/student/login";
  }

  async function enroll(courseId: string) {
    setEnrolling(courseId);
    setMsg(null);
    try {
      const r = await fetch("/api/student/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Enroll failed");
      await loadCourses();
      setMsg("Enrolled successfully!");
    } catch (e: any) {
      setMsg(e?.message || "Enroll failed");
    } finally {
      setEnrolling(null);
    }
  }

  if (loading) {
    return <div style={{ minHeight: "100vh", background: "#0B1220", color: "#fff", padding: 24 }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B1220", color: "#fff" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,.08)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18 }}>
          Sikhadenge <span style={{ color: "#ff6b5a" }}>LMS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.75)" }}>Hi, {user?.name}</span>
          <button onClick={logout} style={ghostBtn}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px" }}>
        {msg && (
          <div
            style={{
              marginBottom: 16,
              fontSize: 13,
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(255,107,90,.12)",
              border: "1px solid rgba(255,107,90,.3)",
              color: "#ffd7cf",
            }}
          >
            {msg}
          </div>
        )}

        {/* My courses */}
        <Section title="My Courses">
          {enrolled.length === 0 ? (
            <Empty text="You haven't enrolled in any course yet. Browse below and start learning!" />
          ) : (
            <Grid>
              {enrolled.map((c) => (
                <CourseCard key={c.id} course={c}>
                  <a href={`/student/learn/${c.slug}`} style={primaryBtn}>
                    Continue Learning →
                  </a>
                </CourseCard>
              ))}
            </Grid>
          )}
        </Section>

        {/* Browse */}
        <Section title="Browse Courses">
          {available.length === 0 ? (
            <Empty text="No new courses available right now." />
          ) : (
            <Grid>
              {available.map((c) => (
                <CourseCard key={c.id} course={c}>
                  <button
                    onClick={() => enroll(c.id)}
                    disabled={enrolling === c.id}
                    style={{ ...primaryBtn, opacity: enrolling === c.id ? 0.6 : 1, cursor: "pointer", border: "none" }}
                  >
                    {enrolling === c.id ? "Enrolling..." : c.priceInr > 0 ? `Enroll · ₹${c.priceInr}` : "Enroll Free"}
                  </button>
                </CourseCard>
              ))}
            </Grid>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
      {children}
    </div>
  );
}

function CourseCard({ course, children }: { course: Course; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,.1)",
        background: "#111827",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 120,
          background: course.thumbnail
            ? `center/cover no-repeat url(${course.thumbnail})`
            : "linear-gradient(135deg, #1f2937, #374151)",
        }}
      />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 14.5 }}>{course.title}</div>
        {course.description && (
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", lineHeight: 1.4 }}>
            {course.description.slice(0, 90)}
          </div>
        )}
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.45)" }}>
          {course._count?.modules ?? 0} modules
        </div>
        <div style={{ marginTop: "auto", paddingTop: 8 }}>{children}</div>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 14,
        border: "1px dashed rgba(255,255,255,.15)",
        color: "rgba(255,255,255,.6)",
        fontSize: 13,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  textAlign: "center",
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 13,
  color: "#fff",
  textDecoration: "none",
  background: "linear-gradient(180deg, #ff7a6d 0%, #ff6b5a 100%)",
};

const ghostBtn: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 10,
  fontWeight: 800,
  fontSize: 12.5,
  color: "#fff",
  background: "transparent",
  border: "1px solid rgba(255,255,255,.2)",
  cursor: "pointer",
};
