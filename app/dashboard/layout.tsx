import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";
import { BarChart3, Menu } from "lucide-react";
import SidebarNav from "./_components/SidebarNav";
import {
  DASHBOARD_AUTH_COOKIE,
  isDashboardAuthValueValid,
} from "@/lib/dashboard-auth";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(DASHBOARD_AUTH_COOKIE)?.value || "";

  if (!isDashboardAuthValueValid(authCookie)) {
    redirect("/auth/dashboard-login?next=/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">Dashboard</div>
                <div className="text-lg font-bold text-slate-900">Sikhadenge</div>
              </div>
            </Link>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Founder Access
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Light admin area for reports, tables, and module navigation.
              </div>
            </div>

            <SidebarNav />
          </aside>

          <div className="min-w-0">
            <header className="mb-6 flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Dashboard Workspace
                </div>
                <div className="mt-1 text-lg font-bold text-slate-900">
                  Internal Business Modules
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                <Menu className="h-4 w-4" />
                Admin View
              </div>
            </header>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
