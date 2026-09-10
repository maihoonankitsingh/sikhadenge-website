import { randomUUID } from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPartnerRuntimeConfig } from "../../../../lib/b2b-intake-config";

type ApiResponse =
  | {
      ok: true;
      enrollmentId: string;
      learnerCode: string;
      admissionCode?: string | null;
      duplicateEnrollment: boolean;
    }
  | { ok: false; error: string };

type RateRow = { count: number; startedAt: number };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;
const MAX_RATE_KEYS = 5000;
const hits: Map<string, RateRow> =
  (globalThis as any).__sd_b2b_intake_hits ||
  ((globalThis as any).__sd_b2b_intake_hits = new Map<string, RateRow>());

function text(input: unknown, max: number) {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, max);
}

function optionalText(input: unknown, max: number) {
  const normalized = text(input, max);
  return normalized || undefined;
}

function normalizePhone(input: unknown) {
  const raw = text(input, 30);
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

function validEmail(input: string | undefined) {
  if (!input) return true;
  return input.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

function firstHeader(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0]?.trim() || "";
  return value?.split(",")[0]?.trim() || "";
}

function clientIp(req: NextApiRequest) {
  if (process.env.B2B_INTAKE_TRUST_PROXY_HEADERS !== "true") {
    return req.socket.remoteAddress || "unknown";
  }

  return (
    firstHeader(req.headers["cf-connecting-ip"]) ||
    firstHeader(req.headers["x-real-ip"]) ||
    firstHeader(req.headers["x-forwarded-for"]) ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function pruneRateMap(now: number) {
  if (hits.size < MAX_RATE_KEYS) return;
  for (const [key, row] of hits) {
    if (now - row.startedAt >= WINDOW_MS) hits.delete(key);
  }
  if (hits.size >= MAX_RATE_KEYS) {
    const overflow = hits.size - MAX_RATE_KEYS + 250;
    let removed = 0;
    for (const key of hits.keys()) {
      hits.delete(key);
      removed += 1;
      if (removed >= overflow) break;
    }
  }
}

function rateLimited(key: string) {
  const now = Date.now();
  pruneRateMap(now);
  const current = hits.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    hits.set(key, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  hits.set(key, current);
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function requestHost(req: NextApiRequest) {
  if (process.env.B2B_INTAKE_TRUST_PROXY_HEADERS === "true") {
    const forwarded = firstHeader(req.headers["x-forwarded-host"]);
    if (forwarded) return forwarded.toLowerCase();
  }
  return firstHeader(req.headers.host).toLowerCase();
}

function sameOrigin(req: NextApiRequest) {
  const origin = firstHeader(req.headers.origin);
  if (!origin) return true;

  let originHost = "";
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }

  const configuredHosts = (process.env.B2B_INTAKE_ALLOWED_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  if (configuredHosts.length) return configuredHosts.includes(originHost);
  return originHost === requestHost(req);
}

function safeErrorStatus(status: number) {
  return [400, 404, 409, 422, 429].includes(status) ? status : 503;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const contentType = firstHeader(req.headers["content-type"]);
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return res.status(415).json({ ok: false, error: "Content-Type must be application/json" });
  }

  if (!sameOrigin(req)) {
    return res.status(403).json({ ok: false, error: "Request origin is not allowed" });
  }

  const partner = Array.isArray(req.query.partner) ? req.query.partner[0] : req.query.partner;
  if (!partner || !/^[a-z0-9-]{2,80}$/.test(partner)) {
    return res.status(404).json({ ok: false, error: "Partner enrollment is not configured" });
  }

  const ip = clientIp(req);
  if (rateLimited(`${partner}:${ip}`)) {
    res.setHeader("Retry-After", "600");
    return res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  }

  const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};

  if (text((body as any).hp, 100)) {
    return res.status(200).json({
      ok: true,
      enrollmentId: "accepted",
      learnerCode: "accepted",
      duplicateEnrollment: false,
    });
  }

  const fullName = text((body as any).fullName, 180);
  const email = optionalText((body as any).email, 254)?.toLowerCase();
  const phone = normalizePhone((body as any).phone);
  const idempotencyHeader = req.headers["x-idempotency-key"];
  const idempotencyKey = Array.isArray(idempotencyHeader) ? idempotencyHeader[0] : idempotencyHeader;

  if (fullName.length < 2) {
    return res.status(400).json({ ok: false, error: "Valid full name is required" });
  }
  if (phone === null) {
    return res.status(400).json({ ok: false, error: "Valid phone number is required" });
  }
  if (!email && !phone) {
    return res.status(400).json({ ok: false, error: "Email or phone is required" });
  }
  if (!validEmail(email)) {
    return res.status(400).json({ ok: false, error: "Valid email is required" });
  }
  if ((body as any).trainingEnrollmentAccepted !== true) {
    return res.status(400).json({ ok: false, error: "Enrollment notice acknowledgement is required" });
  }
  if (
    idempotencyKey &&
    (idempotencyKey.length < 8 || idempotencyKey.length > 200 || !/^[A-Za-z0-9._:-]+$/.test(idempotencyKey))
  ) {
    return res.status(400).json({ ok: false, error: "Invalid submission identifier" });
  }

  try {
    const config = getPartnerRuntimeConfig(partner);
    if (!config) {
      return res.status(404).json({ ok: false, error: "Partner enrollment is not configured" });
    }

    const consents: Array<Record<string, string>> = [
      {
        purpose: "TRAINING_ENROLLMENT",
        status: "GRANTED",
        noticeVersion: config.noticeVersion,
        source: "sikhadenge-website",
        channel: "web",
      },
    ];

    if ((body as any).programCommunicationConsent === true) {
      consents.push({
        purpose: "PROGRAM_COMMUNICATION",
        status: "GRANTED",
        noticeVersion: config.noticeVersion,
        source: "sikhadenge-website",
        channel: "web",
      });
    }

    const city = optionalText((body as any).city, 100);
    const state = optionalText((body as any).state, 100);
    const externalStudentId = optionalText((body as any).externalStudentId, 100);
    const rollNumber = optionalText((body as any).rollNumber, 100);
    const department = optionalText((body as any).department, 150);
    const branch = optionalText((body as any).branch, 150);
    const yearLevel = optionalText((body as any).yearLevel, 50);
    const semester = optionalText((body as any).semester, 50);

    const payload = {
      organizationSlug: config.organizationSlug,
      programCode: config.programCode,
      ...(config.batchCode ? { batchCode: config.batchCode } : {}),
      learner: {
        fullName,
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(city ? { city } : {}),
        ...(state ? { state } : {}),
        country: "India",
      },
      institution: {
        ...(externalStudentId ? { externalStudentId } : {}),
        ...(rollNumber ? { rollNumber } : {}),
        ...(department ? { department } : {}),
        ...(branch ? { branch } : {}),
        ...(yearLevel ? { yearLevel } : {}),
        ...(semester ? { semester } : {}),
      },
      fundingMode: config.fundingMode,
      consents,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let upstream: Response;
    try {
      upstream = await fetch(`${config.baseUrl}/api/v1/intake/enrollments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey || `web-${partner}-${randomUUID()}`,
          "X-Request-Id": `website-${randomUUID()}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const data = (await upstream.json().catch(() => null)) as any;
    if (!upstream.ok || !data?.ok) {
      const status = safeErrorStatus(upstream.status);
      const safeMessage =
        status === upstream.status && typeof data?.error === "string"
          ? data.error.slice(0, 300)
          : "Enrollment service is temporarily unavailable";
      return res.status(status).json({ ok: false, error: safeMessage });
    }

    const result = data.data || data;
    const enrollmentId = typeof result.enrollmentId === "string" ? result.enrollmentId : "";
    const learnerCode = typeof result.learnerCode === "string" ? result.learnerCode : "";
    if (!enrollmentId || !learnerCode) {
      return res.status(503).json({ ok: false, error: "Enrollment service returned an invalid response" });
    }

    return res.status(upstream.status === 201 ? 201 : 200).json({
      ok: true,
      enrollmentId,
      learnerCode,
      admissionCode: typeof result.admissionCode === "string" ? result.admissionCode : null,
      duplicateEnrollment: Boolean(result.duplicateEnrollment),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return res.status(503).json({ ok: false, error: "Enrollment service timed out" });
    }
    console.error("B2B partner enrollment failed", error instanceof Error ? error.message : error);
    return res.status(503).json({ ok: false, error: "Enrollment service is not configured" });
  }
}
