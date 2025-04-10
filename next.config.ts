import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "creatorspace.imgix.net",
            "upload.wikimedia.org",
            "cdn.iconscout.com",
            "img.icons8.com",
            "i.namu.wiki",
            "storage.googleapis.com",
            "res.cloudinary.com",
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
