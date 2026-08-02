import redirectMap from "../data/blog-redirects/high-pilot.json";

const BLOG_REDIRECTS =
  redirectMap as Readonly<
    Record<string, string>
  >;

export const BLOG_REDIRECT_SOURCE_COUNT =
  Object.keys(BLOG_REDIRECTS).length;

export function getBlogRedirectTarget(
  slug: string,
): string | null {
  if (
    !Object.prototype.hasOwnProperty.call(
      BLOG_REDIRECTS,
      slug,
    )
  ) {
    return null;
  }

  const target = BLOG_REDIRECTS[slug];

  return (
    typeof target === "string" &&
    target.trim()
  )
    ? target.trim()
    : null;
}

export function isBlogRedirectSource(
  slug: string,
): boolean {
  return (
    getBlogRedirectTarget(slug) !== null
  );
}
