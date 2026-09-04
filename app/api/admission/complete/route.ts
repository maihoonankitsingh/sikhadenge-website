export const revalidate = 0;

import crypto from "crypto";
import path from "path";
import { mkdir, rm, writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmissionCompletionToken } from "@/lib/admission-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

type ValidatedUpload = {
  key: string;
  extension: ".jpg" | ".png" | ".pdf";
  buffer: Buffer;
};

function detectExtension(
  mime: string,
  buffer: Buffer
): ".jpg" | ".png" | ".pdf" | null {
  const isJpeg =
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff;

  const isPng =
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    );

  const isPdf =
    buffer.length >= 5 &&
    buffer.subarray(0, 5).toString("ascii") === "%PDF-";

  if (mime === "image/jpeg" && isJpeg) return ".jpg";
  if (mime === "image/png" && isPng) return ".png";
  if (mime === "application/pdf" && isPdf) return ".pdf";

  return null;
}

async function validateUpload(
  value: FormDataEntryValue | null,
  key: string
): Promise<ValidatedUpload> {
  if (!(value instanceof File) || !value.name) {
    throw new Error(`${key} required`);
  }

  if (value.size <= 0) {
    throw new Error(`${key} file is empty`);
  }

  if (value.size > MAX_FILE_BYTES) {
    throw new Error(`${key} must be 5 MB or smaller`);
  }

  const buffer = Buffer.from(await value.arrayBuffer());
  const extension = detectExtension(value.type, buffer);

  if (!extension) {
    throw new Error(`${key} must be a genuine JPG, PNG or PDF file`);
  }

  return {
    key,
    extension,
    buffer,
  };
}

export async function POST(req: Request) {
  const writtenPaths: string[] = [];

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sd_admission_complete")?.value || "";
    const tokenPayload = verifyAdmissionCompletionToken(token);

    if (!tokenPayload) {
      return NextResponse.json(
        {
          ok: false,
          error: "Admission completion session expired. Verify payment again.",
        },
        { status: 401 }
      );
    }

    const admissionId = tokenPayload.admissionId;

    if (!/^[A-Za-z0-9_-]{10,64}$/.test(admissionId)) {
      return NextResponse.json(
        { ok: false, error: "Invalid admission session" },
        { status: 400 }
      );
    }

    const admission = await prisma.admission.findUnique({
      where: {
        id: admissionId,
      },
      select: {
        id: true,
        feeTotal: true,
        feePaid: true,
      },
    });

    if (!admission) {
      return NextResponse.json(
        { ok: false, error: "Admission record not found" },
        { status: 404 }
      );
    }

    if (
      admission.feeTotal == null ||
      admission.feePaid == null ||
      admission.feePaid < admission.feeTotal
    ) {
      return NextResponse.json(
        { ok: false, error: "Captured payment is required" },
        { status: 403 }
      );
    }

    const formData = await req.formData();

    const aadhaar = String(formData.get("aadhaar") || "").replace(/\D/g, "");

    if (aadhaar.length !== 12) {
      return NextResponse.json(
        { ok: false, error: "Valid 12-digit Aadhaar required" },
        { status: 400 }
      );
    }

    const highestQualification = String(
      formData.get("highestQualification") || ""
    ).trim();

    if (!highestQualification) {
      return NextResponse.json(
        { ok: false, error: "Highest qualification required" },
        { status: 400 }
      );
    }

    const uploads = await Promise.all([
      validateUpload(formData.get("aadhaarFront"), "Aadhaar front"),
      validateUpload(formData.get("aadhaarBack"), "Aadhaar back"),
      validateUpload(
        formData.get("qualificationDoc"),
        "Qualification document"
      ),
    ]);

    const privateDirectory = path.join(
      process.cwd(),
      "data",
      "private",
      "admission",
      admission.id
    );

    await mkdir(privateDirectory, {
      recursive: true,
      mode: 0o700,
    });

    const storedReferences: Record<string, string> = {};

    for (const upload of uploads) {
      const fileName = `${upload.key
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")}_${crypto
        .randomBytes(12)
        .toString("hex")}${upload.extension}`;

      const absolutePath = path.join(privateDirectory, fileName);

      await writeFile(absolutePath, upload.buffer, {
        mode: 0o600,
        flag: "wx",
      });

      writtenPaths.push(absolutePath);
      storedReferences[upload.key] =
        `private://admission/${admission.id}/${fileName}`;
    }

    await prisma.admission.update({
      where: {
        id: admission.id,
      },
      data: {
        aadhaarLast4: aadhaar.slice(-4),
        highestQualification,
        aadhaarFrontUrl: storedReferences["Aadhaar front"],
        aadhaarBackUrl: storedReferences["Aadhaar back"],
        qualificationDocUrl:
          storedReferences["Qualification document"],
      },
    });

    const response = NextResponse.json({
      ok: true,
      admissionId: admission.id,
    });

    response.cookies.set("sd_admission_complete", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    await Promise.all(
      writtenPaths.map((filePath) =>
        rm(filePath, {
          force: true,
        }).catch(() => undefined)
      )
    );

    console.error("ADMISSION_COMPLETE_ERROR", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Admission completion failed",
      },
      { status: 500 }
    );
  }
}
