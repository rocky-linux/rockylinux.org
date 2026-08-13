import { test, expect } from "@playwright/test";
import torrentData from "../data/torrents.json";

const FEED_PATH = "/torrents.xml";

test.describe("Torrent feed", () => {
  test("is served as an RSS feed", async ({ request }) => {
    const response = await request.get(FEED_PATH);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/rss+xml");
  });

  test("declares the ezRSS torrent namespace and its own feed URL", async ({
    request,
  }) => {
    const xml = await (await request.get(FEED_PATH)).text();

    expect(xml).toContain('xmlns:torrent="http://xmlns.ezrss.it/0.1/"');
    expect(xml).toContain("https://rockylinux.org/torrents.xml");
  });

  test("contains one item per published torrent", async ({ request }) => {
    const xml = await (await request.get(FEED_PATH)).text();
    const items = xml.match(/<item>/g) ?? [];

    expect(items).toHaveLength(torrentData.torrents.length);
  });

  test("every item has a BitTorrent enclosure", async ({ request }) => {
    const xml = await (await request.get(FEED_PATH)).text();
    const enclosures = [...xml.matchAll(/<enclosure([^>]*)\/>/g)].map(
      (match) => match[1]
    );

    expect(enclosures).toHaveLength(torrentData.torrents.length);

    enclosures.forEach((attributes) => {
      expect(attributes).toContain('type="application/x-bittorrent"');
      expect(attributes).toMatch(
        /url="https:\/\/dl\.rockylinux\.org\/pub\/rocky\/[^"]+\.torrent"/
      );
      expect(attributes).toMatch(/length="\d+"/);
    });
  });

  test("every item has a stable info hash GUID", async ({ request }) => {
    const xml = await (await request.get(FEED_PATH)).text();
    const guids = [
      ...xml.matchAll(/<guid isPermaLink="false">([^<]+)<\/guid>/g),
    ].map((match) => match[1]);

    expect(guids).toHaveLength(torrentData.torrents.length);
    guids.forEach((guid) => expect(guid).toMatch(/^urn:btih:[0-9a-f]{40}$/));
    expect(new Set(guids).size).toBe(guids.length);
  });

  test("exposes magnet URIs and content lengths", async ({ request }) => {
    const xml = await (await request.get(FEED_PATH)).text();
    const [first] = torrentData.torrents;

    expect(xml).toContain(
      `<torrent:infoHash>${first.infoHash}</torrent:infoHash>`
    );
    expect(xml).toContain(
      `<torrent:contentLength>${first.contentLength}</torrent:contentLength>`
    );

    const magnets = xml.match(/<torrent:magnetURI>/g) ?? [];
    expect(magnets).toHaveLength(torrentData.torrents.length);
  });
});
