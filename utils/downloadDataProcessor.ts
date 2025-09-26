import type { DownloadData } from "@/types/downloads";

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

// Module-level cache for processed architectures
const processedArchitecturesCache = new Map<string, ProcessedArchitectures>();

// Helper function to process architectures with caching
export function processArchitecturesData(
  downloadData: DownloadData,
  translations: DownloadTranslations
): ProcessedArchitectures {
  const cacheKey = JSON.stringify({
    architectures: Object.keys(downloadData.architectures),
    translationsKeys: Object.keys(translations.cards),
  });

  if (processedArchitecturesCache.has(cacheKey)) {
    return processedArchitecturesCache.get(cacheKey)!;
  }

  const processedData = Object.fromEntries(
    Object.entries(downloadData.architectures).map(([arch, data]) => [
      arch,
      {
        versions: data.versions.map((version) => {
          // Create a combined version with all the different mappings
          const baseVersion = {
            versionName: version.versionName,
            versionId: version.versionId,
            currentVersion: version.currentVersion,
            plannedEol: version.plannedEol,
          };

          const defaultImages = {
            downloadOptions: [
              {
                label: translations.cards.defaultImages.downloadOptions.dvd,
                link: version.downloadOptions.defaultImages.dvd,
              },
              {
                label: translations.cards.defaultImages.downloadOptions.boot,
                link: version.downloadOptions.defaultImages.boot,
              },
              ...(version.downloadOptions.defaultImages.minimal
                ? [
                    {
                      label:
                        translations.cards.defaultImages.downloadOptions
                          .minimal,
                      link: version.downloadOptions.defaultImages
                        .minimal as string,
                    },
                  ]
                : []),
            ],
            links: [
              {
                name: translations.cards.defaultImages.torrent,
                link: version.links.defaultImages.torrent,
              },
              {
                name: translations.cards.defaultImages.checksum,
                link: version.links.defaultImages.checksum,
              },
              {
                name: translations.cards.defaultImages.baseOs,
                link: version.links.defaultImages.baseOs,
              },
              {
                name: translations.cards.defaultImages.archived,
                link: version.links.defaultImages.archived,
              },
            ],
          };

          const cloudImages = {
            downloadOptions:
              version.downloadOptions.cloudImages && version.links.cloudImages
                ? [
                    {
                      label:
                        translations.cards.cloudImages.downloadOptions.qcow2,
                      link: version.downloadOptions.cloudImages.qcow2,
                    },
                  ]
                : [],
            links:
              version.downloadOptions.cloudImages && version.links.cloudImages
                ? [
                    {
                      name: translations.cards.defaultImages.checksum,
                      link: version.links.cloudImages.checksum,
                    },
                  ]
                : [],
          };

          const containerImages = {
            downloadOptions: [
              {
                label: translations.cards.container.downloadOptions.fullImage,
                link: version.downloadOptions.container.fullImage,
              },
              {
                label:
                  translations.cards.container.downloadOptions.minimalImage,
                link: version.downloadOptions.container.minimalImage,
              },
            ],
            links: [],
          };

          const liveImages = {
            downloadOptions: version.downloadOptions.liveImages
              ? Object.entries(version.downloadOptions.liveImages).map(
                  ([key, link]) => ({
                    label:
                      translations.cards.liveImages.downloadOptions[key] ||
                      `Live Image (${key.toUpperCase()})`,
                    link: link as string,
                  })
                )
              : [],
            links: version.links.liveImages
              ? [
                  {
                    name: translations.cards.defaultImages.checksums,
                    link: version.links.liveImages.checksums,
                  },
                ]
              : [],
          };

          const rpiImages = {
            downloadOptions: version.downloadOptions.rpiImages
              ? [
                  {
                    label: translations.cards.rpiImages.download,
                    link: version.downloadOptions.rpiImages.download,
                  },
                ]
              : [],
            links: version.links.rpiImages
              ? [
                  {
                    name: translations.cards.defaultImages.checksum,
                    link: version.links.rpiImages.checksum,
                  },
                  {
                    name: translations.cards.rpiImages.readMe,
                    link: version.links.rpiImages.readMe,
                  },
                ]
              : [],
          };

          const wslImages = {
            downloadOptions: version.downloadOptions.wslImages
              ? [
                  {
                    label: translations.cards.wslImages.download,
                    link: version.downloadOptions.wslImages.download,
                  },
                ]
              : [],
            links: version.links.wslImages
              ? [
                  {
                    name: translations.cards.defaultImages.checksum,
                    link: version.links.wslImages.checksum,
                  },
                  {
                    name: translations.cards.wslImages.readMe,
                    link: version.links.wslImages.readMe,
                  },
                ]
              : [],
          };

          const visionFive2Images = {
            downloadOptions: version.downloadOptions.visionfive2Images
              ? [
                  {
                    label: translations.cards.visionfive2Images.download,
                    link: version.downloadOptions.visionfive2Images.download,
                  },
                ]
              : [],
            links: version.links.visionfive2Images
              ? [
                  {
                    name: translations.cards.defaultImages.checksum,
                    link: version.links.visionfive2Images.checksum,
                  },
                  ...(version.links.visionfive2Images.readMe
                    ? [
                        {
                          name: translations.cards.visionfive2Images.readMe,
                          link: version.links.visionfive2Images.readMe,
                        },
                      ]
                    : []),
                ]
              : [],
          };

          return {
            ...baseVersion,
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
    ])
  );

  processedArchitecturesCache.set(cacheKey, processedData);
  return processedData;
}
