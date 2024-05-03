const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.rockylinux.org", "rockylinux.org"],
  },
  async redirects() {
    return [
      {
        source: "/cloud-images",
        destination: "/download",
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
