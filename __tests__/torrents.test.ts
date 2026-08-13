import {
  buildMagnet,
  formatBytes,
  getTorrentDataInfo,
  getTorrents,
  torrentDescription,
  torrentTitle,
  variantLabel,
} from "@/lib/torrents";
import type { Torrent } from "@/types/torrents";

const sampleTorrent: Torrent = {
  name: "Rocky-10.2-x86_64-dvd1",
  release: "10.2",
  majorVersion: "10",
  arch: "x86_64",
  variant: "dvd",
  torrentUrl:
    "https://dl.rockylinux.org/pub/rocky/10.2/isos/x86_64/Rocky-10.2-x86_64-dvd1.torrent",
  torrentSize: 12949,
  infoHash: "7e8c7d97c0dcbe038c575e45fddb051e569c812d",
  contentLength: 10226544830,
  pieceLength: 16777216,
  files: [
    { path: "CHECKSUM", length: 942 },
    { path: "Rocky-10.2-x86_64-dvd1.iso", length: 10226171904 },
  ],
  trackers: [
    "udp://tracker.opentrackr.org:1337/announce",
    "http://bt1.archive.org:6969/announce",
  ],
  magnet: "magnet:?xt=urn:btih:7e8c7d97c0dcbe038c575e45fddb051e569c812d",
  createdAt: "2026-05-29T04:04:03.000Z",
  lastModified: "2026-05-29T04:27:05.000Z",
};

describe("buildMagnet", () => {
  it("includes the info hash, display name and every tracker", () => {
    const magnet = buildMagnet("abc123", "Rocky-10.2-x86_64-dvd1", [
      "udp://tracker.opentrackr.org:1337/announce",
      "http://bt1.archive.org:6969/announce",
    ]);

    expect(magnet).toBe(
      "magnet:?xt=urn:btih:abc123&dn=Rocky-10.2-x86_64-dvd1" +
        "&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce" +
        "&tr=http%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce"
    );
  });

  it("works without trackers", () => {
    expect(buildMagnet("abc123", "Rocky")).toBe(
      "magnet:?xt=urn:btih:abc123&dn=Rocky"
    );
  });

  it("percent-encodes the display name", () => {
    expect(buildMagnet("abc123", "Rocky 10.2 & friends")).toContain(
      "dn=Rocky%2010.2%20%26%20friends"
    );
  });
});

describe("formatBytes", () => {
  it.each([
    [0, "0 B"],
    [1023, "1023 B"],
    [1024, "1.00 KiB"],
    [1048576, "1.00 MiB"],
    [10226544830, "9.52 GiB"],
    [1099511627776, "1.00 TiB"],
  ])("formats %d as %s", (bytes, expected) => {
    expect(formatBytes(bytes)).toBe(expected);
  });

  it("guards against invalid input", () => {
    expect(formatBytes(-1)).toBe("0 B");
    expect(formatBytes(Number.NaN)).toBe("0 B");
  });
});

describe("variantLabel", () => {
  it("maps known variants to display labels", () => {
    expect(variantLabel("dvd")).toBe("DVD");
    expect(variantLabel("boot")).toBe("Boot");
    expect(variantLabel("minimal")).toBe("Minimal");
  });

  it("falls back to the raw identifier", () => {
    expect(variantLabel("live-gnome")).toBe("live-gnome");
  });
});

describe("torrentTitle", () => {
  it("summarises the release, architecture, variant and size", () => {
    expect(torrentTitle(sampleTorrent)).toBe(
      "Rocky Linux 10.2 x86_64 DVD (9.52 GiB)"
    );
  });
});

describe("torrentDescription", () => {
  it("describes the torrent contents", () => {
    expect(torrentDescription(sampleTorrent)).toBe(
      "Rocky-10.2-x86_64-dvd1 — DVD image for x86_64, 9.52 GiB, 2 files."
    );
  });

  it("uses the singular form for a single file", () => {
    expect(
      torrentDescription({
        ...sampleTorrent,
        files: [{ path: "Rocky.iso", length: 10226544830 }],
      })
    ).toContain("1 file.");
  });
});

describe("data/torrents.json", () => {
  const torrents = getTorrents();

  it("is not empty", () => {
    expect(torrents.length).toBeGreaterThan(0);
  });

  it("records where and when it was generated", () => {
    const { generatedAt, source } = getTorrentDataInfo();

    expect(source).toBe("https://dl.rockylinux.org/pub/rocky/");
    expect(Number.isNaN(Date.parse(generatedAt))).toBe(false);
  });

  it("has a unique, well-formed info hash for every torrent", () => {
    const hashes = torrents.map((torrent) => torrent.infoHash);

    hashes.forEach((hash) => expect(hash).toMatch(/^[0-9a-f]{40}$/));
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it("serves every torrent from the master mirror over HTTPS", () => {
    torrents.forEach((torrent) => {
      expect(torrent.torrentUrl).toMatch(
        /^https:\/\/dl\.rockylinux\.org\/pub\/rocky\/.+\.torrent$/
      );
    });
  });

  it("has positive sizes and a matching file total", () => {
    torrents.forEach((torrent) => {
      expect(torrent.torrentSize).toBeGreaterThan(0);
      expect(torrent.pieceLength).toBeGreaterThan(0);
      expect(torrent.files.length).toBeGreaterThan(0);

      const total = torrent.files.reduce((sum, file) => sum + file.length, 0);
      expect(torrent.contentLength).toBe(total);
    });
  });

  it("has at least one tracker and a magnet matching the info hash", () => {
    torrents.forEach((torrent) => {
      expect(torrent.trackers.length).toBeGreaterThan(0);
      expect(torrent.magnet).toBe(
        buildMagnet(torrent.infoHash, torrent.name, torrent.trackers)
      );
    });
  });

  it("has parseable timestamps", () => {
    torrents.forEach((torrent) => {
      expect(Number.isNaN(Date.parse(torrent.createdAt ?? ""))).toBe(false);
      expect(Number.isNaN(Date.parse(torrent.lastModified ?? ""))).toBe(false);
    });
  });

  it("only uses known variants and consistent version fields", () => {
    torrents.forEach((torrent) => {
      expect(["boot", "dvd", "minimal"]).toContain(torrent.variant);
      expect(torrent.release.startsWith(`${torrent.majorVersion}.`)).toBe(true);
      expect(torrent.torrentUrl).toContain(`/${torrent.release}/isos/`);
      expect(torrent.torrentUrl).toContain(`/${torrent.arch}/`);
    });
  });

  it("is sorted newest first", () => {
    const dates = torrents.map((torrent) =>
      Date.parse(torrent.createdAt ?? "")
    );
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });
});
