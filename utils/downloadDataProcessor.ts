import type {
  DownloadData,
  ProcessedArchitectures,
  ProcessedGroup,
  ProcessedLink,
  ProcessedOption,
  ProcessedVersion,
  UrlEntry,
} from "@/types/downloads";

// Type for the translations object
interface DownloadTranslations {
  cards: {
    defaultImages: {
      downloadOptions: {
        dvd: string;
        boot: string;
        minimal: string;
      };
      torrent: string;
      checksum: string;
      baseOs: string;
      archived: string;
      checksums: string;
    };
    cloudImages: {
      downloadOptions: {
        qcow2: string;
      };
    };
    container: {
      downloadOptions: {
        fullImage: string;
        minimalImage: string;
      };
    };
    liveImages: {
      downloadOptions: Record<string, string>;
    };
    rpiImages: {
      download: string;
      readMe: string;
    };
    wslImages: {
      download: string;
      readMe: string;
    };
    visionfive2Images: {
      download: string;
      readMe: string;
    };
  };
}

/**
 * Returns the URL of a download or link entry, or `undefined` when the entry
 * is missing or marked `enabled: false`. URLs are enabled by default.
 *
 * Keep in sync with `extractDownloadUrls` in `scripts/check-download-urls.js`.
 *
 * @param entry - A download or link entry from downloads.json.
 * @returns The URL, or undefined when the entry is missing or disabled.
 */
export function resolveUrl(entry?: UrlEntry): string | undefined {
  if (entry === undefined) return undefined;
  if (typeof entry === "string") return entry;
  return entry.enabled === false ? undefined : entry.url;
}

// Builds download buttons, skipping missing and disabled entries
function buildOptions(
  triples: [id: string, label: string, entry: UrlEntry | undefined][]
): ProcessedOption[] {
  return triples.flatMap(([id, label, entry]) => {
    const link = resolveUrl(entry);
    return link ? [{ id, label, link }] : [];
  });
}

// Builds a group's links, skipping missing and disabled entries
function buildLinks(
  pairs: [name: string, entry: UrlEntry | undefined][]
): ProcessedLink[] {
  return pairs.flatMap(([name, entry]) => {
    const link = resolveUrl(entry);
    return link ? [{ name, link }] : [];
  });
}

// A group's links are only shown while it has at least one enabled download
function buildGroup(
  downloadOptions: ProcessedOption[],
  getLinks: () => ProcessedLink[]
): ProcessedGroup {
  return {
    downloadOptions,
    links: downloadOptions.length > 0 ? getLinks() : [],
  };
}

const GROUP_KEYS = [
  "defaultImages",
  "cloudImages",
  "containerImages",
  "liveImages",
  "rpiImages",
  "wslImages",
  "visionFive2Images",
] as const;

/**
 * Turns the raw downloads.json data into what the page renders: translated
 * labels, stable option ids, and no disabled downloads, empty groups or
 * architectures with nothing enabled.
 *
 * @param downloadData - Raw contents of downloads.json.
 * @param translations - Translated labels for the download options and links.
 * @returns Processed versions per architecture.
 */
export function processArchitecturesData(
  downloadData: DownloadData,
  translations: DownloadTranslations
): ProcessedArchitectures {
  const processed = Object.entries(downloadData.architectures).map(
    ([arch, data]): [string, { versions: ProcessedVersion[] }] => [
      arch,
      {
        versions: data.versions.map((version) => {
          const options = version.downloadOptions;
          const links = version.links;

          const defaultImages = buildGroup(
            buildOptions([
              [
                "dvd",
                translations.cards.defaultImages.downloadOptions.dvd,
                options.defaultImages.dvd,
              ],
              [
                "boot",
                translations.cards.defaultImages.downloadOptions.boot,
                options.defaultImages.boot,
              ],
              [
                "minimal",
                translations.cards.defaultImages.downloadOptions.minimal,
                options.defaultImages.minimal,
              ],
            ]),
            () =>
              buildLinks([
                [
                  translations.cards.defaultImages.torrent,
                  links.defaultImages.torrent,
                ],
                [
                  translations.cards.defaultImages.checksum,
                  links.defaultImages.checksum,
                ],
                [
                  translations.cards.defaultImages.baseOs,
                  links.defaultImages.baseOs,
                ],
                [
                  translations.cards.defaultImages.archived,
                  links.defaultImages.archived,
                ],
              ])
          );

          // Cloud images are only listed when the checksum link also exists
          const cloudImages = buildGroup(
            links.cloudImages
              ? buildOptions([
                  [
                    "qcow2",
                    translations.cards.cloudImages.downloadOptions.qcow2,
                    options.cloudImages?.qcow2,
                  ],
                ])
              : [],
            () =>
              buildLinks([
                [
                  translations.cards.defaultImages.checksum,
                  links.cloudImages?.checksum,
                ],
              ])
          );

          const containerImages = buildGroup(
            buildOptions([
              [
                "fullImage",
                translations.cards.container.downloadOptions.fullImage,
                options.container.fullImage,
              ],
              [
                "minimalImage",
                translations.cards.container.downloadOptions.minimalImage,
                options.container.minimalImage,
              ],
            ]),
            () => []
          );

          const liveImages = buildGroup(
            buildOptions(
              Object.entries(options.liveImages ?? {}).map(([key, entry]) => [
                key,
                translations.cards.liveImages.downloadOptions[key] ||
                  `Live Image (${key.toUpperCase()})`,
                entry,
              ])
            ),
            () =>
              buildLinks([
                [
                  translations.cards.defaultImages.checksums,
                  links.liveImages?.checksums,
                ],
              ])
          );

          const rpiImages = buildGroup(
            buildOptions([
              [
                "download",
                translations.cards.rpiImages.download,
                options.rpiImages?.download,
              ],
            ]),
            () =>
              buildLinks([
                [
                  translations.cards.defaultImages.checksum,
                  links.rpiImages?.checksum,
                ],
                [translations.cards.rpiImages.readMe, links.rpiImages?.readMe],
              ])
          );

          const wslImages = buildGroup(
            buildOptions([
              [
                "download",
                translations.cards.wslImages.download,
                options.wslImages?.download,
              ],
            ]),
            () =>
              buildLinks([
                [
                  translations.cards.defaultImages.checksum,
                  links.wslImages?.checksum,
                ],
                [translations.cards.wslImages.readMe, links.wslImages?.readMe],
              ])
          );

          const visionFive2Images = buildGroup(
            buildOptions([
              [
                "download",
                translations.cards.visionfive2Images.download,
                options.visionfive2Images?.download,
              ],
            ]),
            () =>
              buildLinks([
                [
                  translations.cards.defaultImages.checksum,
                  links.visionfive2Images?.checksum,
                ],
                [
                  translations.cards.visionfive2Images.readMe,
                  links.visionfive2Images?.readMe,
                ],
              ])
          );

          return {
            versionName: version.versionName,
            versionId: version.versionId,
            currentVersion: version.currentVersion,
            plannedEol: version.plannedEol,
            defaultImages,
            cloudImages,
            containerImages,
            liveImages,
            rpiImages,
            wslImages,
            visionFive2Images,
          };
        }),
      },
    ]
  );

  // Drop architectures that have no enabled downloads left at all
  return Object.fromEntries(
    processed.filter(([, { versions }]) =>
      versions.some((version) =>
        GROUP_KEYS.some((key) => version[key].downloadOptions.length > 0)
      )
    )
  );
}
