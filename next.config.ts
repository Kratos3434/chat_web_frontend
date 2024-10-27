import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://99.252.98.97/:path*'
      }
    ]
  }
};

export default nextConfig;
