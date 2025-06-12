import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultImageCard from "./components/DefaultImage/Card";
import CloudImageCard from "./components/CloudImage/Card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import downloadData from "@/data/downloads.json";
import type { DownloadData, VersionItem, Version } from "@/types/downloads";

export const metadata: Metadata = {
  title: "Download - Rocky Linux",
  description: "Get started and download Rocky Linux today!",
};

const DownloadPage = () => {
  const t = useTranslations("download");
  const typedDownloadData = downloadData as DownloadData;

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
    currentVersion: version.currentVersion,
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
    currentVersion: version.currentVersion,
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

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg leading-8">{t("description")}</p>
          </div>
          <div className="mx-auto mt-10 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
            <Tabs defaultValue="x86_64">
              <TabsList className="sm:flex justify-center gap-4 hidden">
                {Object.keys(typedDownloadData.architectures).map((arch) => (
                  <TabsTrigger
                    key={arch}
                    value={arch}
                  >
                    {t(`tabs.${arch}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="flex justify-center gap-4 sm:hidden">
                {Object.keys(typedDownloadData.architectures).map((arch) => (
                  <TabsTrigger
                    key={arch}
                    value={arch}
                  >
                    {t(`tabs.shortened.${arch}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(typedDownloadData.architectures).map(
                ([arch, data]) => (
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
                        versions={data.versions.map(
                          mapVersionToCloudVersionItem
                        )}
                      />
                      <DefaultImageCard
                        title={t("cards.container.title")}
                        titleTooltip={false}
                        titleTooltipButtonLink=""
                        titleTooltipButtonLabel=""
                        versions={data.versions.map(
                          mapVersionToContainerVersionItem
                        )}
                      />
                      {arch === "x86_64" || arch === "aarch64" ? (
                        <DefaultImageCard
                          title={t("cards.liveImages.title")}
                          titleTooltip={false}
                          titleTooltipButtonLink=""
                          titleTooltipButtonLabel=""
                          versions={data.versions.map(
                            mapVersionToLiveVersionItem
                          )}
                        />
                      ) : null}
                      {arch === "aarch64" ? (
                        <DefaultImageCard
                          title={t("cards.rpiImages.title")}
                          titleTooltip={false}
                          titleTooltipButtonLink=""
                          titleTooltipButtonLabel=""
                          versions={data.versions.map(
                            mapVersionToRpiVersionItem
                          )}
                        />
                      ) : null}
                      {arch === "x86_64" || arch === "aarch64" ? (
                        <DefaultImageCard
                          title={t("cards.wslImages.title")}
                          titleTooltip={false}
                          titleTooltipButtonLink=""
                          titleTooltipButtonLabel=""
                          versions={data.versions.map(
                            mapVersionToWslVersionItem
                          )}
                        />
                      ) : null}
                    </div>
                  </TabsContent>
                )
              )}
            </Tabs>
          </div>
          <hr className="my-8" />
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight sm:text-2xl">
              {t("getInvolved.title")}
            </h1>
            <p className="mt-2 text-base">{t("getInvolved.text")}</p>
          </div>
          <hr className="my-8" />
          <div className="mt-6">
            <h1 className="text-lg font-bold font-display tracking-tight sm:text-xl">
              {t("exportCompliance.title")}
            </h1>
            <p className="mt-2 text-sm">{t("exportCompliance.text1")}</p>
            <p className="mt-1 text-sm">{t("exportCompliance.text2")}</p>
            <p className="mt-1 text-sm">{t("exportCompliance.narrative")}</p>
            <Table className="mt-12">
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">
                    {t("exportCompliance.product_title")}
                  </TableCell>
                  <TableCell>{t("exportCompliance.product_text")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">
                    {t("exportCompliance.eccn_title")}
                  </TableCell>
                  <TableCell>{t("exportCompliance.eccn_text")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">
                    {t("exportCompliance.exception_title")}
                  </TableCell>
                  <TableCell>{t("exportCompliance.exception_text")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">
                    {t("exportCompliance.ccats_title")}
                  </TableCell>
                  <TableCell>{t("exportCompliance.ccats_text")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">
                    {t("exportCompliance.ern_title")}
                  </TableCell>
                  <TableCell>{t("exportCompliance.ern_text")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
