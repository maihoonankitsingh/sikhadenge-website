import { NextResponse, type NextRequest } from "next/server";

const STATIC_FILE_RE = /\.(?:avif|bmp|css|gif|ico|jpg|jpeg|js|json|map|png|svg|txt|webmanifest|webp|woff|woff2|xml)$/i;

const PRIVATE_PREFIXES = ["/dashboard", "/admin"];
const GENERATED_REVIEW_PREFIXES = ["/expert/", "/learn/", "/prompts/", "/hindi/"];

function pathMatchesPrefix(pathname: string, prefix: string) {
  const normalized = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  return pathname === normalized || pathname.startsWith(`${normalized}/`);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // P0: enforce dashboard access before any dashboard route can render.
  // The nested dashboard layout keeps the same check as defense in depth.
  if (pathMatchesPrefix(pathname, "/dashboard")) {
    const authCookie = request.cookies.get("sd_dash_auth")?.value || "";
    const expectedToken = (process.env.DASHBOARD_AUTH_TOKEN || "").trim();

    if (!expectedToken || authCookie !== expectedToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/dashboard-login";
      loginUrl.search = "";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  const isStatic =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    STATIC_FILE_RE.test(pathname);

  if (!isStatic) {
    response.headers.set("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("CDN-Cache-Control", "no-store");
    response.headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    response.headers.set("Surrogate-Control", "no-store");
  }

  // P0/P3: private routes must never enter search results. Fully generated SEO
  // families stay browsable while they are re-qualified, but are quarantined
  // from indexing until an explicit quality/approval policy promotes them.
  if (PRIVATE_PREFIXES.some((prefix) => pathMatchesPrefix(pathname, prefix))) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  } else if (GENERATED_REVIEW_PREFIXES.some((prefix) => pathMatchesPrefix(pathname, prefix))) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest).*)"],
};
