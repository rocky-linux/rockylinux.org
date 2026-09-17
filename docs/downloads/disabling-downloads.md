# Disabling Downloads and Links

Individual downloads and links in `data/downloads.json` can be hidden from the download page without deleting them, for example while an image or README is broken or not yet published.

## Format

Every URL is a plain string and is enabled by default. To disable one, replace the string with an object and set `enabled` to `false`:

```json
"downloadOptions": {
  "defaultImages": {
    "dvd": "https://download.rockylinux.org/pub/rocky/10/isos/x86_64/Rocky-10.2-x86_64-dvd1.iso",
    "boot": {
      "url": "https://download.rockylinux.org/pub/rocky/10/isos/x86_64/Rocky-10.2-x86_64-boot.iso",
      "enabled": false,
      "disabled-reason": "Boot ISO returns 404 after the 10.2 respin"
    }
  }
},
"links": {
  "rpiImages": {
    "checksum": "https://dl.rockylinux.org/pub/rocky/10/images/aarch64/Rocky-10-SBC-RaspberryPi.latest.aarch64.raw.xz.CHECKSUM",
    "readMe": {
      "url": "https://dl.rockylinux.org/pub/sig/10/altarch/aarch64/images/README.txt",
      "enabled": false,
      "disabled-reason": "README returns 404 while the image itself still works"
    }
  }
}
```

Only add `enabled` when it is `false`. To re-enable a URL, change it back to a plain string.

`disabled-reason` is optional. It is a note for anyone (or any AI) reading the file on why the URL is disabled, since JSON has no comments. The site and the URL checker ignore it.

The flag applies to every URL field:

- **Downloads** under `downloadOptions.<group>`: `defaultImages`, `cloudImages`, `container`, `liveImages`, and the `download` field of `rpiImages`, `wslImages` and `visionfive2Images`
- **Links** under `links.<group>`: `torrent`, `checksum`, `checksums`, `baseOs`, `archived`, `readMe`
- **`specializedDevices`** fields: `download`, `checksum`, `readMe`. These aren't shown on the site, but the URL checker checks them. If the same URL also appears in a download or link, disable it in both places.

It does not apply to non-URL fields such as `currentVersion` or `name`.

## What gets hidden

Filtering cascades upward, so there is no need to disable parents by hand. Only downloads drive the cascade; disabling links never hides a group.

| When…                                                   | …this is hidden                                              |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| A link is disabled                                      | That link only                                               |
| A download is disabled                                  | Its button                                                   |
| Every download in a group is disabled                   | The group, including its links (torrent, CHECKSUM, README …) |
| A version has no enabled downloads for a card           | That version's tab in that card only                         |
| A card has no versions left                             | The card (the Cloud Images card always stays for providers)  |
| An architecture has no enabled downloads in any version | The architecture tab and mobile dropdown option              |

Filtering happens in `processArchitecturesData` (`utils/downloadDataProcessor.ts`) and `versionsFor` (`app/[locale]/download/components/TabsClient.tsx`).

## URL checker

`scripts/check-download-urls.js` (`npm run check:downloads`, and the `Check Download URLs` workflow) skips disabled URLs, plus the links of any group whose downloads are all disabled. The skipped count is printed next to the URL count, split into disabled URLs and hidden links, e.g. `3 skipped [1 disabled, 2 hidden links]`. A link that is disabled and also in a hidden group counts as disabled. Its `extractDownloadUrls` function mirrors the site's rules, so keep the two in sync.

---

_Last updated: 2026-09-17_
