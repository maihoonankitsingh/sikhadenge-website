/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // build ko lint errors se block mat karo (production stability)
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;
