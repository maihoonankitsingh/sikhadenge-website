import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
