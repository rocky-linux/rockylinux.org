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

import RadioCard from "./RadioCard";
import type { PlatformId } from "@/types/downloads";

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

/**
 * Step 2: where the visitor will run Rocky Linux, as a radio group of cards.
 *
 * @param props - Component props.
 * @param props.platforms - Platforms offered for the selected release.
 * @param props.selected - The checked platform.
 * @param props.onSelect - Called with the platform the visitor picks.
 * @param props.labelledBy - Id of the element that names the group.
 * @returns The platform radio group.
 */
const PlatformPicker = ({
  platforms,
  selected,
  onSelect,
  labelledBy,
}: Readonly<PlatformPickerProps>) => {
  const t = useTranslations("download.platforms");

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {platforms.map((id) => {
        const Icon = ICONS[id];
        const checked = id === selected;
        return (
          <RadioCard
            key={id}
            name="platform"
            value={id}
            checked={checked}
            onSelect={onSelect}
            title={t(`${id}.title`)}
            icon={
              <Icon
                className={cn(
                  "mt-0.5 size-6 shrink-0",
                  checked ? "text-primary" : "text-muted-foreground"
                )}
              />
            }
          >
            <span className="text-sm text-muted-foreground">
              {t(`${id}.description`)}
            </span>
          </RadioCard>
        );
      })}
    </div>
  );
};

export default PlatformPicker;
