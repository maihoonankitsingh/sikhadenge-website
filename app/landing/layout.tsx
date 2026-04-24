import type { ReactNode } from "react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function LandingLayout({ children }: { children: ReactNode }) {
  // NOTE: Do NOT render <html>/<body> in route layouts.
  // Keep /landing styling isolated via wrapper + CSS vars.
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      <style>{`:root{
  --sd-bg:#F8FAFC;
  --sd-brand:#0B1220;
  --sd-brand-2:#111827;
  --sd-card:#FFF7E6;
  --sd-border:rgba(15,23,42,0.10);
  --sd-text:#0F172A;
  --sd-text-2:#334155;
  --sd-text-3:#64748B;
  --sd-primary:#2563EB;
  --sd-primary-dark:#1D4ED8;
  --sd-gold:#F5B301;
}`}</style>
      {children}
    </div>
  );
}
