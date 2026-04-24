export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

function computeReadTime(content: string): number {
  const text = String(content || "").replace(/\s+/g, " ").trim();
  if (!text) return 1;
  const words = text.split(" ").length;
  const minutes = Math.ceil(words / 200);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : 1;
}

function cleanStr(v: any): string {
  return String(v ?? "").trim();
}

function isBad(v: string): boolean {
  return !v || v === "=";
}

export async function GET() {
  try {
    const rows = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        category: true,
        readTime: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 200,
    });

    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json(
      { error: "failed_to_fetch_blogs", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const title = cleanStr(body.title);
    const slug = cleanStr(body.slug);
    const excerpt = cleanStr(body.excerpt || title);
    const content = cleanStr(body.content);
    const coverImage = cleanStr(body.coverImage || "https://sikhadenge.in/og-default.jpg");
    const category = cleanStr(body.category || "General");

    if (isBad(title) || isBad(slug) || isBad(content)) {
      return NextResponse.json({ error: "invalid_payload", title, slug }, { status: 400 });
    }

    const publishedAt = body.publishedAt ? new Date(body.publishedAt) : undefined;
    const readTime = computeReadTime(content);

    const row = await prisma.blog.upsert({
      where: { slug },
      create: { title, slug, excerpt, content, coverImage, category, readTime, publishedAt },
      update: { title, excerpt, content, coverImage, category, readTime, publishedAt },
    });

    return NextResponse.json({ ok: true, blog: row });
  } catch (e: any) {
    return NextResponse.json(
      { error: "failed_to_upsert_blog", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}
