import { config } from "./src/lib/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: `${config.apiUrl}/:path*`,  // All calls to /api/* on Next.js
        destination: `${config.backendApi}/:path*`,
        // Replace with your FastAPI backend (dev/prod)
      },
    ];
  },
};

export default nextConfig;
