"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // shows real error in pm2 logs + browser console
    console.error("APP_ERROR_BOUNDARY:", error);
  }, [error]);

  return (
    <main style={{ minHeight: "100vh", background: "#0B1220", color: "#fff", padding: 24 }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Page crashed</h1>
      <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.9 }}>
        {String(error?.message || error)}
        {"\n\n"}
        {error?.stack || ""}
        {"\n\n"}
        {error?.digest ? `digest: ${error.digest}` : ""}
      </pre>

      <button
        onClick={() => reset()}
        style={{
          marginTop: 16,
          padding: "10px 14px",
          borderRadius: 10,
          background: "#2563EB",
          border: "1px solid rgba(255,255,255,0.10)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    </main>
  );
}
