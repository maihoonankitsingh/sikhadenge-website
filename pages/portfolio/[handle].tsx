import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

type Project = { title: string; courseTitle: string; fileUrl: string | null; grade: number | null };
type Cert = { serial: string; course: { title: string } };
type Portfolio = { name: string; headline: string | null; bio: string | null; projects: Project[]; certificates: Cert[] };

export default function PublicPortfolio() {
  const router = useRouter();
  const handle = typeof router.query.handle === "string" ? router.query.handle : "";
  const [p, setP] = useState<Portfolio | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) return;
    (async () => {
      const r = await fetch(`/api/portfolio/${handle}`);
      const j = await r.json().catch(() => null);
      if (r.ok && j?.ok) setP(j.portfolio);
      else setErr(j?.error || "Portfolio not found");
    })();
  }, [handle]);

  if (err) {
    return (
      <Shell>
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <div style={{ fontSize: 40 }}>🔍</div>
          <div style={{ fontWeight: 800, marginTop: 8 }}>{err}</div>
        </div>
      </Shell>
    );
  }
  if (!p) return <Shell><div style={{ paddingTop: 80, textAlign: "center" }}>Loading…</div></Shell>;

  return (
    <Shell>
      <Head><title>{p.name} · Portfolio</title></Head>

      {/* Hero */}
      <div style={{ textAlign: "center", paddingTop: 40, paddingBottom: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: 999, background: "linear-gradient(135deg,#ff7a6d,#ff6b5a)", display: "grid", placeItems: "center", margin: "0 auto", fontSize: 30, fontWeight: 900 }}>
          {p.name.charAt(0).toUpperCase()}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginTop: 14 }}>{p.name}</h1>
        {p.headline && <div style={{ fontSize: 15, color: "#ff9d90", fontWeight: 700, marginTop: 4 }}>{p.headline}</div>}
        {p.bio && <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)", marginTop: 12, maxWidth: 560, marginInline: "auto", lineHeight: 1.6 }}>{p.bio}</div>}
      </div>

      {/* Projects */}
      {p.projects.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, fontWeight: 800, margin: "20px 0 12px" }}>Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
            {p.projects.map((pr, i) => (
              <a key={i} href={pr.fileUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff" }}>
                <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "#111827", overflow: "hidden" }}>
                  <div style={{ height: 100, background: "linear-gradient(135deg,#1f2937,#374151)", display: "grid", placeItems: "center", fontSize: 26 }}>🎨</div>
                  <div style={{ padding: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{pr.title}</div>
                    <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)", marginTop: 3 }}>{pr.courseTitle}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Certificates */}
      {p.certificates.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, fontWeight: 800, margin: "26px 0 12px" }}>Certificates</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {p.certificates.map((c) => (
              <a key={c.serial} href={`/certificate/${c.serial}`} style={{ textDecoration: "none" }}>
                <span style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "rgba(255,107,90,.12)", border: "1px solid rgba(255,107,90,.25)", color: "#ffd7cf", fontSize: 12.5, fontWeight: 700 }}>
                  🏆 {c.course.title}
                </span>
              </a>
            ))}
          </div>
        </>
      )}

      <div style={{ textAlign: "center", fontSize: 11.5, color: "rgba(255,255,255,.35)", marginTop: 40, paddingBottom: 30 }}>
        Made with Sikhadenge
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0B1220", color: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 16px" }}>{children}</div>
    </div>
  );
}
