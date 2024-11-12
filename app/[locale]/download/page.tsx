import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DefaultImageCard from "./components/DefaultImage/Card";
import CloudImageCard from "./components/CloudImage/Card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/x86_64/Rocky-9.4-x86_64-dvd.torrent",
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
                        currentVersion: "v9.4",
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
                        currentVersion: "v8.10",
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
                  <DefaultImageCard
                    title={t("cards.container.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.container.downloadOptions.fullImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9/images/sha256-45cc42828cc5ceeffa3a9b4f6363fb582fac3ab91f77bf403daa067f8f049f96?context=explore",
                          },
                          {
                            label: `${t("cards.container.downloadOptions.minimalImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9-minimal/images/sha256-2cf09800dfe5f0b55fd8960675ce9345ff325827f9977a7e9e01348da50d2a22?context=explore",
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
                            label: `${t("cards.container.downloadOptions.fullImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/8/images/sha256-69cecc7163282ad83e27b739fe8473b7c56e280e83827dcda60e5d37102457f1?context=explore",
                          },
                          {
                            label: `${t("cards.container.downloadOptions.minimalImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/8-minimal/images/sha256-87784fa4b10033267a335350072288daa1197145315ce29a6996fa5f148d095a?context=explore",
                          },
                        ],
                      },
                    ]}
                  />
                  <DefaultImageCard
                    title={t("cards.liveImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.liveImages.downloadOptions.gnome")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/Rocky-9-Workstation-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.gnomeLite")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/Rocky-9-Workstation-Lite-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.kde")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/Rocky-9-KDE-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.xfce")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/Rocky-9-XFCE-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.mate")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/Rocky-9-MATE-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.cinnamon")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/Rocky-9-Cinnamon-x86_64-latest.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksums")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/x86_64/",
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
                            label: `${t("cards.liveImages.downloadOptions.gnome")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/Live/x86_64/Rocky-8-Workstation-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.gnomeLite")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/Live/x86_64/Rocky-8-Workstation-Lite-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.xfce")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/Live/x86_64/Rocky-8-XFCE-x86_64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.mate")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/Live/x86_64/Rocky-8-MATE-x86_64-latest.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksums")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/8/live/x86_64/",
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
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.4-aarch64-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.4-aarch64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.4-aarch64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/aarch64/Rocky-9.4-aarch64-dvd.torrent",
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
                        currentVersion: "v8.10",
                        plannedEol: `${t("cards.defaultImages.x86_64.r8.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.10-aarch64-dvd1.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.10-aarch64-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.10-aarch64-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/8/isos/aarch64/Rocky-8.10-aarch64-dvd1.torrent",
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
                        currentVersion: "v9.4",
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
                        currentVersion: "v8.10",
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
                  <DefaultImageCard
                    title={t("cards.container.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.container.downloadOptions.fullImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9/images/sha256-ae32ae7f54215074bd0400dd82a4d543f8bc7d7d4b205563aa50f638dd20b335?context=explore",
                          },
                          {
                            label: `${t("cards.container.downloadOptions.minimalImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9-minimal/images/sha256-f28cf6f0ad919341be4c41ee31f3a27851bc82a47b1430aa4ba263d992ff8f03?context=explore",
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
                            label: `${t("cards.container.downloadOptions.fullImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/8/images/sha256-be879ad24fd5387ed135b99ebf0622c323afab20ff7f1967d6f06e5dbf07ee31?context=explore",
                          },
                          {
                            label: `${t("cards.container.downloadOptions.minimalImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/8-minimal/images/sha256-46c797fad395827bf7d861a3c1c5b87c4e737ea1b6df13da58ee7a3478065bc5?context=explore",
                          },
                        ],
                      },
                    ]}
                  />
                  <DefaultImageCard
                    title={t("cards.liveImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.liveImages.downloadOptions.gnome")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/Rocky-9-Workstation-aarch64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.gnomeLite")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/Rocky-9-Workstation-Lite-aarch64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.kde")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/Rocky-9-KDE-aarch64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.xfce")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/Rocky-9-XFCE-aarch64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.mate")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/Rocky-9-MATE-aarch64-latest.iso",
                          },
                          {
                            label: `${t("cards.liveImages.downloadOptions.cinnamon")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/Rocky-9-Cinnamon-aarch64-latest.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksums")}`,
                            link: "https://dl.rockylinux.org/pub/rocky/9/live/aarch64/",
                          },
                        ],
                      },
                    ]}
                  />
                  <DefaultImageCard
                    title={t("cards.rpiImages.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.rpiImages.download")}`,
                            link: "https://dl.rockylinux.org/pub/sig/9/altarch/aarch64/images/RockyLinuxRpi_9-latest.img.xz",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/sig/9/altarch/aarch64/images/RockyLinuxRpi_9-latest.img.xz.sha256sum",
                          },
                          {
                            name: `${t("cards.rpiImages.readMe")}`,
                            link: "https://dl.rockylinux.org/pub/sig/9/altarch/aarch64/images/README.txt",
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
                            label: `${t("cards.rpiImages.download")}`,
                            link: "https://dl.rockylinux.org/pub/sig/8/altarch/aarch64/images/RockyLinuxRpi_8-latest.img.xz",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.checksum")}`,
                            link: "https://dl.rockylinux.org/pub/sig/8/altarch/aarch64/images/RockyLinuxRpi_8-latest.img.xz.sha256sum",
                          },
                          {
                            name: `${t("cards.rpiImages.readMe")}`,
                            link: "https://dl.rockylinux.org/pub/sig/8/altarch/aarch64/images/README.txt",
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
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.4-ppc64le-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.4-ppc64le-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.4-ppc64le-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/ppc64le/Rocky-9.4-ppc64le-dvd.torrent",
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
                        currentVersion: "v9.4",
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
                  <DefaultImageCard
                    title={t("cards.container.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.container.downloadOptions.fullImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9/images/sha256-200abd84e3fdd2b9b691f5ac4630dbb21837a4f7e0edf4424b7a08d81be3805c?context=explore",
                          },
                          {
                            label: `${t("cards.container.downloadOptions.minimalImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9-minimal/images/sha256-e64e70d4fe1d619b45f1dff7948d8c4cb7840ddce3015cd64890f3ea70a475bd?context=explore",
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
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.defaultImages.downloadOptions.dvd")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.4-s390x-dvd.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.boot")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.4-s390x-boot.iso",
                          },
                          {
                            label: `${t("cards.defaultImages.downloadOptions.minimal")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.4-s390x-minimal.iso",
                          },
                        ],
                        links: [
                          {
                            name: `${t("cards.defaultImages.torrent")}`,
                            link: "https://download.rockylinux.org/pub/rocky/9/isos/s390x/Rocky-9.4-s390x-dvd.torrent",
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
                        currentVersion: "v9.4",
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
                  <DefaultImageCard
                    title={t("cards.container.title")}
                    titleTooltip={false}
                    titleTooltipButtonLink=""
                    titleTooltipButtonLabel=""
                    versions={[
                      {
                        versionName: `${t("cards.defaultImages.x86_64.r9.versionName")}`,
                        versionId: "rocky-9",
                        currentVersion: "v9.4",
                        plannedEol: `${t("cards.defaultImages.x86_64.r9.plannedEol")}`,
                        downloadOptions: [
                          {
                            label: `${t("cards.container.downloadOptions.fullImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9/images/sha256-e4e211cc4ed838ab9842b9243e0e969defcd83e07c52e2f6cded0e9438a3fecd?context=explore",
                          },
                          {
                            label: `${t("cards.container.downloadOptions.minimalImage")}`,
                            link: "https://hub.docker.com/layers/library/rockylinux/9-minimal/images/sha256-224e0c52f257564a4dcaac65a8e0057714b6192b1fad5674adef5884f0f64437?context=explore",
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </TabsContent>
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
