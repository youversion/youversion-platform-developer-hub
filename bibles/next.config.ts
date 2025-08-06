import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web-assets.youversion.com",
      },
    ],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
