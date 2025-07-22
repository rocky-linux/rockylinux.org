import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultImageCard from "./DefaultImage/Card";
import CloudImageCard from "./CloudImage/Card";
import type { DownloadData, VersionItem, Version } from "@/types/downloads";

interface DownloadTabsProps {
  downloadData: DownloadData;
}

const DownloadTabs = ({ downloadData }: DownloadTabsProps) => {
  const t = useTranslations("download");

  const mapVersionToVersionItem = (version: Version): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion: version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: [
      {
        label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
        link: version.downloadOptions.defaultImages.dvd,
      },
      {
        label: `${t("cards.defaultImages.downloadOptions.boot")}`,
        link: version.downloadOptions.defaultImages.boot,
      },
      ...(version.downloadOptions.defaultImages.minimal
        ? [
            {
              label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
              link: version.downloadOptions.defaultImages.minimal as string,
            },
          ]
        : []),
    ],
    links: [
      {
        name: `${t("cards.defaultImages.torrent")}`,
        link: version.links.defaultImages.torrent,
      },
      {
        name: `${t("cards.defaultImages.checksum")}`,
        link: version.links.defaultImages.checksum,
      },
      {
        name: `${t("cards.defaultImages.baseOs")}`,
        link: version.links.defaultImages.baseOs,
      },
      {
        name: `${t("cards.defaultImages.archived")}`,
        link: version.links.defaultImages.archived,
      },
    ],
  });

  const mapVersionToCloudVersionItem = (version: Version): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion: version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: [
      {
        label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
        link: version.downloadOptions.cloudImages.qcow2,
      },
    ],
    links: [
      {
        name: `${t("cards.defaultImages.checksum")}`,
        link: version.links.cloudImages.checksum,
      },
    ],
  });

  const mapVersionToContainerVersionItem = (version: Version): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion: version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: [
      {
        label: `${t("cards.container.downloadOptions.fullImage")}`,
        link: version.downloadOptions.container.fullImage,
      },
      {
        label: `${t("cards.container.downloadOptions.minimalImage")}`,
        link: version.downloadOptions.container.minimalImage,
      },
    ],
    links: [],
  });

  const mapVersionToLiveVersionItem = (version: Version): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion: version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: version.downloadOptions.liveImages
      ? Object.entries(version.downloadOptions.liveImages).map(
          ([key, link]) => ({
            label: `${t(`cards.liveImages.downloadOptions.${key}`)}`,
            link: link as string,
          })
        )
      : [],
    links: version.links.liveImages
      ? [
          {
            name: `${t("cards.defaultImages.checksums")}`,
            link: version.links.liveImages.checksums,
          },
        ]
      : [],
  });

  const mapVersionToRpiVersionItem = (version: Version): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion:
      version.downloadOptions.rpiImages?.currentVersion ||
      version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: version.downloadOptions.rpiImages
      ? [
          {
            label: `${t("cards.rpiImages.download")}`,
            link: version.downloadOptions.rpiImages.download,
          },
        ]
      : [],
    links: version.links.rpiImages
      ? [
          {
            name: `${t("cards.defaultImages.checksum")}`,
            link: version.links.rpiImages.checksum,
          },
          {
            name: `${t("cards.rpiImages.readMe")}`,
            link: version.links.rpiImages.readMe,
          },
        ]
      : [],
  });

  const mapVersionToWslVersionItem = (version: Version): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion:
      version.downloadOptions.wslImages?.currentVersion ||
      version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: version.downloadOptions.wslImages
      ? [
          {
            label: `${t("cards.rpiImages.download")}`,
            link: version.downloadOptions.wslImages.download,
          },
        ]
      : [],
    links: version.links.wslImages
      ? [
          {
            name: `${t("cards.defaultImages.checksum")}`,
            link: version.links.wslImages.checksum,
          },
          {
            name: `${t("cards.rpiImages.readMe")}`,
            link: version.links.wslImages.readMe,
          },
        ]
      : [],
  });

  const mapVersionToVisionFive2VersionItem = (
    version: Version
  ): VersionItem => ({
    versionName: version.versionName,
    versionId: version.versionId,
    currentVersion:
      version.downloadOptions.visionfive2Images?.currentVersion ||
      version.currentVersion,
    plannedEol: version.plannedEol,
    downloadOptions: version.downloadOptions.visionfive2Images
      ? [
          {
            label: `${t("cards.visionfive2Images.download")}`,
            link: version.downloadOptions.visionfive2Images.download,
          },
        ]
      : [],
    links: version.links.visionfive2Images
      ? [
          {
            name: `${t("cards.defaultImages.checksum")}`,
            link: version.links.visionfive2Images.checksum,
          },
          ...(version.links.visionfive2Images.readMe
            ? [
                {
                  name: `${t("cards.visionfive2Images.readMe")}`,
                  link: version.links.visionfive2Images.readMe,
                },
              ]
            : []),
        ]
      : [],
  });

  return (
    <Tabs defaultValue="x86_64">
      <TabsList className="sm:flex justify-center gap-4 hidden">
        {Object.keys(downloadData.architectures).map((arch) => (
          <TabsTrigger
            key={arch}
            value={arch}
          >
            {t(`tabs.${arch}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsList className="flex justify-center gap-4 sm:hidden">
        {Object.keys(downloadData.architectures).map((arch) => (
          <TabsTrigger
            key={arch}
            value={arch}
          >
            {t(`tabs.shortened.${arch}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(downloadData.architectures).map(([arch, data]) => (
        <TabsContent
          key={arch}
          value={arch}
        >
          <div className="grid gap-6 mt-4">
            <DefaultImageCard
              title={t("cards.defaultImages.title")}
              titleTooltip={true}
              titleTooltipText={[
                {
                  text: `${t("cards.defaultImages.tooltips.dvd")}`,
                },
                {
                  text: `${t("cards.defaultImages.tooltips.boot")}`,
                },
                {
                  text: `${t("cards.defaultImages.tooltips.minimal")}`,
                },
              ]}
              titleTooltipButtonLink="https://docs.rockylinux.org/guides/installation/"
              titleTooltipButtonLabel={t(
                "cards.defaultImages.tooltips.buttonLabel"
              )}
              versions={data.versions.map(mapVersionToVersionItem)}
            />
            <CloudImageCard
              title={t("cards.cloudImages.title")}
              titleTooltip={false}
              titleTooltipButtonLink=""
              titleTooltipButtonLabel=""
              versions={data.versions.map(mapVersionToCloudVersionItem)}
            />
            <DefaultImageCard
              title={t("cards.container.title")}
              titleTooltip={false}
              titleTooltipButtonLink=""
              titleTooltipButtonLabel=""
              versions={data.versions.map(mapVersionToContainerVersionItem)}
            />
            {arch === "x86_64" || arch === "aarch64" ? (
              <DefaultImageCard
                title={t("cards.liveImages.title")}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map(mapVersionToLiveVersionItem)}
              />
            ) : null}
            {arch === "aarch64" ? (
              <DefaultImageCard
                title={t("cards.rpiImages.title")}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map(mapVersionToRpiVersionItem)}
              />
            ) : null}
            {arch === "riscv64" ? (
              <DefaultImageCard
                title={t("cards.visionfive2Images.title")}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map(mapVersionToVisionFive2VersionItem)}
              />
            ) : null}
            {arch === "x86_64" || arch === "aarch64" ? (
              <DefaultImageCard
                title={t("cards.wslImages.title")}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map(mapVersionToWslVersionItem)}
              />
            ) : null}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DownloadTabs;
