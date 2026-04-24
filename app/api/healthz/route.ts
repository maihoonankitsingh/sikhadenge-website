export const revalidate = 0;
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return Response.json({ ok: false, error: "db_down" }, { status: 500 });
  }
}
