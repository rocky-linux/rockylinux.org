"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import DefaultImageCard from "./DefaultImage/Card";
import CloudImageCard from "./CloudImage/Card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavigatorUserAgentData {
  platform: string;
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
}

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: NavigatorUserAgentData;
}

const detectArchitecture = (): string => {
  if (typeof window === "undefined") return "x86_64"; // SSR fallback

  const userAgent = navigator.userAgent;

  // Modern approach: use userAgentData if available
  const navigatorWithUserAgentData = navigator as NavigatorWithUserAgentData;
  if (navigatorWithUserAgentData.userAgentData?.platform) {
    const platform = navigatorWithUserAgentData.userAgentData.platform;

    // Check for Apple Silicon (M1/M2/M3/M4/etc.)
    if (platform === "macOS" && userAgent.includes("ARM64")) {
      return "aarch64";
    }
  }

  // Enhanced Apple Silicon detection for browsers that don't report ARM64 correctly
  if (userAgent.includes("Mac")) {
    // Check for explicit ARM64 mentions
    if (userAgent.includes("ARM64")) {
      return "aarch64";
    }

    // Dynamic Apple Silicon detection - check for any "Apple M" chip (M1, M2, M3, M4, M5, etc.)
    if (userAgent.includes("Apple M")) {
      return "aarch64";
    }

    // WebGL-based detection for Apple Silicon (more reliable than user agent parsing)
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      if (gl) {
        // Apple Silicon supports WEBGL_compressed_texture_etc extension
        // This is a reliable indicator of Apple Silicon vs Intel
        const extensions = gl.getSupportedExtensions();
        if (extensions && extensions.includes("WEBGL_compressed_texture_etc")) {
          return "aarch64";
        }
      }
    } catch (_e) {
      // WebGL detection failed, continue with other methods
    }

    // Fallback: Try to detect Apple Silicon based on system characteristics
    // Apple Silicon Macs typically have 8+ cores and run newer macOS versions
    if (navigator.hardwareConcurrency >= 8) {
      const osVersionMatch = userAgent.match(/Mac OS X (\d+)_(\d+)_(\d+)/);
      if (osVersionMatch) {
        const majorVersion = parseInt(osVersionMatch[1]);
        // macOS 11+ (Big Sur) is when Apple Silicon was introduced
        if (majorVersion >= 11) {
          // Additional check: if it's a Mac with many cores and newer macOS, likely Apple Silicon
          return "aarch64";
        }
      }
    }
  }

  // Check for ARM64 on other platforms
  if (userAgent.includes("ARM64") || userAgent.includes("aarch64")) {
    return "aarch64";
  }

  // Check for RISC-V (less common, but possible)
  if (userAgent.includes("riscv64") || userAgent.includes("RISC-V")) {
    return "riscv64";
  }

  // Default to x86_64 for most cases
  return "x86_64";
};

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const availableArchitectures = Object.keys(architectures);
  const [, forceUpdate] = useState({});
  const isInitialLoad = useRef(true);

  const archFromUrl = searchParams.get("arch");
  const detectedArch = detectArchitecture();
  const defaultArch = availableArchitectures.includes(detectedArch)
    ? detectedArch
    : "x86_64";

  const currentArch = availableArchitectures.includes(archFromUrl ?? "")
    ? (archFromUrl ?? defaultArch)
    : defaultArch;

  const updateArchitecture = (newArch: string) => {
    if (!availableArchitectures.includes(newArch)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("arch", newArch);

    // Use push to maintain history for user-initiated changes
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Set default architecture on initial load (only if no arch in URL)
  useEffect(() => {
    if (
      isInitialLoad.current &&
      !archFromUrl &&
      availableArchitectures.length > 0
    ) {
      // Don't redirect - just set the internal state
      isInitialLoad.current = false;
    }
  }, [archFromUrl, availableArchitectures, isInitialLoad]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      // Check if we're trying to go back to a different page
      const currentUrl = window.location.pathname + window.location.search;
      const isStillOnDownloadsPage = currentUrl.startsWith(pathname);

      if (isStillOnDownloadsPage) {
        // Still on downloads page, just architecture changed
        forceUpdate({});
      }
      // If not on downloads page, let the browser handle it naturally
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, forceUpdate]);

  return (
    <Tabs
      value={currentArch}
      onValueChange={updateArchitecture}
    >
      <TabsList className="sm:flex justify-center gap-4 hidden">
        {Object.keys(architectures).map((arch) => (
          <TabsTrigger
            key={arch}
            value={arch}
          >
            {translations.tabs[arch]}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsList className="flex justify-center gap-4 sm:hidden">
        {Object.keys(architectures).map((arch) => (
          <TabsTrigger
            key={arch}
            value={arch}
          >
            {translations.tabsShortened[arch]}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(architectures).map(([arch, data]) => (
        <TabsContent
          key={arch}
          value={arch}
        >
          <div className="grid gap-6 mt-4">
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
