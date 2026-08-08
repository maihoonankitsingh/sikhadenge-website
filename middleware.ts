import { NextResponse, type NextRequest } from "next/server";
import {
  DASHBOARD_AUTH_COOKIE,
  DASHBOARD_NEXT_COOKIE,
  isDashboardAuthValueValid,
  sanitizeDashboardNext,
} from "./lib/dashboard-auth";

const STATIC_FILE_RE = /\.(?:avif|bmp|css|gif|ico|jpg|jpeg|js|json|map|png|svg|txt|webmanifest|webp|woff|woff2|xml)$/i;

const PRIVATE_PAGE_PREFIXES = ["/dashboard", "/admin"];
const PRIVATE_API_PREFIXES = ["/api/admin"];
const GENERATED_REVIEW_PREFIXES = ["/expert/", "/learn/", "/prompts/", "/hindi/"];

function pathMatchesPrefix(pathname: string, prefix: string) {
  const normalized = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  return pathname === normalized || pathname.startsWith(`${normalized}/`);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPrivatePage = PRIVATE_PAGE_PREFIXES.some((prefix) =>
    pathMatchesPrefix(pathname, prefix),
  );
  const isPrivateApi = PRIVATE_API_PREFIXES.some((prefix) =>
    pathMatchesPrefix(pathname, prefix),
  );

  // P0: one HttpOnly dashboard session protects dashboard pages, legacy admin
  // pages, and every /api/admin endpoint before route code can run.
  if (isPrivatePage || isPrivateApi) {
    const authCookie = request.cookies.get(DASHBOARD_AUTH_COOKIE)?.value || "";

    if (!isDashboardAuthValueValid(authCookie)) {
      if (isPrivateApi) {
        return NextResponse.json(
          { ok: false, error: "unauthorized" },
          {
            status: 401,
            headers: {
              "Cache-Control": "no-store",
              "X-Robots-Tag": "noindex, nofollow, noarchive",
            },
          },
        );
      }

      const returnTo = sanitizeDashboardNext(
        `${pathname}${request.nextUrl.search || ""}`,
      );
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/dashboard-login";
      loginUrl.search = "";
      loginUrl.searchParams.set("next", returnTo);

      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.headers.set(
        "X-Robots-Tag",
        "noindex, nofollow, noarchive",
      );
      redirectResponse.cookies.set({
        name: DASHBOARD_NEXT_COOKIE,
        value: returnTo,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10,
      });
      return redirectResponse;
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

  // Private surfaces must never enter search results. Fully generated SEO
  // families stay browsable while they are re-qualified, but are quarantined
  // from indexing until an explicit quality/approval policy promotes them.
  if (isPrivatePage || isPrivateApi) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store");
  } else if (GENERATED_REVIEW_PREFIXES.some((prefix) => pathMatchesPrefix(pathname, prefix))) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest).*)"],
};
