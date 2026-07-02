/** @type {import('next').NextConfig} */
const rawImageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
const imageHostname = rawImageBaseUrl
  .replace(/^https?:\/\//, "")
  .split("/")[0]
  .trim();
const remotePatterns = imageHostname
  ? [
      {
        hostname: imageHostname,
      },
    ]
  : [];

const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns,
    unoptimized: false,
  },
};

export default nextConfig;
