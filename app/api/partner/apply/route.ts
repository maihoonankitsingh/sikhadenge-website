export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type PartnerApplication = {
  id: string;
  partnerType: string;
  fullName: string;
  phone: string;
  email: string;
  city?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  telegramUrl?: string;
  audienceSize?: string;
  niche?: string;
  trafficSource?: string;
  experience?: string;
  whyJoin?: string;
  status: "PENDING";
  source: "WEBSITE_FORM";
  createdAt: string;
};

const dataFile = path.join(process.cwd(), "data", "partner-applications.json");

function clean(v: unknown, max = 500) {
  return String(v ?? "").trim().slice(0, max);
}

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

async function ensureFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]\n", "utf8");
  }
}

async function readAll(): Promise<PartnerApplication[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(items: PartnerApplication[]) {
  const tmp = dataFile + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(items, null, 2) + "\n", "utf8");
  await fs.rename(tmp, dataFile);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const partnerType =
      clean(body?.partnerType, 30).toLowerCase() === "influencer"
        ? "influencer"
        : "affiliate";

    const fullName = clean(body?.fullName, 120);
    const phone = onlyDigits(clean(body?.phone, 30));
    const email = clean(body?.email, 160).toLowerCase();

    if (!fullName) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Valid 10-digit phone is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const all = await readAll();

    const duplicate = all.find(
      (x) =>
        x.phone === phone ||
        x.email.toLowerCase() === email
    );

    if (duplicate) {
      return NextResponse.json(
        { error: "Application already exists for this phone or email." },
        { status: 409 }
      );
    }

    const item: PartnerApplication = {
      id: `pa_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      partnerType,
      fullName,
      phone,
      email,
      city: clean(body?.city, 120),
      instagramUrl: clean(body?.instagramUrl, 300),
      youtubeUrl: clean(body?.youtubeUrl, 300),
      linkedinUrl: clean(body?.linkedinUrl, 300),
      telegramUrl: clean(body?.telegramUrl, 300),
      audienceSize: clean(body?.audienceSize, 120),
      niche: clean(body?.niche, 160),
      trafficSource: clean(body?.trafficSource, 200),
      experience: clean(body?.experience, 3000),
      whyJoin: clean(body?.whyJoin, 3000),
      status: "PENDING",
      source: "WEBSITE_FORM",
      createdAt: new Date().toISOString(),
    };

    all.unshift(item);
    await writeAll(all);

    return NextResponse.json({
      ok: true,
      message: "Application submitted successfully.",
      id: item.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit application right now." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: "Method available. Use POST to submit application." },
    { status: 200 }
  );
}
