import type { CSSProperties, ReactNode } from "react";

import leftHero from "../../public/page01-left-generated-crop.webp";
import "../login-page01-left-image.css";

export default function LoginLayout({ children }: { children: ReactNode }) {
  const assetStyle = {
    "--page01-left-generated": `url("${leftHero.src}")`,
  } as CSSProperties;

  return (
    <div className="page01-login-asset-root" style={assetStyle}>
      {children}
    </div>
  );
}
