import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

type Cert = { serial: string; issuedAt: string; studentName: string; courseTitle: string };

export default function CertificatePage() {
  const router = useRouter();
  const serial = typeof router.query.serial === "string" ? router.query.serial : "";
  const [cert, setCert] = useState<Cert | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!serial) return;
    (async () => {
      const r = await fetch(`/api/certificate/${serial}`);
      const j = await r.json().catch(() => null);
      if (r.ok && j?.ok) setCert(j.certificate);
      else setErr(j?.error || "Certificate not found");
    })();
  }, [serial]);

  return (
    <div style={{ minHeight: "100vh", background: "#0B1220", color: "#fff", display: "grid", placeItems: "center", padding: 20 }}>
      <Head><title>Certificate {serial} | Sikhadenge</title></Head>

      {err ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40 }}>🔍</div>
          <div style={{ fontWeight: 800, marginTop: 8 }}>{err}</div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", marginTop: 4 }}>Serial: {serial}</div>
        </div>
      ) : !cert ? (
        <div>Loading…</div>
      ) : (
        <>
          <div
            id="cert"
            style={{
              width: "min(760px, 100%)",
              background: "linear-gradient(135deg,#fffdf7,#fff)",
              color: "#0f172a",
              borderRadius: 18,
              padding: "44px 40px",
              border: "10px solid #ff6b5a",
              boxShadow: "0 24px 60px rgba(0,0,0,.4)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 13, letterSpacing: 3, fontWeight: 900, color: "#ff6b5a" }}>SIKHADENGE</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 18 }}>Certificate of Completion</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 18 }}>This certifies that</div>
            <div style={{ fontSize: 30, fontWeight: 900, marginTop: 8, color: "#0f172a" }}>{cert.studentName}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}>has successfully completed</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{cert.courseTitle}</div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, fontSize: 12, color: "#64748b" }}>
              <div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{new Date(cert.issuedAt).toLocaleDateString()}</div>
                <div>Date issued</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{cert.serial}</div>
                <div>Verify ID</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
            <button onClick={() => window.print()} style={btn}>Download / Print</button>
          </div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.4)", marginTop: 10 }}>
            Verified certificate · sikhadenge.com/certificate/{cert.serial}
          </div>
        </>
      )}

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #cert, #cert * { visibility: visible; }
          #cert { position: absolute; left: 0; top: 0; border-color: #ff6b5a; }
        }
      `}</style>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 12,
  border: "none",
  fontWeight: 900,
  fontSize: 13.5,
  color: "#fff",
  background: "linear-gradient(180deg,#ff7a6d,#ff6b5a)",
  cursor: "pointer",
};
