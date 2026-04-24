"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  action: string;
  label: string;
  category?: string;
  pagePath: string;
};

export default function TrackedLink({
  href,
  className,
  children,
  action,
  label,
  category = "cta",
  pagePath,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackEvent({
          action,
          category,
          label,
          page_path: pagePath,
        })
      }
    >
      {children}
    </Link>
  );
}
