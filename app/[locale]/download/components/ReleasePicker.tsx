import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Release } from "@/types/downloads";

import RadioCard from "./RadioCard";

interface ReleasePickerProps {
  releases: Release[];
  selected: string;
  onSelect: (versionId: string) => void;
  labelledBy: string;
}

/**
 * Step 1: the release to download, as a radio group of cards.
 *
 * @param props - Component props.
 * @param props.releases - Releases with downloads, newest first.
 * @param props.selected - Version id of the checked release.
 * @param props.onSelect - Called with the version id the visitor picks.
 * @param props.labelledBy - Id of the element that names the group.
 * @returns The release radio group.
 */
const ReleasePicker = ({
  releases,
  selected,
  onSelect,
  labelledBy,
}: Readonly<ReleasePickerProps>) => {
  const t = useTranslations("download.releases");

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]"
    >
      {releases.map((release, index) => (
        <RadioCard
          key={release.versionId}
          name="release"
          value={release.versionId}
          checked={release.versionId === selected}
          onSelect={onSelect}
          title={release.versionName}
          badge={
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-semibold",
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index === 0 ? t("latest") : t("maintained")}
            </span>
          }
        >
          <span className="text-sm">
            {t("version", { version: release.currentVersion })}
          </span>
          <span className="text-sm text-muted-foreground">
            {t("supportedUntil", { date: release.plannedEol })}
          </span>
        </RadioCard>
      ))}
    </div>
  );
};

export default ReleasePicker;
