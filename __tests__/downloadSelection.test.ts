import {
  availableArchs,
  availablePlatforms,
  groupsFor,
  listReleases,
  majorVersion,
  resolveArch,
  resolvePlatform,
} from "@/utils/downloadSelection";
import type {
  ProcessedArchitectures,
  ProcessedVersion,
} from "@/types/downloads";

const empty = { downloadOptions: [], links: [] };
const option = (label: string) => ({
  id: label.toLowerCase(),
  label,
  link: `https://example.com/${label}`,
});

const makeVersion = (
  versionId: string,
  overrides: Partial<ProcessedVersion> = {}
): ProcessedVersion => ({
  versionName: `Rocky Linux ${majorVersion(versionId)}`,
  versionId,
  currentVersion: `v${majorVersion(versionId)}.0`,
  plannedEol: "2030",
  defaultImages: { downloadOptions: [option("DVD ISO")], links: [] },
  cloudImages: empty,
  containerImages: empty,
  liveImages: empty,
  rpiImages: empty,
  wslImages: empty,
  visionFive2Images: empty,
  ...overrides,
});

const arches: ProcessedArchitectures = {
  x86_64: {
    versions: [
      makeVersion("rocky-8", {
        liveImages: { downloadOptions: [option("GNOME")], links: [] },
      }),
      makeVersion("rocky-10", {
        liveImages: { downloadOptions: [option("GNOME")], links: [] },
        wslImages: { downloadOptions: [option("WSL")], links: [] },
      }),
    ],
  },
  aarch64: {
    versions: [
      makeVersion("rocky-10", {
        // Raspberry Pi images belong to aarch64 only
        rpiImages: { downloadOptions: [option("RPi")], links: [] },
      }),
    ],
  },
  riscv64: {
    versions: [
      makeVersion("rocky-10", {
        // Misplaced data on an architecture the platform does not support
        rpiImages: { downloadOptions: [option("RPi")], links: [] },
        visionFive2Images: { downloadOptions: [option("VF2")], links: [] },
      }),
    ],
  },
};

describe("downloadSelection", () => {
  it("lists releases once each, newest first", () => {
    expect(listReleases(arches).map((r) => r.versionId)).toEqual([
      "rocky-10",
      "rocky-8",
    ]);
  });

  it("hides releases whose downloads are all disabled", () => {
    const noDownloads = {
      defaultImages: empty,
      cloudImages: empty,
      containerImages: empty,
      liveImages: empty,
      rpiImages: empty,
      wslImages: empty,
      visionFive2Images: empty,
    };
    const withRetired: ProcessedArchitectures = {
      x86_64: {
        versions: [
          makeVersion("rocky-10"),
          makeVersion("rocky-9"),
          makeVersion("rocky-8", noDownloads),
        ],
      },
      aarch64: {
        versions: [
          makeVersion("rocky-10"),
          makeVersion("rocky-8", noDownloads),
        ],
      },
    };

    expect(listReleases(withRetired).map((r) => r.versionId)).toEqual([
      "rocky-10",
      "rocky-9",
    ]);
  });

  it("extracts the major version", () => {
    expect(majorVersion("rocky-10")).toBe("10");
  });

  it("only returns non-empty groups", () => {
    expect(groupsFor(arches, "x86_64", "rocky-10", "install")).toHaveLength(1);
    expect(groupsFor(arches, "x86_64", "rocky-10", "containers")).toEqual([]);
  });

  it("respects per-platform architecture restrictions", () => {
    const keys = (arch: string) =>
      groupsFor(arches, arch, "rocky-10", "devices").map((g) => g.key);
    expect(keys("aarch64")).toEqual(["rpiImages"]);
    expect(keys("riscv64")).toEqual(["visionFive2Images"]);
  });

  it("lists architectures that have downloads for a selection", () => {
    expect(availableArchs(arches, "rocky-10", "install")).toEqual([
      "x86_64",
      "aarch64",
      "riscv64",
    ]);
    expect(availableArchs(arches, "rocky-10", "wsl")).toEqual(["x86_64"]);
    expect(availableArchs(arches, "rocky-8", "install")).toEqual(["x86_64"]);
  });

  it("always offers cloud and hides platforms without downloads", () => {
    expect(availablePlatforms(arches, "rocky-8")).toEqual([
      "install",
      "cloud",
      "desktop",
    ]);
    expect(availablePlatforms(arches, "rocky-10")).toEqual([
      "install",
      "cloud",
      "desktop",
      "wsl",
      "devices",
    ]);
  });

  describe("resolvePlatform", () => {
    const available = ["cloud", "install", "wsl"] as const;

    it("keeps a valid, available request", () => {
      expect(resolvePlatform([...available], "wsl")).toBe("wsl");
    });

    it("falls back to servers for unknown or unavailable requests", () => {
      expect(resolvePlatform([...available], "bogus")).toBe("install");
      expect(resolvePlatform([...available], "devices")).toBe("install");
      expect(resolvePlatform([...available], null)).toBe("install");
    });

    it("uses the first platform when servers are unavailable", () => {
      expect(resolvePlatform(["cloud", "wsl"], null)).toBe("cloud");
    });
  });

  describe("resolveArch", () => {
    it("keeps an available request", () => {
      expect(resolveArch(["x86_64", "aarch64"], "aarch64")).toBe("aarch64");
    });

    it("defaults to x86_64 rather than guessing", () => {
      expect(resolveArch(["aarch64", "x86_64"], null)).toBe("x86_64");
      expect(resolveArch(["aarch64", "x86_64"], "bogus")).toBe("x86_64");
    });

    it("uses the first architecture when x86_64 is unavailable", () => {
      expect(resolveArch(["aarch64", "riscv64"], null)).toBe("aarch64");
    });

    it("returns undefined when nothing is available", () => {
      expect(resolveArch([], null)).toBeUndefined();
    });
  });
});
