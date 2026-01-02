import React from "react";

export default function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
