const { extractDownloadUrls } = require("../scripts/check-download-urls.js");

const version = {
  downloadOptions: {
    defaultImages: {
      dvd: "https://example.com/dvd.iso",
      boot: {
        url: "https://example.com/boot.iso",
        enabled: false,
        "disabled-reason": "Returns 404",
      },
    },
    liveImages: {
      gnome: { url: "https://example.com/gnome.iso", enabled: false },
    },
    rpiImages: {
      currentVersion: "v10.2",
      download: { url: "https://example.com/rpi.raw" },
    },
    specializedDevices: [
      {
        name: "Raspberry Pi",
        download: "https://example.com/sbc.raw",
        checksum: "https://example.com/sbc.CHECKSUM",
        readMe: { url: "https://example.com/sbc/README", enabled: false },
      },
    ],
  },
  links: {
    defaultImages: {
      checksum: "https://example.com/CHECKSUM",
      torrent: {
        url: "https://example.com/dvd.torrent",
        enabled: false,
        "disabled-reason": "Returns 404",
      },
    },
    liveImages: {
      checksums: "https://example.com/live/",
      readMe: { url: "https://example.com/live/README", enabled: false },
    },
    rpiImages: { readMe: "https://example.com/rpi/README" },
  },
};

describe("extractDownloadUrls", () => {
  const { urls, disabled, hiddenLinks } = extractDownloadUrls({
    architectures: { aarch64: { versions: [version] } },
  });
  const found = urls.map((entry: { url: string }) => entry.url);

  it("skips disabled downloads and keeps enabled ones", () => {
    expect(found).toContain("https://example.com/dvd.iso");
    expect(found).toContain("https://example.com/rpi.raw");
    expect(found).not.toContain("https://example.com/boot.iso");
    expect(found).not.toContain("https://example.com/gnome.iso");
  });

  it("checks links only for groups with an enabled download", () => {
    expect(found).toContain("https://example.com/CHECKSUM");
    expect(found).toContain("https://example.com/rpi/README");
    expect(found).not.toContain("https://example.com/live/");
  });

  it("skips disabled links but keeps their group's other links", () => {
    expect(found).not.toContain("https://example.com/dvd.torrent");
    expect(found).toContain("https://example.com/CHECKSUM");
  });

  it("checks specialized device URLs unless a field is disabled", () => {
    expect(found).toContain("https://example.com/sbc.raw");
    expect(found).toContain("https://example.com/sbc.CHECKSUM");
    expect(found).not.toContain("https://example.com/sbc/README");
  });

  it("ignores non-URL strings and counts disabled downloads and hidden links separately", () => {
    expect(found).not.toContain("v10.2");
    // boot, gnome, torrent, sbc README, and the live README (disabled wins
    // over hidden when its group is hidden too)
    expect(disabled).toBe(5);
    expect(hiddenLinks).toBe(1);
  });

  it("reports the download path without a url suffix", () => {
    expect(urls).toContainEqual({
      url: "https://example.com/rpi.raw",
      path: "architectures.aarch64.versions.0.downloadOptions.rpiImages.download",
    });
  });
});
