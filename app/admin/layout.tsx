import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  DASHBOARD_AUTH_COOKIE,
  isDashboardAuthValueValid,
} from "@/lib/dashboard-auth";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(DASHBOARD_AUTH_COOKIE)?.value || "";

  if (!isDashboardAuthValueValid(authCookie)) {
    redirect("/auth/dashboard-login?next=/admin/dashboard");
  }

  return children;
}
