export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";
import Image from "next/image";

type BlogCard = {
  slug: string;
  title: string;
  category?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
  readTime?: number | null;
};

function fmtDate(d?: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function CardSmall({ p }: { p: BlogCard }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group block rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:bg-white/[0.05] transition"
    >
      <div className="relative h-[140px] w-full">
        <Image
          src={p.coverImage || "/images/blog-default.jpg"}
          alt={p.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </div>
      <div className="p-4">
        <div className="text-[11px] tracking-widest uppercase text-[#F5B301]">
          {(p.category || "Blog").toString()}
        </div>
        <div className="mt-2 text-[15px] font-semibold text-white leading-snug line-clamp-2">
          {p.title}
        </div>
        <div className="mt-2 text-xs text-white/60">
          {fmtDate(p.publishedAt)}{p.readTime ? ` · ${p.readTime} min read` : ""}
        </div>
      </div>
    </Link>
  );
}

function CardFeatured({ p }: { p: BlogCard }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group block rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:bg-white/[0.05] transition"
    >
      <div className="relative h-[320px] w-full">
        <Image
          src={p.coverImage || "/images/blog-default.jpg"}
          alt={p.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition"
          sizes="(max-width: 768px) 100vw, 720px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="p-6 -mt-16 relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] tracking-widest uppercase text-white/80">
          {(p.category || "Popular").toString()}
        </div>
        <div className="mt-3 text-2xl md:text-3xl font-semibold text-white leading-tight">
          {p.title}
        </div>
        <div className="mt-2 text-sm text-white/60">
          {fmtDate(p.publishedAt)}{p.readTime ? ` · ${p.readTime} min read` : ""}
        </div>
      </div>
    </Link>
  );
}

export default function TopReadSection({ posts }: { posts: BlogCard[] }) {
  const featured = posts[0];
  const left = posts.slice(1, 4);
  const right = posts.slice(4, 7);

  if (!featured) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-10 pb-12">
      <div className="text-xs tracking-widest uppercase text-[#2563EB]">POPULAR BLOGS</div>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-white">
        Check our Top-read Blog posts
      </h1>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 grid gap-6">
          {left.map((p) => <CardSmall key={p.slug} p={p} />)}
        </div>

        <div className="lg:col-span-6">
          <CardFeatured p={featured} />
        </div>

        <div className="lg:col-span-3 grid gap-6">
          {right.map((p) => <CardSmall key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}
