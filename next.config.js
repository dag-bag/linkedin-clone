/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "rb.gy",
      "content.linkedin.com",
      "static-exp2.licdn.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
