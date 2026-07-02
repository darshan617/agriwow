/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        hostname: "goyalinfotech.in",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
