/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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
};

export default nextConfig;
