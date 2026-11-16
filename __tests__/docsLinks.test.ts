import { docsUrls } from "@/utils/docsLinks";

describe("docsUrls", () => {
  it("links to the versioned docs for a known release", () => {
    expect(docsUrls("rocky-10")).toEqual({
      home: "https://docs.rockylinux.org/10/",
      install: "https://docs.rockylinux.org/10/guides/installation/",
      migrate: "https://docs.rockylinux.org/10/guides/migrate2rocky/",
    });
  });

  it("uses each release's own installation guide", () => {
    expect(docsUrls("rocky-9").install).toBe(
      "https://docs.rockylinux.org/9/guides/9_6_installation/"
    );
    expect(docsUrls("rocky-8").install).toBe(
      "https://docs.rockylinux.org/8/guides/8_6_installation/"
    );
  });

  it("falls back to the unversioned docs for unknown releases", () => {
    expect(docsUrls("rocky-11")).toEqual({
      home: "https://docs.rockylinux.org/",
      install: "https://docs.rockylinux.org/guides/installation/",
      migrate: "https://docs.rockylinux.org/guides/migrate2rocky/",
    });
  });
});
