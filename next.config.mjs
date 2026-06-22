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
    unoptimized: true,
  },
  compress: true,
};

export default nextConfig;
