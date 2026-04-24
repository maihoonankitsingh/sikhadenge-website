"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, Menu, X, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact-us", label: "Contact" },
];

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    const p = pathname || "/";
    const hit = NAV.find((n) => n.href !== "/" && p.startsWith(n.href));
    return hit?.href || (p === "/" ? "/" : "");
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[70] sd-header-under-offer">
      <div className="border-b border-white/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[18px] font-semibold tracking-tight text-[#0F172A]">
              <span className="text-[#F5B301]">Sikh</span>adenge
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => {
              const active = activeHref === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm transition",
                    active ? "bg-black/5 text-[#0F172A]" : "text-[#475569] hover:bg-black/5 hover:text-[#0F172A]"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/courses"
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#111827] text-white hover:border-white/20"
            >
              <Search size={18} />
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#111827] text-white hover:border-white/20"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-[80] bg-black/55"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-[90] h-full w-[88%] max-w-[380px] border-l border-white/10 bg-[#0B1220]">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-3">
              <div className="text-[16px] font-semibold text-white">
                <span className="text-[#F5B301]">Sikh</span>adenge
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#111827] text-white hover:border-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3">
              <Link
                href="/courses"
                className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827] px-3 py-3 text-white hover:border-white/20"
              >
                <div className="flex items-center gap-2">
                  <Search size={18} />
                  <span className="text-[15px]">Search courses</span>
                </div>
                <ChevronRight size={18} className="text-white/60" />
              </Link>

              <div className="space-y-1">
                {NAV.map((n) => {
                  const active = activeHref === n.href;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={cx(
                        "flex items-center justify-between rounded-2xl px-3 py-3 text-[15px] transition",
                        active ? "bg-black/5 text-[#0F172A]" : "text-white/85 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{n.label}</span>
                      <ChevronRight size={18} className={cx(active ? "text-white/70" : "text-white/40")} />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-[#111827] px-3 py-3 text-xs text-white/70">
                Parent company: ThinkGrow Pvt Ltd.
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
