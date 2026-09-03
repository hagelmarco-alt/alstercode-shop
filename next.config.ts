import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/api/extra/**": ["./content/packs/**/*"],
  },
};

export default nextConfig;
