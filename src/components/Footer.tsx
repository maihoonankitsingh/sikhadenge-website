"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0B1220]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-lg font-semibold text-white">Sikhadenge</div>
            <div className="mt-2 max-w-md text-sm leading-6 text-[#B0B7C3]">
              ThinkGrow Pvt. Ltd. — Practical, future-ready learning focused on real workflows and professional output.
            </div>
          </div>

          <div className="grid gap-3 text-sm md:text-right">
            <Link className="text-[#B0B7C3] hover:text-white" href="/about-us">About</Link>
            <Link className="text-[#B0B7C3] hover:text-white" href="/contact">Contact</Link>
            <Link className="text-[#B0B7C3] hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            <Link className="text-[#B0B7C3] hover:text-white" href="/terms">Terms</Link>
            <Link className="text-[#B0B7C3] hover:text-white" href="/refund-policy">Refund Policy</Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#9CA3AF] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Sikhadenge. All rights reserved.</div>
          <div>Parent Company: ThinkGrow Pvt. Ltd.</div>
        </div>
      </div>
    </footer>
  );
}
