"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B1220",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 560,
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 18,
          background: "rgba(15,23,42,0.92)",
          padding: 28,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>SIKHADENGE</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "10px 0 0" }}>
          Something went wrong
        </h1>
        <p style={{ margin: "12px 0 0", lineHeight: 1.6, opacity: 0.82 }}>
          We couldn&apos;t load this page right now. Please retry, or return to the home page.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              background: "#2563EB",
              border: 0,
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Retry
          </button>
          <Link
            href="/"
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.16)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}
