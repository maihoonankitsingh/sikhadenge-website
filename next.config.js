/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },

  async redirects() {
    return [
      // SIKHADENGE_LANDING_TO_ROOT_PERMANENT_REDIRECT_V1
      {
        source: "/landing",
        destination: "/",
        permanent: true,
      },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:path*", destination: "/blog/:path*", permanent: true },
      { source: "/blog/index", destination: "/blog", permanent: true },
      { source: "/blog/page/:page", destination: "/blog", permanent: true },
      { source: "/blog/ai-career/ai-freelancer-skills", destination: "/blog/ai-skills-for-freelancers", permanent: true },
      { source: "/blog/ai-career/ai-generalist-career", destination: "/blog/ai-career-paths", permanent: true },
      { source: "/blog/ai-content/ai-content-tools", destination: "/blog/best-ai-tools-for-content-creators", permanent: true },
      { source: "/blog/ai-content/ai-copywriting", destination: "/blog/ai-tools-for-copywriting", permanent: true },
      { source: "/blog/ai-design/ai-graphic-design-tools", destination: "/blog/best-ai-tools-for-graphic-design", permanent: true },
      { source: "/blog/ai-design/ai-logo-design", destination: "/blog/ai-tools-for-logo-design-beginners", permanent: true },
      { source: "/blog/ai-tools/chatgpt-guide", destination: "/learn/how-to-use-chatgpt", permanent: true },
      { source: "/blog/ai-tools/gemini-guide", destination: "/learn/how-to-use-gemini", permanent: true },
      { source: "/blog/ai-video/ai-reels-workflow", destination: "/blog/ai-video-workflow-for-creators", permanent: true },
      { source: "/blog/ai-video/ai-video-editing-tools", destination: "/blog/best-ai-tools-for-video-editing", permanent: true },
      { source: "/blog/chatgpt-vs-gemini", destination: "/blog/gemini-vs-chatgpt", permanent: true },
      { source: "/blog/how-to-rank-on-chatgpt", destination: "/blog/how-to-rank-in-chatgpt", permanent: true },
      { source: "/blog/ai-tools-for-students-in-2026", destination: "/blog/ai-tools-for-students", permanent: true },
      { source: "/blog/chatgpt-for-students-in-2026", destination: "/blog/chatgpt-for-students", permanent: true },
      { source: "/blog/top-ai-tools-for-students", destination: "/blog/best-ai-tools-for-students", permanent: true },
      { source: "/blog/top-ai-tools-for-freelancers", destination: "/blog/best-ai-tools-for-freelancers", permanent: true },
      { source: "/blog/top-ai-tools-for-video-editing", destination: "/blog/best-ai-tools-for-video-editing", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/about-sikhadenge-indias-no-1-graphic-design-video-editing-institute", destination: "/about-us", permanent: true },
      { source: "/contacts", destination: "/contact-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },

      { source: "/prices-page/", destination: "/courses", permanent: true },
      { source: "/customer-engagement/", destination: "/contact-us", permanent: true },
      { source: "/home-two/", destination: "/", permanent: true },
      { source: "/our-services/", destination: "/courses", permanent: true },
      { source: "/ai-automation/", destination: "/ai-automation", permanent: true },
      { source: "/refund_returns/", destination: "/refund-policy", permanent: true },
      { source: "/course-details", destination: "/courses", permanent: true },
      { source: "/checkout/", destination: "/store", permanent: true },
    ];
  },

  async headers() {
    const ogImageNoindexHeaders = [
      // SIKHADENGE_OG_IMAGE_X_ROBOTS_V1
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
    ];

    return [
      {
        source: "/opengraph-image",
        headers: ogImageNoindexHeaders,
      },
      {
        source: "/twitter-image",
        headers: ogImageNoindexHeaders,
      },
      {
        source: "/:path*/opengraph-image",
        headers: ogImageNoindexHeaders,
      },
      {
        source: "/:path*/twitter-image",
        headers: ogImageNoindexHeaders,
      },
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

module.exports = nextConfig;
