/** @type {import('next').NextConfig} */
const rawImageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
const imageHostname = rawImageBaseUrl
  .replace(/^https?:\/\//, "")
  .split("/")[0]
  .trim();

const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        hostname: imageHostname,
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
