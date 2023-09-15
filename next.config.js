const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.rockylinux.org", "rockylinux.org"],
  },
};

module.exports = withNextIntl(nextConfig);
