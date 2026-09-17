import {
  processArchitecturesData,
  resolveUrl,
} from "@/utils/downloadDataProcessor";
import type { DownloadData, Version } from "@/types/downloads";

type Translations = Parameters<typeof processArchitecturesData>[1];

const translations = {
  tabs: {},
  tabsShortened: {},
  cards: {
    defaultImages: {
      title: "Default Images",
      tooltips: { dvd: "", boot: "", minimal: "", buttonLabel: "" },
      downloadOptions: { dvd: "DVD ISO", boot: "Boot ISO", minimal: "Minimal" },
      torrent: "Torrent",
      checksum: "CHECKSUM",
      baseOs: "BaseOS",
      archived: "Archived",
      checksums: "CHECKSUMS",
    },
    cloudImages: { title: "Cloud", downloadOptions: { qcow2: "QCOW2" } },
    container: {
      title: "Container",
      downloadOptions: { fullImage: "Full", minimalImage: "Minimal" },
    },
    liveImages: {
      title: "Live",
      downloadOptions: { gnome: "GNOME", kde: "KDE" },
    },
    rpiImages: { title: "RPi", download: "RPi Image", readMe: "README" },
    wslImages: { title: "WSL", download: "WSL Image", readMe: "README" },
    visionfive2Images: {
      title: "VisionFive 2",
      download: "VF2 Image",
      readMe: "README",
    },
  },
} satisfies Translations;

const makeVersion = (
  downloadOptions: Partial<Version["downloadOptions"]> = {}
): Version => ({
  versionName: "Rocky Linux 10",
  versionId: "rocky-10",
  currentVersion: "v10.2",
  plannedEol: "May 31, 2035",
  downloadOptions: {
    defaultImages: {
      dvd: "https://example.com/dvd.iso",
      boot: "https://example.com/boot.iso",
      minimal: "https://example.com/minimal.iso",
    },
    container: {
      fullImage: "https://example.com/full",
      minimalImage: "https://example.com/minimal",
    },
    ...downloadOptions,
  },
  links: {
    defaultImages: {
      torrent: "https://example.com/dvd.torrent",
      checksum: "https://example.com/CHECKSUM",
      baseOs: "https://example.com/BaseOS/",
      archived: "https://example.com/vault",
    },
    cloudImages: { checksum: "https://example.com/cloud/CHECKSUM" },
    rpiImages: {
      checksum: "https://example.com/rpi/CHECKSUM",
      readMe: "https://example.com/rpi/README",
    },
  },
});

const process = (architectures: DownloadData["architectures"]) =>
  processArchitecturesData({ architectures }, translations);

describe("resolveUrl", () => {
  it("returns plain string entries", () => {
    expect(resolveUrl("https://example.com/a.iso")).toBe(
      "https://example.com/a.iso"
    );
  });

  it("treats an object without enabled as enabled", () => {
    expect(resolveUrl({ url: "https://example.com/a.iso" })).toBe(
      "https://example.com/a.iso"
    );
  });

  it("returns undefined for disabled or missing entries", () => {
    expect(
      resolveUrl({ url: "https://example.com/a.iso", enabled: false })
    ).toBeUndefined();
    expect(resolveUrl(undefined)).toBeUndefined();
  });

  it("ignores disabled-reason", () => {
    expect(
      resolveUrl({
        url: "https://example.com/a.iso",
        enabled: false,
        "disabled-reason": "Returns 404",
      })
    ).toBeUndefined();
  });
});

describe("processArchitecturesData", () => {
  it("keeps a group when only some downloads are disabled", () => {
    const result = process({
      x86_64: {
        versions: [
          makeVersion({
            defaultImages: {
              dvd: { url: "https://example.com/dvd.iso", enabled: false },
              boot: "https://example.com/boot.iso",
              minimal: {
                url: "https://example.com/minimal.iso",
                enabled: false,
              },
            },
          }),
        ],
      },
    });

    const { defaultImages } = result.x86_64.versions[0];
    expect(defaultImages.downloadOptions).toEqual([
      { label: "Boot ISO", link: "https://example.com/boot.iso" },
    ]);
    expect(defaultImages.links).toHaveLength(4);
  });

  it("empties a group and its links when every download is disabled", () => {
    const result = process({
      x86_64: {
        versions: [
          makeVersion({
            defaultImages: {
              dvd: { url: "https://example.com/dvd.iso", enabled: false },
              boot: { url: "https://example.com/boot.iso", enabled: false },
              minimal: {
                url: "https://example.com/minimal.iso",
                enabled: false,
              },
            },
          }),
        ],
      },
    });

    const { defaultImages, containerImages } = result.x86_64.versions[0];
    expect(defaultImages).toEqual({ downloadOptions: [], links: [] });
    expect(containerImages.downloadOptions).toHaveLength(2);
  });

  it("filters live images by key", () => {
    const result = process({
      x86_64: {
        versions: [
          makeVersion({
            liveImages: {
              gnome: "https://example.com/gnome.iso",
              gnomeLite: {
                url: "https://example.com/lite.iso",
                enabled: false,
              },
              kde: { url: "https://example.com/kde.iso" },
            } as Version["downloadOptions"]["liveImages"],
          }),
        ],
      },
    });

    expect(result.x86_64.versions[0].liveImages.downloadOptions).toEqual([
      { label: "GNOME", link: "https://example.com/gnome.iso" },
      { label: "KDE", link: "https://example.com/kde.iso" },
    ]);
  });

  it("does not count currentVersion as a download", () => {
    const result = process({
      aarch64: {
        versions: [
          makeVersion({
            rpiImages: {
              currentVersion: "v10.2",
              download: { url: "https://example.com/rpi.raw", enabled: false },
            },
          }),
        ],
      },
    });

    expect(result.aarch64.versions[0].rpiImages).toEqual({
      downloadOptions: [],
      links: [],
    });
  });

  it("skips disabled links while the group has enabled downloads", () => {
    const version = makeVersion();
    version.links.defaultImages.torrent = {
      url: "https://example.com/dvd.torrent",
      enabled: false,
      "disabled-reason": "Returns 404",
    };
    version.downloadOptions.rpiImages = {
      download: "https://example.com/rpi.raw",
    };
    version.links.rpiImages = {
      checksum: "https://example.com/rpi/CHECKSUM",
      readMe: { url: "https://example.com/rpi/README", enabled: false },
    };

    const result = process({ aarch64: { versions: [version] } });

    const { defaultImages, rpiImages } = result.aarch64.versions[0];
    expect(defaultImages.downloadOptions).toHaveLength(3);
    expect(defaultImages.links.map((link) => link.name)).toEqual([
      "CHECKSUM",
      "BaseOS",
      "Archived",
    ]);
    expect(rpiImages).toEqual({
      downloadOptions: [
        { label: "RPi Image", link: "https://example.com/rpi.raw" },
      ],
      links: [{ name: "CHECKSUM", link: "https://example.com/rpi/CHECKSUM" }],
    });
  });

  it("keeps optional groups empty when they are missing", () => {
    const result = process({ x86_64: { versions: [makeVersion()] } });

    const version = result.x86_64.versions[0];
    expect(version.cloudImages).toEqual({ downloadOptions: [], links: [] });
    expect(version.liveImages).toEqual({ downloadOptions: [], links: [] });
  });

  it("removes an architecture with no enabled downloads", () => {
    const disabled = (url: string) => ({ url, enabled: false });

    const result = process({
      x86_64: { versions: [makeVersion()] },
      riscv64: {
        versions: [
          makeVersion({
            defaultImages: {
              dvd: disabled("https://example.com/dvd.iso"),
              boot: disabled("https://example.com/boot.iso"),
            },
            container: {
              fullImage: disabled("https://example.com/full"),
              minimalImage: disabled("https://example.com/minimal"),
            },
            visionfive2Images: {
              download: disabled("https://example.com/vf2.img"),
            },
          }),
        ],
      },
    });

    expect(Object.keys(result)).toEqual(["x86_64"]);
  });
});
