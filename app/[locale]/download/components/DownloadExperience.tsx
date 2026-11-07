import { Suspense } from "react";
import { useTranslations } from "next-intl";

import DownloadWizard from "./DownloadWizard";
import { processArchitecturesData } from "@/utils/downloadDataProcessor";

import type { DownloadData } from "@/types/downloads";

interface DownloadExperienceProps {
  downloadData: DownloadData;
}

/**
 * Server-side wrapper for the download wizard: translates the labels, runs
 * the data processor, and hands the result to the client wizard.
 *
 * @param props - Component props.
 * @param props.downloadData - Raw contents of `data/downloads.json`.
 * @returns The download wizard inside a loading fallback.
 */
const DownloadExperience = ({
  downloadData,
}: Readonly<DownloadExperienceProps>) => {
  const t = useTranslations("download");

  // Pre-process translations on server side for client component
  const translations = {
    cards: {
      defaultImages: {
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
        downloadOptions: {
          qcow2: t("cards.cloudImages.downloadOptions.qcow2"),
        },
      },
      container: {
        downloadOptions: {
          fullImage: t("cards.container.downloadOptions.fullImage"),
          minimalImage: t("cards.container.downloadOptions.minimalImage"),
        },
      },
      liveImages: {
        downloadOptions: {
          // Populated dynamically based on available options
        },
      },
      rpiImages: {
        download: t("cards.rpiImages.download"),
        readMe: t("cards.rpiImages.readMe"),
      },
      wslImages: {
        download: t("cards.wslImages.download"),
        readMe: t("cards.wslImages.readMe"),
      },
      visionfive2Images: {
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
    <Suspense
      fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}
    >
      <DownloadWizard architectures={processedArchitectures} />
    </Suspense>
  );
};

export default DownloadExperience;
