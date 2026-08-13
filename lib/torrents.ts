import torrentData from "@/data/torrents.json";
import type { Torrent, TorrentData } from "@/types/torrents";

/** Human-readable labels for the image variants published as torrents. */
const VARIANT_LABELS: Record<string, string> = {
  boot: "Boot",
  dvd: "DVD",
  minimal: "Minimal",
};

/**
 * Returns every published torrent, newest first.
 *
 * The data is generated from the master mirror by a maintenance script and
 * committed to `data/torrents.json`, so this is a synchronous static read.
 *
 * @returns The full torrent list.
 */
export function getTorrents(): Torrent[] {
  return (torrentData as TorrentData).torrents;
}

/**
 * Returns metadata about the committed torrent data set.
 *
 * @returns The generation timestamp and source mirror.
 */
export function getTorrentDataInfo(): Pick<
  TorrentData,
  "generatedAt" | "source"
> {
  const { generatedAt, source } = torrentData as TorrentData;
  return { generatedAt, source };
}

/**
 * Builds a magnet URI from an info hash, display name and tracker list.
 *
 * @param infoHash Hex-encoded SHA-1 info hash.
 * @param name Display name used for the `dn` parameter.
 * @param trackers Tracker announce URLs.
 * @returns The magnet URI.
 */
export function buildMagnet(
  infoHash: string,
  name: string,
  trackers: string[] = []
): string {
  const params = [
    `xt=urn:btih:${infoHash}`,
    `dn=${encodeURIComponent(name)}`,
    ...trackers.map((tracker) => `tr=${encodeURIComponent(tracker)}`),
  ];
  return `magnet:?${params.join("&")}`;
}

/**
 * Formats a byte count using binary units.
 *
 * @param bytes Number of bytes.
 * @returns A human-readable size such as `9.52 GiB`.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KiB", "MiB", "GiB", "TiB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Returns the human-readable label for an image variant.
 *
 * @param variant Variant identifier such as `dvd`.
 * @returns The display label, falling back to the raw identifier.
 */
export function variantLabel(variant: string): string {
  return VARIANT_LABELS[variant] ?? variant;
}

/**
 * Builds the feed item title for a torrent.
 *
 * @param torrent The torrent to describe.
 * @returns A title such as `Rocky Linux 10.2 x86_64 DVD (9.52 GiB)`.
 */
export function torrentTitle(torrent: Torrent): string {
  return `Rocky Linux ${torrent.release} ${torrent.arch} ${variantLabel(
    torrent.variant
  )} (${formatBytes(torrent.contentLength)})`;
}

/**
 * Builds the feed item description for a torrent.
 *
 * @param torrent The torrent to describe.
 * @returns A one-line summary of the torrent's contents.
 */
export function torrentDescription(torrent: Torrent): string {
  const fileCount = torrent.files.length;
  const files = `${fileCount} file${fileCount === 1 ? "" : "s"}`;

  return (
    `${torrent.name} — ${variantLabel(torrent.variant)} image for ` +
    `${torrent.arch}, ${formatBytes(torrent.contentLength)}, ${files}.`
  );
}
