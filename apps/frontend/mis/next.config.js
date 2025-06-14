/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/:slug*`,
      },
    ];
  },
};
