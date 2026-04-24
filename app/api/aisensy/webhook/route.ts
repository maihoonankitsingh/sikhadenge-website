export const revalidate = 0;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("OK", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.text(); // raw body for debugging
    console.log("AISENSY_WEBHOOK:", body);
    return Response.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || "UNKNOWN" }, { status: 200 });
  }
}
