import type { RemotePattern } from "next/dist/shared/lib/image-config";
import type { Redirect } from "next/dist/lib/load-custom-routes";
import type { NextConfig } from "next";

// Mock next-intl/plugin before importing next.config
jest.mock("next-intl/plugin", () => {
  return () => (config: NextConfig) => ({
    ...config,
    i18n: { locales: ["en"], defaultLocale: "en" },
  });
});

import nextConfig from "../next.config.mjs";

const expectedRedirects: [string, string][] = [
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

describe("next.config", () => {
  describe("images", () => {
    let remotePatterns: RemotePattern[];

    beforeAll(async () => {
      remotePatterns = nextConfig.images!.remotePatterns as RemotePattern[];
    });

    it("should have the correct number of remote patterns", async () => {
      expect(remotePatterns).toHaveLength(2);
    });

    it("should have the Rocky Linux domain with www", async () => {
      expect(remotePatterns).toContainEqual({
        protocol: "https",
        hostname: "www.rockylinux.org",
      });
    });

    it("should have the Rocky Linux domain without www", async () => {
      expect(remotePatterns).toContainEqual({
        protocol: "https",
        hostname: "rockylinux.org",
      });
    });
  });

  describe("redirects", () => {
    let redirects: Redirect[];

    beforeAll(async () => {
      redirects = await (nextConfig.redirects as () => Promise<Redirect[]>)();
    });

    it("should have the correct number of redirects", async () => {
      expect(redirects).toHaveLength(expectedRedirects.length);
    });

    it.each(expectedRedirects)(
      "should redirect %s to %s",
      (source, destination) => {
        expect(redirects).toContainEqual<Redirect>({
          source,
          destination,
          permanent: true,
        });
      }
    );

    describe("error cases", () => {
      it("should not have any redirects with malformed URLs", () => {
        const hasValidUrl = (url: string) => {
          // Check if URL starts with a forward slash
          if (!url.startsWith("/")) return false;

          // Check for double slashes (except for http://)
          if (url.match(/(?<!:)\/\//)) return false;

          // Check for trailing spaces
          if (url.trim() !== url) return false;

          // Check for URL-unsafe characters
          const unsafeChars = /[<>{}|^~[\]`]/;
          if (unsafeChars.test(url)) return false;

          return true;
        };

        for (const redirect of redirects) {
          expect(hasValidUrl(redirect.source)).toBe(true);
          expect(hasValidUrl(redirect.destination)).toBe(true);
        }
      });

      it("should not have any redirects to external URLs", () => {
        for (const redirect of redirects) {
          expect(redirect.destination).not.toMatch(/^https?:\/\//);
        }
      });

      it("should not have any redirect loops", () => {
        // Build a map of redirects
        const redirectMap = new Map<string, string>();
        for (const redirect of redirects) {
          redirectMap.set(redirect.source, redirect.destination);
        }

        // Check each redirect path for loops
        const findLoop = (
          start: string,
          visited = new Set<string>()
        ): boolean => {
          if (visited.has(start)) return true;

          const destination = redirectMap.get(start);
          if (!destination) return false;

          visited.add(start);
          // Check if the destination is also a source of another redirect
          if (redirectMap.has(destination)) {
            return findLoop(destination, visited);
          }
          return false;
        };

        // Test each redirect for loops
        for (const redirect of redirects) {
          expect(findLoop(redirect.source)).toBe(false);
        }
      });

      it("should not have duplicate source paths", () => {
        const sources = redirects.map((r) => r.source);
        const uniqueSources = new Set(sources);
        expect(sources.length).toBe(uniqueSources.size);
      });

      it("should not have any redirects to their own source", () => {
        for (const redirect of redirects) {
          expect(redirect.source).not.toBe(redirect.destination);
        }
      });

      it("should have valid permanent flag", () => {
        for (const redirect of redirects) {
          expect(typeof redirect.permanent).toBe("boolean");
        }
      });
    });

    describe("redirect chain validation", () => {
      it("should not exceed maximum redirect chain length", () => {
        const MAX_CHAIN_LENGTH = 5; // Reasonable maximum for redirect chains

        const getRedirectChain = (start: string): string[] => {
          const chain: string[] = [start];
          let current = start;

          while (true) {
            const redirect = redirects.find((r) => r.source === current);
            if (!redirect) break;

            chain.push(redirect.destination);
            current = redirect.destination;

            // Prevent infinite loops (though we test for them separately)
            if (chain.length > MAX_CHAIN_LENGTH) break;
          }

          return chain;
        };

        for (const redirect of redirects) {
          const chain = getRedirectChain(redirect.source);
          expect(chain.length).toBeLessThanOrEqual(MAX_CHAIN_LENGTH);
        }
      });
    });
  });
});
