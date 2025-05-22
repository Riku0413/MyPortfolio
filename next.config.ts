import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['i.imgur.com', 'images.microcms-assets.io'], // ← ここにドメインを追加！
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.notion-static.com',
      }
    ],
  },
};

export default nextConfig;
