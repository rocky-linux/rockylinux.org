import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProcessedArchitectures } from "@/utils/downloadDataProcessor";
import {
  groupsFor,
  majorVersion,
  type GroupKey,
  type PlatformId,
  type Release,
} from "@/utils/downloadSelection";

import CloudProviders from "./CloudProviders";
import DownloadRow from "./DownloadRow";

interface DownloadPanelProps {
  arches: ProcessedArchitectures;
  release: Release;
  platform: PlatformId;
  /** Architectures that have downloads for this release and platform */
  archs: string[];
  arch: string | undefined;
  onArchChange: (arch: string) => void;
}

const CommandBlock = ({ children }: { children: string }) => (
  <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted px-4 py-3 text-sm">
    <code>{children}</code>
  </pre>
);

const DownloadPanel = ({
  arches,
  release,
  platform,
  archs,
  arch,
  onArchChange,
}: DownloadPanelProps) => {
  const t = useTranslations("download");

  const hintFor = (key: GroupKey, label: string): string | undefined => {
    const byLabel: Partial<Record<GroupKey, Record<string, string>>> = {
      defaultImages: {
        [t("cards.defaultImages.downloadOptions.dvd")]: t("hints.dvd"),
        [t("cards.defaultImages.downloadOptions.boot")]: t("hints.boot"),
        [t("cards.defaultImages.downloadOptions.minimal")]: t("hints.minimal"),
      },
      containerImages: {
        [t("cards.container.downloadOptions.fullImage")]: t("hints.fullImage"),
        [t("cards.container.downloadOptions.minimalImage")]:
          t("hints.minimalImage"),
      },
    };
    const forGroup: Partial<Record<GroupKey, string>> = {
      cloudImages: t("hints.qcow2"),
      wslImages: t("hints.wsl"),
      rpiImages: t("hints.rpi"),
      visionFive2Images: t("hints.visionfive2"),
    };
    return byLabel[key]?.[label] ?? forGroup[key];
  };

  const groupTitle = (key: GroupKey): string | undefined => {
    switch (key) {
      case "rpiImages":
        return t("cards.rpiImages.title");
      case "visionFive2Images":
        return t("cards.visionfive2Images.title");
      case "cloudImages":
        return t("cards.cloudImages.genericCloud");
      default:
        return undefined;
    }
  };

  const major = majorVersion(release.versionId);
  const pullCommands = [
    `podman pull docker.io/rockylinux/rockylinux:${major}`,
    `podman pull docker.io/rockylinux/rockylinux:${major}-minimal`,
  ].join("\n");
  const verifyCommand = "sha256sum -c CHECKSUM --ignore-missing";

  const renderContent = (forArch: string | undefined) => {
    const groups = forArch
      ? groupsFor(arches, forArch, release.versionId, platform)
      : [];

    return (
      <div className="space-y-8">
        {groups.map((group) => {
          const title = groupTitle(group.key);
          const isContainer = group.key === "containerImages";
          return (
            <div key={group.key}>
              {title ? (
                <h4 className="font-display text-lg font-bold">{title}</h4>
              ) : null}
              <ul className="divide-y">
                {group.downloadOptions.map((option, index) => (
                  <DownloadRow
                    key={option.link}
                    name={option.label}
                    hint={hintFor(group.key, option.label)}
                    actionLabel={
                      isContainer
                        ? t("results.openDockerHub")
                        : t("results.download")
                    }
                    href={option.link}
                    external={isContainer}
                    primary={
                      group.key === "defaultImages"
                        ? index === 0
                        : group.downloadOptions.length === 1
                    }
                  />
                ))}
              </ul>
              {group.links.length > 0 ? (
                <div className="mt-2 text-sm">
                  <p className="text-muted-foreground">
                    {t("results.related")}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                    {group.links.map((link) => (
                      <li key={link.link}>
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:no-underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}

        {platform === "cloud" ? (
          <div>
            <h4 className="font-display text-lg font-bold">
              {t("cards.cloudImages.cloudProviders.title")}
            </h4>
            <CloudProviders />
          </div>
        ) : null}

        {platform === "containers" && groups.length > 0 ? (
          <div>
            <h4 className="font-display text-lg font-bold">
              {t("results.pullTitle")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("results.pullText")}
            </p>
            <CommandBlock>{pullCommands}</CommandBlock>
          </div>
        ) : null}

        {(platform === "install" || platform === "desktop") &&
        groups.length > 0 ? (
          <div>
            <h4 className="font-display text-lg font-bold">
              {t("results.verifyTitle")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("results.verifyText")}
            </p>
            <CommandBlock>{verifyCommand}</CommandBlock>
          </div>
        ) : null}
      </div>
    );
  };

  const archLabel = (a: string) => t(`tabs.${a}`);
  const singleArchLabel = arch
    ? `${t("results.architecture")}: ${archLabel(arch)}`
    : "";

  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-8">
      <h3 className="font-display text-xl font-bold sm:text-2xl">
        {t("results.heading", {
          platform: t(`platforms.${platform}.title`),
          release: release.versionName,
        })}
      </h3>

      {arch && archs.length > 0 ? (
        <Tabs
          value={arch}
          onValueChange={onArchChange}
          className="mt-4"
        >
          {archs.length > 1 ? (
            <div>
              <p className="mb-2 text-sm font-medium">
                {t("results.architecture")}
              </p>
              <TabsList className="hidden sm:inline-flex flex-wrap h-auto">
                {archs.map((a) => (
                  <TabsTrigger
                    key={a}
                    value={a}
                    className="cursor-pointer"
                  >
                    {archLabel(a)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="sm:hidden">
                <Select
                  value={arch}
                  onValueChange={onArchChange}
                >
                  <SelectTrigger
                    className="w-full cursor-pointer"
                    aria-label={t("selectArchitecture")}
                  >
                    <SelectValue>{archLabel(arch)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {archs.map((a) => (
                      <SelectItem
                        key={a}
                        value={a}
                        className="cursor-pointer"
                      >
                        {archLabel(a)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("results.architectureHelp")}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{singleArchLabel}</p>
          )}
          {archs.map((a) => (
            <TabsContent
              key={a}
              value={a}
              className="mt-6"
            >
              {renderContent(a)}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="mt-6">{renderContent(undefined)}</div>
      )}
    </div>
  );
};

export default DownloadPanel;
