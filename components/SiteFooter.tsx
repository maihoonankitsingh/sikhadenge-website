import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="text-white font-extrabold">Sikhadenge</div>
          <div className="mt-2 text-[#B0B7C3] leading-6">
            Live online training: Graphic Design, Video Editing, AI-powered creative skills.
          </div>
          <div className="mt-4 text-[#9CA3AF] text-xs">Parent company: ThinkGrow Pvt Ltd.</div>
        </div>

        <div>
          <div className="text-white font-bold text-sm">Pages</div>
          <div className="mt-3 grid gap-2 text-[#B0B7C3]">
            <Link className="hover:text-white" href="/">Home</Link>
            <Link className="hover:text-white" href="/about-us">About</Link>
            <Link className="hover:text-white" href="/contact">Contact</Link>
            <Link className="hover:text-white" href="/blog">Blog</Link>
          </div>
        </div>

        <div>
          <div className="text-white font-bold text-sm">Policies</div>
          <div className="mt-3 grid gap-2 text-[#B0B7C3]">
            <Link className="hover:text-white" href="/terms">Terms</Link>
            <Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 text-center text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} Sikhadenge
      </div>
    </footer>
  );
}

