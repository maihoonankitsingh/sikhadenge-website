import crypto from "crypto";

type AdmissionCompletionPayload = {
  admissionId: string;
  exp: number;
  purpose: "admission-complete";
};

function getSecret() {
  const secret = String(
    process.env.ADMISSION_COMPLETION_SECRET ||
      process.env.RAZORPAY_KEY_SECRET ||
      ""
  ).trim();

  if (!secret) {
    throw new Error("Admission completion secret missing");
  }

  return secret;
}

function sign(encodedPayload: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("hex");
}

export function createAdmissionCompletionToken(
  admissionId: string,
  ttlSeconds = 2 * 60 * 60
) {
  const payload: AdmissionCompletionPayload = {
    admissionId,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    purpose: "admission-complete",
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload),
    "utf8"
  ).toString("base64url");

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyAdmissionCompletionToken(
  token: string
): AdmissionCompletionPayload | null {
  try {
    const [encodedPayload, receivedSignature] = String(token || "").split(".");

    if (!encodedPayload || !receivedSignature) {
      return null;
    }

    const expectedSignature = sign(encodedPayload);
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(receivedSignature, "hex");

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AdmissionCompletionPayload;

    if (
      payload.purpose !== "admission-complete" ||
      !payload.admissionId ||
      !Number.isFinite(payload.exp) ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
