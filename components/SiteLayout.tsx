
import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <SiteHeader />
      {/* header height = 72px, so content starts below it */}
      <div className="pt-[72px]">{children}</div>
      <SiteFooter />
    </div>
  );
}
