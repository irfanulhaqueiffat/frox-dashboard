// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      // keep this only if you still need it
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
