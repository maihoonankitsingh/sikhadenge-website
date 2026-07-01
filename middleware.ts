import { NextResponse, type NextRequest } from "next/server";

const STATIC_FILE_RE = /\.(?:avif|bmp|css|gif|ico|jpg|jpeg|js|json|map|png|svg|txt|webmanifest|webp|woff|woff2|xml)$/i;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

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

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest).*)"],
};
