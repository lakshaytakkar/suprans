import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: [
    "@suprans/ui",
    "@suprans/utils",
    "@suprans/types",
    "@suprans/config",
    "@suprans/database",
    "@suprans/auth",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
