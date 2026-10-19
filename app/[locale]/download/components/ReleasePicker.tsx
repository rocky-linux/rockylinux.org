import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { Release } from "@/utils/downloadSelection";

interface ReleasePickerProps {
  releases: Release[];
  selected: string;
  onSelect: (versionId: string) => void;
  labelledBy: string;
}

const ReleasePicker = ({
  releases,
  selected,
  onSelect,
  labelledBy,
}: ReleasePickerProps) => {
  const t = useTranslations("download.releases");

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]"
    >
      {releases.map((release, index) => {
        const checked = release.versionId === selected;
        return (
          <label
            key={release.versionId}
            className="relative block cursor-pointer"
          >
            <input
              type="radio"
              name="release"
              value={release.versionId}
              checked={checked}
              onChange={() => onSelect(release.versionId)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-full flex-col gap-1 rounded-xl border-2 bg-card p-4 transition-colors",
                "hover:border-muted-foreground/50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                checked && "border-primary bg-primary/5"
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-display text-lg font-bold">
                  {release.versionName}
                </span>
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
              </span>
              <span className="text-sm">
                {t("version", { version: release.currentVersion })}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("supportedUntil", { date: release.plannedEol })}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default ReleasePicker;
