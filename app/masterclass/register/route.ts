import { NextResponse } from "next/server"; export async function GET() { return new NextResponse(null, { status: 307, headers: { Location: "/gen-ai-masterclass/register" }, });
} export async function HEAD() { return new NextResponse(null, { status: 307, headers: { Location: "/gen-ai-masterclass/register" }, });
}
