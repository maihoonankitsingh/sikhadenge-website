export const revalidate = 0;
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function safeExt(name: string) {
  const base = name.toLowerCase();
  if (base.endsWith(".jpg") || base.endsWith(".jpeg")) return ".jpg";
  if (base.endsWith(".png")) return ".png";
  if (base.endsWith(".pdf")) return ".pdf";
  return "";
}

async function saveUpload(admissionId: string, key: string, file: File) {
  const ext = safeExt(file.name);
  if (!ext) throw new Error(`Invalid file type for ${key}. Use JPG/PNG/PDF only.`);

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!bytes.length) throw new Error(`${key} file empty`);

  const rand = crypto.randomBytes(8).toString("hex");
  const fileName = `${key}_${rand}${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads", "admission", admissionId);
  await mkdir(dir, { recursive: true });

  const abs = path.join(dir, fileName);
  await writeFile(abs, bytes);

  return `/uploads/admission/${admissionId}/${fileName}`;
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const admissionId = String(fd.get("admissionId") || "").trim();
    if (!admissionId) {
      return NextResponse.json({ ok: false, error: "admissionId required" }, { status: 400 });
    }

    const aadhaar = String(fd.get("aadhaar") || "").replace(/\D/g, "");
    if (aadhaar.length !== 12) {
      return NextResponse.json({ ok: false, error: "Valid 12-digit Aadhaar required" }, { status: 400 });
    }
    const aadhaarLast4 = aadhaar.slice(-4);

    const highestQualification = String(fd.get("highestQualification") || "").trim() || null;

    const af = fd.get("aadhaarFront");
    const ab = fd.get("aadhaarBack");
    const qc = fd.get("qualificationDoc");

    if (!(af instanceof File) || !af.name) {
      return NextResponse.json({ ok: false, error: "aadhaarFront required" }, { status: 400 });
    }
    if (!(ab instanceof File) || !ab.name) {
      return NextResponse.json({ ok: false, error: "aadhaarBack required" }, { status: 400 });
    }
    if (!(qc instanceof File) || !qc.name) {
      return NextResponse.json({ ok: false, error: "qualificationDoc required" }, { status: 400 });
    }

    const aadhaarFrontUrl = await saveUpload(admissionId, "aadhaar_front", af);
    const aadhaarBackUrl = await saveUpload(admissionId, "aadhaar_back", ab);
    const qualificationDocUrl = await saveUpload(admissionId, "qualification", qc);

    await prisma.admission.update({
      where: { id: admissionId },
      data: {
        aadhaarLast4,
        highestQualification,
        aadhaarFrontUrl,
        aadhaarBackUrl,
        qualificationDocUrl,
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, admissionId });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
