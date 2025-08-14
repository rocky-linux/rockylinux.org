import { useTranslations } from "next-intl";

import TabsClient from "./TabsClient";

import type { DownloadData } from "@/types/downloads";

interface DownloadTabsProps {
  downloadData: DownloadData;
}

const DownloadTabs = ({ downloadData }: DownloadTabsProps) => {
  const t = useTranslations("download");

  // Pre-process translations on server side for client component
  const translations = {
    tabs: Object.fromEntries(
      Object.keys(downloadData.architectures).map((arch) => [
        arch,
        t(`tabs.${arch}`),
      ])
    ),
    tabsShortened: Object.fromEntries(
      Object.keys(downloadData.architectures).map((arch) => [
        arch,
        t(`tabs.shortened.${arch}`),
      ])
    ),
    cards: {
      defaultImages: {
        title: t("cards.defaultImages.title"),
        tooltips: {
          dvd: t("cards.defaultImages.tooltips.dvd"),
          boot: t("cards.defaultImages.tooltips.boot"),
          minimal: t("cards.defaultImages.tooltips.minimal"),
          buttonLabel: t("cards.defaultImages.tooltips.buttonLabel"),
        },
        downloadOptions: {
          dvd: t("cards.defaultImages.downloadOptions.dvd"),
          boot: t("cards.defaultImages.downloadOptions.boot"),
          minimal: t("cards.defaultImages.downloadOptions.minimal"),
        },
        torrent: t("cards.defaultImages.torrent"),
        checksum: t("cards.defaultImages.checksum"),
        baseOs: t("cards.defaultImages.baseOs"),
        archived: t("cards.defaultImages.archived"),
        checksums: t("cards.defaultImages.checksums"),
      },
      cloudImages: {
        title: t("cards.cloudImages.title"),
        downloadOptions: {
          qcow2: t("cards.cloudImages.downloadOptions.qcow2"),
        },
      },
      container: {
        title: t("cards.container.title"),
        downloadOptions: {
          fullImage: t("cards.container.downloadOptions.fullImage"),
          minimalImage: t("cards.container.downloadOptions.minimalImage"),
        },
      },
      liveImages: {
        title: t("cards.liveImages.title"),
        downloadOptions: {
          // This will be populated dynamically based on available options
        },
      },
      rpiImages: {
        title: t("cards.rpiImages.title"),
        download: t("cards.rpiImages.download"),
        readMe: t("cards.rpiImages.readMe"),
      },
      wslImages: {
        title: t("cards.wslImages.title"),
      },
      visionfive2Images: {
        title: t("cards.visionfive2Images.title"),
        download: t("cards.visionfive2Images.download"),
        readMe: t("cards.visionfive2Images.readMe"),
      },
    },
  };

  // Transform raw data into client-ready format
  const processedArchitectures = Object.fromEntries(
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
                    label: t(`cards.liveImages.downloadOptions.${key}`),
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
                    label: translations.cards.rpiImages.download,
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
                    name: translations.cards.rpiImages.readMe,
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

  return (
    <TabsClient
      architectures={processedArchitectures}
      translations={translations}
    />
  );
};

export default DownloadTabs;
