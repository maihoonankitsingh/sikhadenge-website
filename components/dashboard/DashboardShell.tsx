"use client";

import SidebarNav from "./SidebarNav";
import Topbar from "./Topbar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  // FIXED overlay ensures public header/footer do not show on /dashboard (no changes to root layout)
  return (
    <div className="fixed inset-0 z-[60] overflow-auto bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">
            <SidebarNav />
          </aside>

          <main className="min-w-0">
            <Topbar />
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
