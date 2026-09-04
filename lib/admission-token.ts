import crypto from "crypto";

type AdmissionCompletionPayload = {
  admissionId: string;
  exp: number;
  purpose: "admission-complete";
};

function getSecrets() {
  const currentSecret = String(
    process.env.ADMISSION_COMPLETION_SECRET || ""
  ).trim();

  const previousSecret = String(
    process.env.ADMISSION_COMPLETION_SECRET_PREVIOUS || ""
  ).trim();

  if (!currentSecret) {
    throw new Error(
      "Admission completion secret missing"
    );
  }

  return [
    currentSecret,
    ...(previousSecret &&
    previousSecret !== currentSecret
      ? [previousSecret]
      : []),
  ];
}

function signWithSecret(
  encodedPayload: string,
  secret: string
) {
  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("hex");
}

function sign(encodedPayload: string) {
  const [currentSecret] = getSecrets();

  return signWithSecret(
    encodedPayload,
    currentSecret
  );
}

function hasValidSignature(
  encodedPayload: string,
  receivedSignature: string
) {
  const receivedBuffer = Buffer.from(
    receivedSignature,
    "hex"
  );

  if (receivedBuffer.length !== 32) {
    return false;
  }

  let valid = false;

  for (const secret of getSecrets()) {
    const expectedSignature =
      signWithSecret(
        encodedPayload,
        secret
      );

    const expectedBuffer = Buffer.from(
      expectedSignature,
      "hex"
    );

    const matches =
      expectedBuffer.length ===
        receivedBuffer.length &&
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    valid = valid || matches;
  }

  return valid;
}

export function createAdmissionCompletionToken(
  admissionId: string,
  ttlSeconds = 2 * 60 * 60
) {
  const payload: AdmissionCompletionPayload = {
    admissionId,
    exp:
      Math.floor(Date.now() / 1000) +
      ttlSeconds,
    purpose: "admission-complete",
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload),
    "utf8"
  ).toString("base64url");

  return `${
    encodedPayload
  }.${sign(encodedPayload)}`;
}

export function verifyAdmissionCompletionToken(
  token: string
): AdmissionCompletionPayload | null {
  try {
    const [
      encodedPayload,
      receivedSignature,
      extraPart,
    ] = String(token || "").split(".");

    if (
      !encodedPayload ||
      !receivedSignature ||
      extraPart !== undefined
    ) {
      return null;
    }

    if (
      !hasValidSignature(
        encodedPayload,
        receivedSignature
      )
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(
        encodedPayload,
        "base64url"
      ).toString("utf8")
    ) as AdmissionCompletionPayload;

    if (
      payload.purpose !==
        "admission-complete" ||
      !payload.admissionId ||
      !Number.isFinite(payload.exp) ||
      payload.exp <
        Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
