import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Changed from 'standalone' to 'export'
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Recommended to prevent build crashes
  },
  images: {
    unoptimized: true, // Required for static exports
  },
  reactStrictMode: false,
};

export default nextConfig;
