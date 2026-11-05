import type { NextConfig } from "next";

// Record the build time without requiring a GitHub API request at runtime.
const lastUpdated = new Date().toISOString();

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_LAST_UPDATED: lastUpdated },
  transpilePackages: ["next-mdx-remote"],
  // next dev otherwise creates agent instruction files in the project root.
  agentRules: false,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  /* config options here */
};

export default nextConfig;
