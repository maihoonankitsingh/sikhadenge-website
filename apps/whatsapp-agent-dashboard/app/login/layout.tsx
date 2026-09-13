import type { CSSProperties, ReactNode } from "react";

import page01HeroChunk0 from "./page01HeroChunk0";
import page01HeroChunk1 from "./page01HeroChunk1";
import page01HeroChunk2 from "./page01HeroChunk2";
import page01HeroChunk3 from "./page01HeroChunk3";
import page01HeroChunk4 from "./page01HeroChunk4";
import "../login-page01-left-image.css";

const PAGE01_HERO_DATA_URI = `data:image/webp;base64,${page01HeroChunk0}${page01HeroChunk1}${page01HeroChunk2}${page01HeroChunk3}${page01HeroChunk4}`;

export default function LoginLayout({ children }: { children: ReactNode }) {
  const assetStyle = {
    "--page01-left-generated": `url("${PAGE01_HERO_DATA_URI}")`,
  } as CSSProperties;

  return (
    <div className="page01-login-asset-root" style={assetStyle} data-page01-hero="approved-inline-v5">
      {children}
    </div>
  );
}
