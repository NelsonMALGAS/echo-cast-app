import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "content.production.cdn.art19.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dumslp4el/image/fetch/**",
      },
      {
        protocol: "https",
        hostname: "content.production.cdn.art19.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
