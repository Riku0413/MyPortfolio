import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i.imgur.com', 'images.microcms-assets.io'], // ← ここにドメインを追加！
  },
};

export default nextConfig;
