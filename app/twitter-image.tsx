import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1220",
          color: "#FFFFFF",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>
          Sikhadenge
        </div>
        <div style={{ marginTop: 18, fontSize: 34, fontWeight: 600, opacity: 0.9 }}>
          Learn • Create • Earn
        </div>
      </div>
    ),
    size
  );
}
