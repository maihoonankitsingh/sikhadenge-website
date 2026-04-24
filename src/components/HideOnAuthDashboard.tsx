"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function HideOnAuthDashboard({ children }: { children: React.ReactNode }) {
  const p = usePathname() || "";
  if (p.startsWith("/auth") || p.startsWith("/dashboard")) return null;
  return <>{children}</>;
}
