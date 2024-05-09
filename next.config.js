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
        source: "/community-charter",
        destination: "/about/charter",
        permanent: true,
      },
      {
        source: "/sponsors",
        destination: "/about/sponsors",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/about/partners",
        permanent: true,
      },
      {
        source: "/coc",
        destination: "/about/coc",
        permanent: true,
      },
      {
        source: "/support",
        destination: "/support/support-providers",
        permanent: true,
      },
      {
        source: "/merch",
        destination: "/contribute/shop",
        permanent: true,
      },
      {
        source: "/cloud-images",
        destination: "/download",
        permanent: true,
      },
      {
        source: "/alternative-images",
        destination: "/download",
        permanent: true,
      },
      {
        source: "/licensing",
        destination: "/legal/licensing",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy",
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
