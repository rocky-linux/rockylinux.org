import { useTranslations } from "next-intl";
import {
  CloudIcon,
  ComponentInstanceIcon,
  CubeIcon,
  DesktopIcon,
  LaptopIcon,
  ServerIcon,
} from "./icons";

import { cn } from "@/lib/utils";
import type { PlatformId } from "@/utils/downloadSelection";

const ICONS: Record<PlatformId, React.ComponentType<{ className?: string }>> = {
  install: ServerIcon,
  cloud: CloudIcon,
  containers: CubeIcon,
  desktop: DesktopIcon,
  wsl: LaptopIcon,
  devices: ComponentInstanceIcon,
};

interface PlatformPickerProps {
  platforms: PlatformId[];
  selected: PlatformId;
  onSelect: (platform: PlatformId) => void;
  labelledBy: string;
}

const PlatformPicker = ({
  platforms,
  selected,
  onSelect,
  labelledBy,
}: PlatformPickerProps) => {
  const t = useTranslations("download.platforms");

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {platforms.map((id) => {
        const checked = id === selected;
        const Icon = ICONS[id];
        return (
          <label
            key={id}
            className="relative block cursor-pointer"
          >
            <input
              type="radio"
              name="platform"
              value={id}
              checked={checked}
              onChange={() => onSelect(id)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex h-full items-start gap-3 rounded-xl border-2 bg-card p-4 transition-colors",
                "hover:border-muted-foreground/50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                checked && "border-primary bg-primary/5"
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 size-6 shrink-0",
                  checked ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className="flex flex-col gap-1">
                <span className="font-display font-bold">
                  {t(`${id}.title`)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t(`${id}.description`)}
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default PlatformPicker;
