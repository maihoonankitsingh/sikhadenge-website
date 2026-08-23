"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function HideSiteChromeOnMasterclass({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/masterclass" || pathname === "/masterclass/") {
    return null;
  }

  return <>{children}</>;
}
