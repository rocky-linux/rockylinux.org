const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.rockylinux.org",
      },
      {
        hostname: "rockylinux.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cloud-images",
        destination: "/download",
        permanent: true,
      },
      {
        source: "/trademark",
        destination: "/legal/trademarks",
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
