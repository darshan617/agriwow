/** @type {import('next').NextConfig} */
const rawImageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
const imageHostname = rawImageBaseUrl
  .replace(/^https?:\/\//, "")
  .split("/")[0]
  .trim();

// 31 days — Lighthouse wants ≥30d; Next Image / static assets use this floor.
const LONG_CACHE_TTL_SECONDS = 60 * 60 * 24 * 31;

const remotePatterns = [
  ...(imageHostname
    ? [
        {
          protocol: "https",
          hostname: imageHostname,
        },
      ]
    : []),
  // Proxied via /_next/image so browsers get our long Cache-Control, not YouTube’s 2h TTL.
  {
    protocol: "https",
    hostname: "img.youtube.com",
    pathname: "/vi/**",
  },
  {
    protocol: "https",
    hostname: "i.ytimg.com",
    pathname: "/vi/**",
  },
];

const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns,
    unoptimized: false,
    minimumCacheTTL: LONG_CACHE_TTL_SECONDS,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${LONG_CACHE_TTL_SECONDS}, immutable`,
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${LONG_CACHE_TTL_SECONDS}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
