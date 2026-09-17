"use client";

import {
  useState,
  useMemo,
  startTransition,
  useSyncExternalStore,
} from "react";
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
    selectArchitecture: string;
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

type GroupKey = Exclude<
  keyof ProcessedVersion,
  "versionName" | "versionId" | "currentVersion" | "plannedEol"
>;

// Versions that still have enabled downloads in a group, shaped for a card
const versionsFor = (versions: ProcessedVersion[], key: GroupKey) =>
  versions
    .filter((version) => version[key].downloadOptions.length > 0)
    .map((version) => ({
      versionName: version.versionName,
      versionId: version.versionId,
      currentVersion: version.currentVersion,
      plannedEol: version.plannedEol,
      downloadOptions: version[key].downloadOptions,
      links: version[key].links,
    }));

const TabsClient = ({ architectures, translations }: TabsClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const availableArchitectures = Object.keys(architectures);

  const archFromUrl = searchParams.get("arch");

  // Use useSyncExternalStore to detect hydration without setState in effects
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Client-side override for architecture (for instant switching)
  const [clientArch, setClientArch] = useState<string | null>(() => {
    return archFromUrl && availableArchitectures.includes(archFromUrl)
      ? archFromUrl
      : null;
  });

  // Track the previous URL arch to detect external URL changes
  const [prevArchFromUrl, setPrevArchFromUrl] = useState(archFromUrl);

  // Architectures without enabled downloads are filtered out, so x86_64 may be missing
  const fallbackArch = availableArchitectures.includes("x86_64")
    ? "x86_64"
    : availableArchitectures[0];

  // Memoize architecture detection to avoid expensive canvas/WebGL checks on every render
  const detectedArch = useMemo(
    () => (hydrated ? detectArchitecture() : fallbackArch),
    [hydrated, fallbackArch]
  );

  const defaultArch = availableArchitectures.includes(detectedArch)
    ? detectedArch
    : fallbackArch;

  const urlArch = availableArchitectures.includes(archFromUrl ?? "")
    ? (archFromUrl ?? defaultArch)
    : defaultArch;

  // Clear client override when URL arch param changes (e.g. browser back/forward)
  if (archFromUrl !== prevArchFromUrl) {
    setPrevArchFromUrl(archFromUrl);
    setClientArch(null);
  }

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

  const renderCards = (arch: string, versions: ProcessedVersion[]) => {
    const defaultVersions = versionsFor(versions, "defaultImages");
    const containerVersions = versionsFor(versions, "containerImages");
    const liveVersions = versionsFor(versions, "liveImages");
    const rpiVersions = versionsFor(versions, "rpiImages");
    const visionFive2Versions = versionsFor(versions, "visionFive2Images");
    const wslVersions = versionsFor(versions, "wslImages");

    return (
      <>
        {defaultVersions.length > 0 ? (
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
            versions={defaultVersions}
          />
        ) : null}
        {/* Always shown: the cloud provider buttons don't come from downloads.json */}
        <CloudImageCard
          title={translations.cards.cloudImages.title}
          titleTooltip={false}
          titleTooltipButtonLink=""
          titleTooltipButtonLabel=""
          versions={versionsFor(versions, "cloudImages")}
        />
        {containerVersions.length > 0 ? (
          <DefaultImageCard
            title={translations.cards.container.title}
            titleTooltip={false}
            titleTooltipButtonLink=""
            titleTooltipButtonLabel=""
            versions={containerVersions}
          />
        ) : null}
        {(arch === "x86_64" || arch === "aarch64") &&
        liveVersions.length > 0 ? (
          <DefaultImageCard
            title={translations.cards.liveImages.title}
            titleTooltip={false}
            titleTooltipButtonLink=""
            titleTooltipButtonLabel=""
            versions={liveVersions}
          />
        ) : null}
        {arch === "aarch64" && rpiVersions.length > 0 ? (
          <DefaultImageCard
            title={translations.cards.rpiImages.title}
            titleTooltip={false}
            titleTooltipButtonLink=""
            titleTooltipButtonLabel=""
            versions={rpiVersions}
          />
        ) : null}
        {arch === "riscv64" && visionFive2Versions.length > 0 ? (
          <DefaultImageCard
            title={translations.cards.visionfive2Images.title}
            titleTooltip={false}
            titleTooltipButtonLink=""
            titleTooltipButtonLabel=""
            versions={visionFive2Versions}
          />
        ) : null}
        {(arch === "x86_64" || arch === "aarch64") && wslVersions.length > 0 ? (
          <DefaultImageCard
            title={translations.cards.wslImages.title}
            titleTooltip={false}
            titleTooltipButtonLink=""
            titleTooltipButtonLabel=""
            versions={wslVersions}
          />
        ) : null}
      </>
    );
  };

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
          <SelectTrigger
            className="w-full cursor-pointer"
            aria-label={translations.selectArchitecture}
          >
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
            {renderCards(arch, data.versions)}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsClient;
