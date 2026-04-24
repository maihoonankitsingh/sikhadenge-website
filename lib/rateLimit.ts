type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Bucket>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const xrip = req.headers.get("x-real-ip");
  if (xrip) return xrip.trim();

  const cfip = req.headers.get("cf-connecting-ip");
  if (cfip) return cfip.trim();

  return "unknown";
}

export function rateLimit(req: Request, opts: RateLimitOptions = {}) {
  const limit = opts.limit ?? 30;
  const windowMs = opts.windowMs ?? 60_000;

  const ip = getClientIp(req);
  const url = new URL(req.url);
  const key = `${ip}:${url.pathname}`;

  const now = Date.now();
  const current = store.get(key);

  if (!current || now >= current.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Too many requests",
        retryAfter,
      }),
      {
        status: 429,
        headers: {
          "content-type": "application/json",
          "retry-after": String(retryAfter),
        },
      }
    );
  }

  current.count += 1;
  store.set(key, current);
  return null;
}
