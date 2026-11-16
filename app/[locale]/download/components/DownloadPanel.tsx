import { useTranslations } from "next-intl";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  GroupKey,
  PlatformId,
  ProcessedArchitectures,
  Release,
} from "@/types/downloads";
import { groupsFor, majorVersion } from "@/utils/downloadSelection";

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

// Hint keys under `download.hints`: per option id, or for a whole group
const OPTION_HINTS = new Set([
  "dvd",
  "boot",
  "minimal",
  "qcow2",
  "fullImage",
  "minimalImage",
]);
const GROUP_HINTS: Partial<Record<GroupKey, string>> = {
  wslImages: "wsl",
  rpiImages: "rpi",
  visionFive2Images: "visionfive2",
};

const CommandBlock = ({ children }: Readonly<{ children: string }>) => (
  <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted px-4 py-3 text-sm">
    <code>{children}</code>
  </pre>
);

/**
 * Step 3: the files for the chosen release, platform and architecture, with
 * the architecture selector when there is more than one to choose from.
 *
 * @param props - Component props.
 * @param props.arches - Processed downloads for every architecture.
 * @param props.release - The selected release.
 * @param props.platform - The selected platform.
 * @param props.archs - Architectures that have downloads for this selection.
 * @param props.arch - The architecture on screen.
 * @param props.onArchChange - Called when the visitor picks another architecture.
 * @returns The results card.
 */
const DownloadPanel = ({
  arches,
  release,
  platform,
  archs,
  arch,
  onArchChange,
}: Readonly<DownloadPanelProps>) => {
  const t = useTranslations("download");

  const hintFor = (key: GroupKey, optionId: string): string | undefined => {
    if (key in GROUP_HINTS) return t(`hints.${GROUP_HINTS[key]}`);
    return OPTION_HINTS.has(optionId) ? t(`hints.${optionId}`) : undefined;
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
          const actionLabel = isContainer
            ? t("results.openDockerHub")
            : t("results.download");
          return (
            <div key={group.key}>
              {title ? (
                <h4 className="font-display text-lg font-bold">{title}</h4>
              ) : null}
              <ul className="divide-y">
                {group.downloadOptions.map((option) => (
                  <DownloadRow
                    key={option.link}
                    name={option.label}
                    hint={hintFor(group.key, option.id)}
                    actionLabel={actionLabel}
                    actionAriaLabel={t("results.actionFor", {
                      action: actionLabel,
                      name: option.label,
                    })}
                    href={option.link}
                    external={isContainer}
                    primary={
                      group.key === "defaultImages"
                        ? option.id === "dvd"
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
  // Containers are multi-arch images, so there is nothing to choose between
  const showArchSelector = archs.length > 1 && platform !== "containers";

  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-8">
      <h3 className="font-display text-xl font-bold sm:text-2xl">
        {t("results.heading", {
          platform: t(`platforms.${platform}.title`),
          release: release.versionName,
        })}
      </h3>

      {arch && showArchSelector ? (
        <Tabs
          value={arch}
          onValueChange={onArchChange}
          className="mt-4"
        >
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
        <div className="mt-4">
          {platform !== "containers" && arch ? (
            <p className="mb-6 text-sm text-muted-foreground">
              {t("results.singleArch", { arch: archLabel(arch) })}
            </p>
          ) : null}
          {renderContent(arch)}
        </div>
      )}
    </div>
  );
};

export default DownloadPanel;
