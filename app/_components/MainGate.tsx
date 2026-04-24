"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const HIDE_PREFIXES = ["/checkout/"];
const HIDE_EXACT = new Set(["/payment-success", "/welcome"]);

export default function MainGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";

  const noTopPadding =
    HIDE_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    HIDE_EXACT.has(pathname);

  return (
    <main className={noTopPadding ? "" : "pt-20 md:pt-24"}>
      {children}
    </main>
  );
}
