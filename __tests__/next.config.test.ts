import nextConfig from "../next.config";

import type { RemotePattern } from "next/dist/shared/lib/image-config";
import type { Redirect } from "next/dist/lib/load-custom-routes";

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
      expect(redirects).toHaveLength(13);
    });

    it("should have the community-charter redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/community-charter",
        destination: "/about/charter",
        permanent: true,
      });
    });

    it("should have the sponsors redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/sponsors",
        destination: "/about/sponsors",
        permanent: true,
      });
    });

    it("should have the partners redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/partners",
        destination: "/about/partners",
        permanent: true,
      });
    });

    it("should have the coc redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/coc",
        destination: "/about/coc",
        permanent: true,
      });
    });

    it("should have the support redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/support",
        destination: "/support/support-providers",
        permanent: true,
      });
    });

    it("should have the merch redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/merch",
        destination: "/contribute/shop",
        permanent: true,
      });
    });

    it("should have the cloud-images redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/cloud-images",
        destination: "/download",
        permanent: true,
      });
    });

    it("should have the alternative-images redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/alternative-images",
        destination: "/download",
        permanent: true,
      });
    });

    it("should have the licensing redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/licensing",
        destination: "/legal/licensing",
        permanent: true,
      });
    });

    it("should have the privacy-policy redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/privacy-policy",
        destination: "/legal/privacy",
        permanent: true,
      });
    });

    it("should have the trademark redirect", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/trademark",
        destination: "/legal/trademarks",
        permanent: true,
      });
    });

    it("should have typo redirect for regresshion", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/news/2024-07-01-rocky-linux-9-cve-2024-6378-regression",
        destination: "/news/2024-07-01-openssh-sigalrm-regression",
        permanent: true,
      });
    });

    it("should redirect keys to the correct location", async () => {
      expect(redirects).toContainEqual<Redirect>({
        source: "/keys",
        destination: "/resources/gpg-key-info",
        permanent: true,
      });
    });
  });
});
