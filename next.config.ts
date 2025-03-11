import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ["creatorspace.imgix.net", "storage.googleapis.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
