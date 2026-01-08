import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable static optimization for pages that use Supabase
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Force dynamic rendering for all pages
  output: 'standalone',
};

export default nextConfig;
