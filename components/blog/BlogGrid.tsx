import Link from "next/link";
import Image from "next/image";

type Blog = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

const blogs: Blog[] = [
  {
    slug: "ai-design-career",
    title: "AI + Design: Career Roadmap for 2026",
    category: "AI & Design",
    date: "Jan 22, 2026",
    readTime: "7 min read",
    image: "/blog/featured-1.jpg",
    featured: true,
  },
  {
    slug: "freelancing-video-editing",
    title: "How to Start Freelancing in Video Editing",
    category: "Career",
    date: "Jan 21, 2026",
    readTime: "6 min read",
    image: "/blog/featured-2.jpg",
    featured: true,
  },
  {
    slug: "graphic-design-basics",
    title: "Graphic Design Basics for Beginners",
    category: "Design",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    image: "/blog/side-1.jpg",
  },
  {
    slug: "premiere-pro-workflow",
    title: "Premiere Pro Fast Editing Workflow",
    category: "Video Editing",
    date: "Jan 19, 2026",
    readTime: "5 min read",
    image: "/blog/side-2.jpg",
  },
  {
    slug: "after-effects-motion",
    title: "Motion Graphics with After Effects",
    category: "Motion",
    date: "Jan 18, 2026",
    readTime: "6 min read",
    image: "/blog/side-3.jpg",
  },
  {
    slug: "ai-tools-creators",
    title: "Best AI Tools for Content Creators",
    category: "AI Tools",
    date: "Jan 17, 2026",
    readTime: "4 min read",
    image: "/blog/side-4.jpg",
  },
];

export default function BlogGrid() {
  const featured = blogs.filter(b => b.featured);
  const side = blogs.filter(b => !b.featured);

  return (
    <section className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left column */}
      <div className="lg:col-span-3 space-y-6">
        {side.slice(0, 3).map(blog => (
          <Card key={blog.slug} blog={blog} />
        ))}
      </div>

      {/* Center featured */}
      <div className="lg:col-span-6 space-y-6">
        {featured.map(blog => (
          <FeaturedCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {/* Right column */}
      <div className="lg:col-span-3 space-y-6">
        {side.slice(3).map(blog => (
          <Card key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
}

function Card({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-pink-400">{blog.category}</p>
      <h3 className="mt-1 text-sm font-semibold text-white">{blog.title}</h3>
      <p className="mt-1 text-xs text-gray-400">{blog.date} · {blog.readTime}</p>
    </Link>
  );
}

function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
        <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs uppercase text-pink-400">{blog.category}</p>
          <h2 className="mt-1 text-xl font-bold text-white">{blog.title}</h2>
          <p className="mt-1 text-xs text-gray-300">{blog.date} · {blog.readTime}</p>
        </div>
      </div>
    </Link>
  );
}
