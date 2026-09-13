import type { CSSProperties, ReactNode } from "react";

import "../login-page01-left-image.css";

const PAGE01_HERO_ASSET = "/page01-left-approved-hq.webp?v=20260913";

export default function LoginLayout({ children }: { children: ReactNode }) {
  const assetStyle = {
    "--page01-left-generated": `url("${PAGE01_HERO_ASSET}")`,
  } as CSSProperties;

  return (
    <div className="page01-login-asset-root" style={assetStyle} data-page01-hero="approved-hq-v4">
      {children}
    </div>
  );
}
