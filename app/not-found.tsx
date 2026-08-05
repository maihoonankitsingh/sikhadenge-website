import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1220] px-4 pb-20 pt-32 text-white sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(760px_460px_at_20%_8%,rgba(37,99,235,0.24),transparent_62%),radial-gradient(520px_360px_at_90%_12%,rgba(245,179,1,0.10),transparent_66%)]" />
      <div className="relative mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-[#111827]/75 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur sm:p-10">
          <span className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-[22px] border border-[#2563EB]/40 bg-[linear-gradient(145deg,rgba(37,99,235,0.34),rgba(37,99,235,0.07))] text-[#76A3FF] shadow-[0_14px_34px_rgba(37,99,235,0.25)]">
            <span className="absolute inset-x-2 top-1 h-px bg-white/45" />
            <SearchX className="h-7 w-7" />
          </span>
          <div className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#F5B301]">404 — page not found</div>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">This URL does not match an active Sikhadenge page</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#B0B7C3]">
            The address may be incorrect, the page may have moved, or the generated slug may not exist. Invalid URLs return a real 404 so users and crawlers are not sent to misleading generic content.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { href: "/", label: "Go to home", icon: Home },
              { href: "/blog", label: "Browse guides", icon: BookOpen },
              { href: "/courses", label: "Explore courses", icon: Compass },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#2563EB]/50 hover:bg-[#2563EB]/10">
                <item.icon className="h-5 w-5 text-[#76A3FF]" />
                <div className="mt-4 inline-flex items-center gap-2 font-bold">
                  {item.label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
