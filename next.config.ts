import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.visitkorea.or.kr" },
      { protocol: "https", hostname: "**.visitjeju.net" },
      { protocol: "http", hostname: "**.visitkorea.or.kr" },
      { protocol: "http", hostname: "**.visitjeju.net" },
      { protocol: "https", hostname: "cdn.*.kr" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
