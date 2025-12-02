"use client";

import { useEffect, useState, startTransition } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { detectArchitecture } from "@/utils/architectureDetection";

import DefaultImageCard from "./DefaultImage/Card";
import CloudImageCard from "./CloudImage/Card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface TabsClientProps {
  architectures: Record<string, { versions: ProcessedVersion[] }>;
  translations: {
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
      };
      visionfive2Images: {
        title: string;
        download: string;
        readMe: string;
      };
    };
  };
}

const TabsClient = ({ architectures, translations }: TabsClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const availableArchitectures = Object.keys(architectures);

  const archFromUrl = searchParams.get("arch");

  // Use a stable default for initial render to avoid hydration mismatch
  const [detectedArch, setDetectedArch] = useState("x86_64");

  // Client-side state for current architecture (for instant switching)
  const [clientArch, setClientArch] = useState<string | null>(() => {
    return archFromUrl && availableArchitectures.includes(archFromUrl)
      ? archFromUrl
      : null;
  });

  // Detect architecture only on client after hydration
  useEffect(() => {
    const detected = detectArchitecture();
    if (availableArchitectures.includes(detected)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Legitimate: client-side detection after hydration
      setDetectedArch(detected);
    }
  }, [availableArchitectures]);

  const defaultArch = availableArchitectures.includes(detectedArch)
    ? detectedArch
    : "x86_64";

  const urlArch = availableArchitectures.includes(archFromUrl ?? "")
    ? (archFromUrl ?? defaultArch)
    : defaultArch;

  // Use client-side state for current architecture, fallback to URL or default
  const currentArch = clientArch ?? urlArch;

  const updateArchitecture = (newArch: string) => {
    if (!availableArchitectures.includes(newArch)) return;

    // Immediately update client state for instant UI response
    startTransition(() => {
      setClientArch(newArch);
    });

    // Update URL without triggering server navigation (shallow update)
    const params = new URLSearchParams(searchParams.toString());
    params.set("arch", newArch);
    const newUrl = `${pathname}?${params.toString()}`;

    // Use window.history.pushState for shallow update without server round-trip
    window.history.pushState(null, "", newUrl);
  };

  // Sync client state with URL changes (including browser navigation)
  useEffect(() => {
    // Clear client state when URL changes to let URL take precedence
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Legitimate: syncing with external URL state
    setClientArch(null);
  }, [searchParams]);

  return (
    <Tabs
      value={currentArch}
      onValueChange={updateArchitecture}
    >
      <TabsList className="sm:flex justify-center lg:gap-4 hidden">
        {Object.keys(architectures).map((arch) => (
          <TabsTrigger
            key={arch}
            value={arch}
            className="cursor-pointer"
          >
            {translations.tabs[arch]}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* Mobile dropdown for architecture selection */}
      <div className="sm:hidden w-full mb-4">
        <Select
          value={currentArch}
          onValueChange={updateArchitecture}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue>{translations.tabs[currentArch]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(architectures).map((arch) => (
              <SelectItem
                key={arch}
                value={arch}
                className="cursor-pointer"
              >
                {translations.tabs[arch]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {Object.entries(architectures).map(([arch, data]) => (
        <TabsContent
          key={arch}
          value={arch}
        >
          <div className="grid gap-4 sm:gap-6 mt-4 overflow-x-hidden">
            <DefaultImageCard
              title={translations.cards.defaultImages.title}
              titleTooltip={true}
              titleTooltipText={[
                {
                  text: translations.cards.defaultImages.tooltips.dvd,
                },
                {
                  text: translations.cards.defaultImages.tooltips.boot,
                },
                {
                  text: translations.cards.defaultImages.tooltips.minimal,
                },
              ]}
              titleTooltipButtonLink="https://docs.rockylinux.org/guides/installation/"
              titleTooltipButtonLabel={
                translations.cards.defaultImages.tooltips.buttonLabel
              }
              versions={data.versions.map((version) => ({
                versionName: version.versionName,
                versionId: version.versionId,
                currentVersion: version.currentVersion,
                plannedEol: version.plannedEol,
                downloadOptions: version.defaultImages.downloadOptions,
                links: version.defaultImages.links,
              }))}
            />
            <CloudImageCard
              title={translations.cards.cloudImages.title}
              titleTooltip={false}
              titleTooltipButtonLink=""
              titleTooltipButtonLabel=""
              versions={data.versions.map((version) => ({
                versionName: version.versionName,
                versionId: version.versionId,
                currentVersion: version.currentVersion,
                plannedEol: version.plannedEol,
                downloadOptions: version.cloudImages.downloadOptions,
                links: version.cloudImages.links,
              }))}
            />
            <DefaultImageCard
              title={translations.cards.container.title}
              titleTooltip={false}
              titleTooltipButtonLink=""
              titleTooltipButtonLabel=""
              versions={data.versions.map((version) => ({
                versionName: version.versionName,
                versionId: version.versionId,
                currentVersion: version.currentVersion,
                plannedEol: version.plannedEol,
                downloadOptions: version.containerImages.downloadOptions,
                links: version.containerImages.links,
              }))}
            />
            {arch === "x86_64" || arch === "aarch64" ? (
              <DefaultImageCard
                title={translations.cards.liveImages.title}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map((version) => ({
                  versionName: version.versionName,
                  versionId: version.versionId,
                  currentVersion: version.currentVersion,
                  plannedEol: version.plannedEol,
                  downloadOptions: version.liveImages.downloadOptions,
                  links: version.liveImages.links,
                }))}
              />
            ) : null}
            {arch === "aarch64" ? (
              <DefaultImageCard
                title={translations.cards.rpiImages.title}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map((version) => ({
                  versionName: version.versionName,
                  versionId: version.versionId,
                  currentVersion: version.currentVersion,
                  plannedEol: version.plannedEol,
                  downloadOptions: version.rpiImages.downloadOptions,
                  links: version.rpiImages.links,
                }))}
              />
            ) : null}
            {arch === "riscv64" ? (
              <DefaultImageCard
                title={translations.cards.visionfive2Images.title}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map((version) => ({
                  versionName: version.versionName,
                  versionId: version.versionId,
                  currentVersion: version.currentVersion,
                  plannedEol: version.plannedEol,
                  downloadOptions: version.visionFive2Images.downloadOptions,
                  links: version.visionFive2Images.links,
                }))}
              />
            ) : null}
            {arch === "x86_64" || arch === "aarch64" ? (
              <DefaultImageCard
                title={translations.cards.wslImages.title}
                titleTooltip={false}
                titleTooltipButtonLink=""
                titleTooltipButtonLabel=""
                versions={data.versions.map((version) => ({
                  versionName: version.versionName,
                  versionId: version.versionId,
                  currentVersion: version.currentVersion,
                  plannedEol: version.plannedEol,
                  downloadOptions: version.wslImages.downloadOptions,
                  links: version.wslImages.links,
                }))}
              />
            ) : null}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsClient;
