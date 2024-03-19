import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultImageCard from "./components/DefaultImage/Card";
import CloudImageCard from "./components/CloudImage/Card";

export const metadata: Metadata = {
  title: "Download - Rocky Linux",
  description: "Get started and download Rocky Linux today!",
};

const DownloadPage = () => {
  const t = useTranslations("download");

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
                <TabsTrigger value="x86_64">{t("tabs.x86_64")}</TabsTrigger>
                <TabsTrigger value="aarch64">{t("tabs.aarch64")}</TabsTrigger>
                <TabsTrigger value="ppc64le">{t("tabs.ppc64le")}</TabsTrigger>
                <TabsTrigger value="s390x">{t("tabs.s390x")}</TabsTrigger>
              </TabsList>
              <TabsList className="flex justify-center gap-4 sm:hidden">
                <TabsTrigger value="x86_64">
                  {t("tabs.shortened.x86_64")}
                </TabsTrigger>
                <TabsTrigger value="aarch64">
                  {t("tabs.shortened.aarch64")}
                </TabsTrigger>
                <TabsTrigger value="ppc64le">
                  {t("tabs.shortened.ppc64le")}
                </TabsTrigger>
                <TabsTrigger value="s390x">
                  {t("tabs.shortened.s390x")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="x86_64">
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
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.3-x86_64-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.3-x86_64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.3-x86_64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.3-x86_64-dvd.torrent",
                          },
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/CHECKSUM",
                          },
                          {
                            name: `${t("cards.defaultImages.baseOs")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/BaseOS/x86_64/",
                          },
                          {
                            name: `${t("cards.defaultImages.archived")}`,
                            link: "https://dl.rockylinux.org/vault/rocky",
                          },
                        ],
                      },
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r8.versionName")}`,
                        versionId: "rocky-8",
                        currentVersion: "v8.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r8.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.9-x86_64-dvd1.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.9-x86_64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.9-x86_64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.9-x86_64-dvd1.torrent",
                          },
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/CHECKSUM",
                          },
                          {
                            name: `${t("cards.defaultImages.baseOs")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/BaseOS/x86_64/",
                          },
                          {
                            name: `${t("cards.defaultImages.archived")}`,
                            link: "https://dl.rockylinux.org/vault/rocky",
                          },
                        ],
                      },
                    ]}
                  />
                  <CloudImageCard
                    title={t("cards.cloudImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/x86_64/Rocky-9-GenericCloud-Base.latest.x86_64.qcow2",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/x86_64/CHECKSUM",
                          },
                        ],
                      },
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r8.versionName")}`,
                        versionId: "rocky-8",
                        currentVersion: "v8.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r8.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/images/x86_64/Rocky-8-GenericCloud-Base.latest.x86_64.qcow2",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/images/CHECKSUM",
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </TabsContent>
              <TabsContent value="aarch64">
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
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.3-aarch64-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.3-aarch64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.3-aarch64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.3-aarch64-dvd.torrent",
                          },
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/CHECKSUM",
                          },
                          {
                            name: `${t("cards.defaultImages.baseOs")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/BaseOS/aarch64/",
                          },
                          {
                            name: `${t("cards.defaultImages.archived")}`,
                            link: "https://dl.rockylinux.org/vault/rocky",
                          },
                        ],
                      },
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r8.versionName")}`,
                        versionId: "rocky-8",
                        currentVersion: "v8.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r8.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.9-aarch64-dvd1.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.9-aarch64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.9-aarch64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.9-aarch64-dvd1.torrent",
                          },
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/CHECKSUM",
                          },
                          {
                            name: `${t("cards.defaultImages.baseOs")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/BaseOS/aarch64/",
                          },
                          {
                            name: `${t("cards.defaultImages.archived")}`,
                            link: "https://dl.rockylinux.org/vault/rocky",
                          },
                        ],
                      },
                    ]}
                  />
                  <CloudImageCard
                    title={t("cards.cloudImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/aarch64/Rocky-9-GenericCloud-Base.latest.aarch64.qcow2",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/aarch64/CHECKSUM",
                          },
                        ],
                      },
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r8.versionName")}`,
                        versionId: "rocky-8",
                        currentVersion: "v8.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r8.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/images/aarch64/Rocky-8-GenericCloud-Base.latest.aarch64.qcow2",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/images/CHECKSUM",
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </TabsContent>
              <TabsContent value="ppc64le">
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
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.3-ppc64le-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.3-ppc64le-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.3-ppc64le-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.3-ppc64le-dvd.torrent",
                          },
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/CHECKSUM",
                          },
                          {
                            name: `${t("cards.defaultImages.baseOs")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/BaseOS/ppc64le/",
                          },
                          {
                            name: `${t("cards.defaultImages.archived")}`,
                            link: "https://dl.rockylinux.org/vault/rocky",
                          },
                        ],
                      },
                    ]}
                  />
                  <CloudImageCard
                    title={t("cards.cloudImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/ppc64le/Rocky-9-GenericCloud-Base.latest.ppc64le.qcow2",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/ppc64le/CHECKSUM",
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </TabsContent>
              <TabsContent value="s390x">
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
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.3-s390x-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.3-s390x-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.3-s390x-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.3-s390x-dvd.torrent",
                          },
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/CHECKSUM",
                          },
                          {
                            name: `${t("cards.defaultImages.baseOs")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/BaseOS/s390x/",
                          },
                          {
                            name: `${t("cards.defaultImages.archived")}`,
                            link: "https://dl.rockylinux.org/vault/rocky",
                          },
                        ],
                      },
                    ]}
                  />
                  <CloudImageCard
                    title={t("cards.cloudImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.3",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.cloudImages.downloadOptions.qcow2")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/s390x/Rocky-9-GenericCloud-Base.latest.s390x.qcow2",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/images/s390x/CHECKSUM",
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
