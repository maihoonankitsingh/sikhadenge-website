import React, { useEffect, useState } from "react";
import Link from "next/link";
import CheckoutModal from "../../lms/components/CheckoutModal";

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

type LiveClass = {
  id: string;
  title: string;
  scheduledAt: string;
  status: string;
  recordingReady: boolean;
  batchName: string;
  courseTitle: string;
  courseSlug: string;
};

type Notification = { id: string; type: string; title: string; body: string | null; link: string | null; read: boolean; createdAt: string };
type Certificate = { serial: string; issuedAt: string; course: { title: string } };

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [enrolled, setEnrolled] = useState<Course[]>([]);
  const [available, setAvailable] = useState<Course[]>([]);
  const [live, setLive] = useState<LiveClass[]>([]);
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<Course | null>(null);
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

  async function loadLive() {
    const r = await fetch("/api/student/live");
    if (!r.ok) return;
    const j = await r.json().catch(() => null);
    if (j?.ok) setLive(j.classes || []);
  }

  async function loadNotifs() {
    const r = await fetch("/api/student/notifications");
    if (!r.ok) return;
    const j = await r.json().catch(() => null);
    if (j?.ok) {
      setNotifs(j.items || []);
      setUnread(j.unread || 0);
    }
  }

  async function loadCerts() {
    const r = await fetch("/api/student/certificates");
    if (!r.ok) return;
    const j = await r.json().catch(() => null);
    if (j?.ok) setCerts(j.certificates || []);
  }

  async function markAllRead() {
    await fetch("/api/student/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "all" }),
    }).catch(() => null);
    await loadNotifs();
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
      await Promise.all([loadCourses(), loadLive(), loadNotifs(), loadCerts()]);
      setLoading(false);
    })();
  }, []);

  async function joinLive(liveClassId: string) {
    setMsg(null);
    const r = await fetch(`/api/student/live/${liveClassId}/join`, { method: "POST" });
    const j = await r.json().catch(() => null);
    if (r.ok && j?.ok && j.url) {
      window.open(j.url, "_blank");
    } else {
      setMsg(j?.error || "Could not join the class");
    }
  }

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
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Enroll failed");
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
          {unread > 0 && (
            <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: "#ff6b5a", borderRadius: 999, padding: "3px 9px" }}>
              🔔 {unread}
            </span>
          )}
          <Link href="/student/portfolio" style={{ fontSize: 12.5, fontWeight: 800, color: "#ff9d90", textDecoration: "none" }}>Portfolio</Link>
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

        {/* Notifications */}
        {notifs.length > 0 && (
          <Section title="Notifications">
            <div style={{ display: "grid", gap: 8 }}>
              {unread > 0 && (
                <button onClick={markAllRead} style={{ ...ghostBtn, justifySelf: "start" }}>Mark all read</button>
              )}
              {notifs.slice(0, 6).map((n) => {
                const inner = (
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: n.read ? "#0f172a" : "#111827" }}>
                    {!n.read && <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ff6b5a", marginTop: 6, flexShrink: 0 }} />}
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13.5 }}>{n.title}</div>
                      {n.body && <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{n.body}</div>}
                    </div>
                  </div>
                );
                return n.link ? (
                  <a key={n.id} href={n.link} style={{ textDecoration: "none", color: "#fff" }}>{inner}</a>
                ) : (
                  <div key={n.id}>{inner}</div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Certificates */}
        {certs.length > 0 && (
          <Section title="My Certificates">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
              {certs.map((c) => (
                <a key={c.serial} href={`/certificate/${c.serial}`} style={{ textDecoration: "none" }}>
                  <div style={{ padding: 16, borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", background: "linear-gradient(135deg,#1f2937,#111827)", color: "#fff" }}>
                    <div style={{ fontSize: 22 }}>🏆</div>
                    <div style={{ fontWeight: 800, fontSize: 14, marginTop: 6 }}>{c.course.title}</div>
                    <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)", marginTop: 4 }}>Certificate · {c.serial}</div>
                  </div>
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* Live & upcoming */}
        {live.length > 0 && (
          <Section title="Live & Upcoming Classes">
            <div style={{ display: "grid", gap: 10 }}>
              {live.map((lc) => (
                <div
                  key={lc.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,.1)",
                    background: "#111827",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <LiveDot status={lc.status} />
                      <span style={{ fontWeight: 800, fontSize: 14 }}>{lc.title}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 3 }}>
                      {lc.courseTitle} · {lc.batchName} · {new Date(lc.scheduledAt).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    {lc.status === "ENDED" ? (
                      lc.recordingReady ? (
                        <a href={`/student/learn/${lc.courseSlug}`} style={primaryBtn}>
                          Watch Recording →
                        </a>
                      ) : (
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>Recording processing…</span>
                      )
                    ) : (
                      <button onClick={() => joinLive(lc.id)} style={{ ...primaryBtn, border: "none", cursor: "pointer", width: "auto", padding: "10px 18px" }}>
                        {lc.status === "LIVE" ? "🔴 Join Live" : "Join"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
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
                    onClick={() => (c.priceInr > 0 ? setCheckout(c) : enroll(c.id))}
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

      {checkout && user && (
        <CheckoutModal
          course={{ id: checkout.id, title: checkout.title, priceInr: checkout.priceInr }}
          user={{ name: user.name, email: user.email, phone: user.phone }}
          onClose={() => setCheckout(null)}
          onSuccess={async () => {
            setCheckout(null);
            setMsg("Payment successful! You are enrolled.");
            await loadCourses();
          }}
        />
      )}
    </div>
  );
}

function LiveDot({ status }: { status: string }) {
  const color = status === "LIVE" ? "#ef4444" : status === "ENDED" ? "#64748b" : "#f59e0b";
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 999,
        background: color,
        display: "inline-block",
        boxShadow: status === "LIVE" ? "0 0 0 3px rgba(239,68,68,.25)" : "none",
      }}
    />
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
