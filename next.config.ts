import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
};

export default nextConfig;