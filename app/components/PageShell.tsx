export const dynamic = "force-dynamic";
export const revalidate = 0;
import React from "react";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-10">
          {(title || subtitle) && (
            <header>
              {title && (
                <h1 className="text-2xl sm:text-4xl font-semibold leading-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-3 text-sm sm:text-base text-[#B0B7C3] max-w-3xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </header>
          )}
          <div className={title || subtitle ? "mt-8" : ""}>{children}</div>
        </div>
      </div>
    </main>
  );
}
