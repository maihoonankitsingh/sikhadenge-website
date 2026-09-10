export const metadata = {
  title: "Offline | SikhaDenge EngageOS",
};

export default function OfflinePage() {
  return (
    <main
      data-phase15-offline-shell="true"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "inherit",
      }}
    >
      <section
        aria-labelledby="offline-title"
        style={{
          width: "min(520px, 100%)",
          padding: "32px",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          background: "#ffffff",
          boxShadow:
            "0 18px 48px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <img
          src="/sikhadenge-app-mark-v3.svg"
          width="64"
          height="64"
          alt=""
          aria-hidden="true"
        />

        <p
          style={{
            margin: "18px 0 6px",
            color: "#475569",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          SikhaDenge EngageOS
        </p>

        <h1
          id="offline-title"
          style={{
            margin: 0,
            fontSize: "28px",
            lineHeight: 1.2,
          }}
        >
          You are offline
        </h1>

        <p
          style={{
            margin: "14px auto 0",
            maxWidth: "410px",
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.65,
          }}
        >
          Network connectivity is unavailable. Existing customer
          conversations are not cached for privacy. Unsent message
          drafts can be recovered from this browser when you return
          to the Inbox.
        </p>

        <a
          href="/inbox"
          style={{
            minHeight: "44px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "22px",
            padding: "0 18px",
            borderRadius: "10px",
            background: "#0f172a",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Try again
        </a>
      </section>
    </main>
  );
}
