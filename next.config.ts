import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://99.253.1.168/:path*'
      }
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
