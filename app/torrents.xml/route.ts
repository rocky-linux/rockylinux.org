import RSS from "rss";
import {
  getTorrentDataInfo,
  getTorrents,
  torrentDescription,
  torrentTitle,
} from "@/lib/torrents";

/**
 * The torrent list is a committed data file, so the feed can be prerendered at
 * build time rather than regenerated per request.
 */
export const dynamic = "force-static";

const SITE_URL = "https://rockylinux.org";

export async function GET() {
  const { source } = getTorrentDataInfo();
  const torrents = getTorrents();

  const feed = new RSS({
    title: "Rocky Linux Torrents",
    description:
      "All currently supported Rocky Linux release torrents. " +
      "Subscribe in a BitTorrent client to automatically seed new releases.",
    site_url: `${SITE_URL}/download`,
    feed_url: `${SITE_URL}/torrents.xml`,
    copyright: `${new Date().getFullYear()} Rocky Enterprise Software Foundation`,
    language: "en",
    ttl: 60,
    custom_namespaces: {
      torrent: "http://xmlns.ezrss.it/0.1/",
    },
    custom_elements: [{ "atom:link": { _attr: { href: source, rel: "via" } } }],
  });

  torrents.forEach((torrent) => {
    feed.item({
      title: torrentTitle(torrent),
      description: torrentDescription(torrent),
      url: torrent.torrentUrl,
      // A hash-based GUID keeps items stable across regenerations, so clients
      // never re-download a torrent they already have.
      guid: `urn:btih:${torrent.infoHash}`,
      date: new Date(torrent.createdAt ?? torrent.lastModified ?? Date.now()),
      enclosure: {
        url: torrent.torrentUrl,
        size: torrent.torrentSize,
        type: "application/x-bittorrent",
      },
      custom_elements: [
        { "torrent:infoHash": torrent.infoHash },
        { "torrent:contentLength": torrent.contentLength },
        { "torrent:magnetURI": torrent.magnet },
        { "torrent:fileName": torrent.torrentUrl.split("/").pop() },
      ],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
