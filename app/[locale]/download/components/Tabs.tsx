import { useTranslations } from "next-intl";

import TabsClient from "./TabsClient";
import { processArchitecturesData } from "@/utils/downloadDataProcessor";

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
        download: t("cards.wslImages.download"),
        readMe: t("cards.wslImages.readMe"),
      },
      visionfive2Images: {
        title: t("cards.visionfive2Images.title"),
        download: t("cards.visionfive2Images.download"),
        readMe: t("cards.visionfive2Images.readMe"),
      },
    },
  };

  // Transform raw data into client-ready format using cached utility
  const processedArchitectures = processArchitecturesData(
    downloadData,
    translations
  );

  return (
    <TabsClient
      architectures={processedArchitectures}
      translations={translations}
    />
  );
};

export default DownloadTabs;
