"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultImageCard from "./components/DefaultImage/Card";
import CloudImageCard from "./components/CloudImage/Card";

const DownloadContent = () => {
  const t = useTranslations("download");

  return (
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
                    { text: `${t("cards.defaultImages.tooltips.dvd")}` },
                    { text: `${t("cards.defaultImages.tooltips.boot")}` },
                    { text: `${t("cards.defaultImages.tooltips.minimal")}` },
                  ]}
                  titleTooltipButtonLink="https://docs.rockylinux.org/guides/installation/"
                  titleTooltipButtonLabel={t(
                    "cards.defaultImages.tooltips.buttonLabel"
                  )}
                  versions={[
                    {
                      versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                      versionId: "rocky-9",
                      currentVersion: "v9.5",
                      plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                      downloadOptions: [
                        {
                          label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                          link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.5-x86_64-dvd.iso",
                        },
                        {
                          label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                          link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.5-x86_64-boot.iso",
                        },
                        {
                          label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                          link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.5-x86_64-minimal.iso",
                        },
                      ],
                      links: [
                        {
                          name: `${t("cards.defaultImages.torrent")}`,
                          link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.5-x86_64-dvd.torrent",
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
                      currentVersion: "v8.10",
                      plannedEol: `${t("cards.defaultImages.x86_64.r8.plannedEol")}`,
                      downloadOptions: [
                        {
                          label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                          link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.10-x86_64-dvd1.iso",
                        },
                        {
                          label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                          link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.10-x86_64-boot.iso",
                        },
                        {
                          label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                          link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.10-x86_64-minimal.iso",
                        },
                      ],
                      links: [
                        {
                          name: `${t("cards.defaultImages.torrent")}`,
                          link: "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.10-x86_64-dvd1.torrent",
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
                      currentVersion: "v9.5",
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
                  ]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DownloadContent;
