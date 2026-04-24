"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const HIDE_PREFIXES = ["/checkout/"];
const HIDE_EXACT = new Set(["/payment-success", "/welcome", "/masterclass"]);

export default function HeaderGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";

  const shouldHide =
    HIDE_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    HIDE_EXACT.has(pathname);

  if (shouldHide) return null;
  return <>{children}</>;
}
