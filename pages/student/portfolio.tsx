import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Profile = { name: string; handle: string | null; headline: string | null; bio: string | null; portfolioPublic: boolean };
type Project = { id: string; fileUrl: string | null; grade: number | null; showcased: boolean; title: string; courseTitle: string };
type Cert = { serial: string; course: { title: string } };

export default function PortfolioEditor() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certs, setCerts] = useState<Cert[]>([]);
  const [handle, setHandle] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const r = await fetch("/api/student/portfolio");
    if (r.status === 401) {
      window.location.href = "/student/login";
      return;
    }
    const j = await r.json().catch(() => null);
    if (j?.ok) {
      setProfile(j.profile);
      setProjects(j.projects || []);
      setCerts(j.certificates || []);
      setHandle(j.profile?.handle || "");
      setHeadline(j.profile?.headline || "");
      setBio(j.profile?.bio || "");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function saveProfile() {
    setMsg(null);
    const r = await fetch("/api/student/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handle, headline, bio }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) setMsg(j?.error || "Save failed");
    else setMsg("Saved ✓");
    await load();
  }

  async function togglePublic() {
    const r = await fetch("/api/student/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolioPublic: !profile?.portfolioPublic }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) setMsg(j?.error || "Failed");
    await load();
  }

  async function toggleShowcase(id: string, showcased: boolean) {
    await fetch("/api/student/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId: id, showcased }),
    });
    await load();
  }

  if (loading) return <Shell><div>Loading…</div></Shell>;

  return (
    <Shell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900 }}>My Portfolio</h1>
        <Link href="/student" style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", textDecoration: "none" }}>← Dashboard</Link>
      </div>

      {profile?.handle && (
        <div style={{ margin: "10px 0", fontSize: 13 }}>
          Public link:{" "}
          <a href={`/portfolio/${profile.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: "#ff9d90", fontWeight: 800 }}>
            /portfolio/{profile.handle}
          </a>{" "}
          <span style={{ fontSize: 11.5, color: profile.portfolioPublic ? "#4ade80" : "#facc15", marginLeft: 6 }}>
            {profile.portfolioPublic ? "● Live" : "● Private"}
          </span>
        </div>
      )}
      {msg && <div style={{ color: "#ffd7cf", fontSize: 12.5, marginBottom: 10 }}>{msg}</div>}

      {/* Profile */}
      <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
        <Field label="Handle (public URL)"><input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="e.g. ankit-designs" /></Field>
        <Field label="Headline"><input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Graphic Designer & Video Editor" /></Field>
        <Field label="Bio"><textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="About you…" /></Field>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={saveProfile} style={primaryBtn}>Save profile</button>
          <button onClick={togglePublic} style={ghostBtn}>{profile?.portfolioPublic ? "Make private" : "Go public"}</button>
        </div>
      </div>

      {/* Projects */}
      <h2 style={{ fontSize: 15, fontWeight: 800, marginTop: 26, marginBottom: 8 }}>Graded Projects</h2>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", marginBottom: 10 }}>Jo projects portfolio pe dikhane hain unhe select karo.</div>
      {projects.length === 0 ? (
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>Abhi koi graded project nahi. Assignment submit karke grade lo.</div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {projects.map((p) => (
            <label key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,.12)", background: p.showcased ? "rgba(255,107,90,.1)" : "transparent", cursor: "pointer" }}>
              <input type="checkbox" checked={p.showcased} onChange={(e) => toggleShowcase(p.id, e.target.checked)} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>{p.courseTitle} · Grade {p.grade}/100</div>
              </div>
              {p.fileUrl && <a href={p.fileUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 12, color: "#ff9d90" }}>view</a>}
            </label>
          ))}
        </div>
      )}

      {certs.length > 0 && (
        <>
          <h2 style={{ fontSize: 15, fontWeight: 800, marginTop: 22, marginBottom: 8 }}>Certificates (auto-shown)</h2>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>{certs.map((c) => c.course.title).join(" · ")}</div>
        </>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0B1220", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 5 }}>
      <label style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(255,255,255,.7)" }}>{label}</label>
      {React.isValidElement<{ style?: React.CSSProperties }>(children)
        ? React.cloneElement(children, {
            style: {
              width: "100%",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,.14)",
              background: "rgba(255,255,255,.04)",
              color: "#fff",
              padding: "10px 12px",
              fontSize: 13.5,
              outline: "none",
            },
          })
        : children}
    </div>
  );
}

const primaryBtn: React.CSSProperties = { padding: "10px 18px", borderRadius: 12, border: "none", fontWeight: 900, fontSize: 13.5, color: "#fff", background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)", cursor: "pointer" };
const ghostBtn: React.CSSProperties = { padding: "10px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)", background: "transparent", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" };
