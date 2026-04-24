import React from "react";

export default function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white pt-[56px]">
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 2xl:px-12 py-10">
        {/* background glow (brand) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(245,179,1,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/10 via-[#0B1220]/35 to-[#0B1220]/90" />
        </div>

        {/* Title card */}
        <div className="rounded-3xl border border-white/10 bg-[#111827]/45 backdrop-blur p-6 sm:p-8">
          <div className="text-xs tracking-[0.22em] uppercase text-[#9CA3AF]">
            Sikhadenge
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>

          <div className="mt-4 h-px w-full bg-white/10" />
        </div>

        {/* Page content */}
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
