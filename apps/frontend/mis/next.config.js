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
      {
        protocol: "https", // The image uses HTTPS
        hostname: "st3.depositphotos.com", // The hostname of the image
        // You can optionally add a pathname if you want to restrict further, e.g.:
        // pathname: "/9998432/**",
      },
    ],
  },
};
