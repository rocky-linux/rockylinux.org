import type { DownloadData, UrlEntry } from "@/types/downloads";

// Type for processed version data
interface ProcessedVersion {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  defaultImages: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
  cloudImages: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
  containerImages: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
  liveImages: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
  rpiImages: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
  wslImages: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
  visionFive2Images: {
    downloadOptions: { label: string; link: string }[];
    links: { name: string; link: string }[];
  };
}

// Type for processed architectures data
type ProcessedArchitectures = Record<string, { versions: ProcessedVersion[] }>;

// Type for the translations object
interface DownloadTranslations {
  tabs: Record<string, string>;
  tabsShortened: Record<string, string>;
  cards: {
    defaultImages: {
      title: string;
      tooltips: {
        dvd: string;
        boot: string;
        minimal: string;
        buttonLabel: string;
      };
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
      title: string;
      downloadOptions: {
        qcow2: string;
      };
    };
    container: {
      title: string;
      downloadOptions: {
        fullImage: string;
        minimalImage: string;
      };
    };
    liveImages: {
      title: string;
      downloadOptions: Record<string, string>;
    };
    rpiImages: {
      title: string;
      download: string;
      readMe: string;
    };
    wslImages: {
      title: string;
      download: string;
      readMe: string;
    };
    visionfive2Images: {
      title: string;
      download: string;
      readMe: string;
    };
  };
}

type DownloadOptionItem = { label: string; link: string };
type LinkItem = { name: string; link: string };

/**
 * Returns the URL of a download or link entry, or `undefined` when the entry
 * is missing or marked `enabled: false`. URLs are enabled by default.
 *
 * Keep in sync with `extractDownloadUrls` in `scripts/check-download-urls.js`.
 */
export function resolveUrl(entry?: UrlEntry): string | undefined {
  if (entry === undefined) return undefined;
  if (typeof entry === "string") return entry;
  return entry.enabled === false ? undefined : entry.url;
}

// Builds download buttons, skipping missing and disabled entries
function buildOptions(
  pairs: [label: string, entry: UrlEntry | undefined][]
): DownloadOptionItem[] {
  return pairs.flatMap(([label, entry]) => {
    const link = resolveUrl(entry);
    return link ? [{ label, link }] : [];
  });
}

// Builds a group's links, skipping missing and disabled entries
function buildLinks(
  pairs: [name: string, entry: UrlEntry | undefined][]
): LinkItem[] {
  return pairs.flatMap(([name, entry]) => {
    const link = resolveUrl(entry);
    return link ? [{ name, link }] : [];
  });
}

// A group's links are only shown while it has at least one enabled download
function buildGroup(
  downloadOptions: DownloadOptionItem[],
  getLinks: () => LinkItem[]
): { downloadOptions: DownloadOptionItem[]; links: LinkItem[] } {
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
                translations.cards.defaultImages.downloadOptions.dvd,
                options.defaultImages.dvd,
              ],
              [
                translations.cards.defaultImages.downloadOptions.boot,
                options.defaultImages.boot,
              ],
              [
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
                translations.cards.container.downloadOptions.fullImage,
                options.container.fullImage,
              ],
              [
                translations.cards.container.downloadOptions.minimalImage,
                options.container.minimalImage,
              ],
            ]),
            () => []
          );

          const liveImages = buildGroup(
            buildOptions(
              Object.entries(options.liveImages ?? {}).map(([key, entry]) => [
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
