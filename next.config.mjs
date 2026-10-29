import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const permanentRedirects = [
  ["/community-charter", "/about/charter"],
  ["/sponsors", "/about/sponsors"],
  ["/partners", "/about/partners"],
  ["/coc", "/about/coc"],
  ["/support", "/support/support-providers"],
  ["/merch", "/contribute/shop"],
  ["/cloud-images", "/download"],
  ["/alternative-images", "/download"],
  ["/licensing", "/legal/licensing"],
  ["/privacy-policy", "/legal/privacy"],
  ["/trademark", "/legal/trademarks"],
  [
    "/news/2024-07-01-rocky-linux-9-cve-2024-6378-regression",
    "/news/2024-07-01-openssh-sigalrm-regression",
  ],
  ["/keys", "/resources/gpg-key-info"],
  ["/security.txt", "/.well-known/security.txt"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
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
  async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "staging.rockylinux.org",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
  async redirects() {
    return permanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
