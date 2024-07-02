const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.rockylinux.org",
      },
      {
        protocol: "https",
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
      {
        source: "/news/2024-07-01-rocky-linux-9-cve-2024-6378-regression",
        destination: "/news/2024-07-01-openssh-sigalrm-regression",
        permanent: true,
      }
    ];
  },
};

module.exports = withNextIntl(nextConfig);
