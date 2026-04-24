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
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

module.exports = nextConfig;
