import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  /** Accessible name of the option; always rendered as the label's text */
  title: string;
  /** Extra details shown beside or below the title */
  children?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
}

/**
 * A selectable card backed by a native radio input. The input covers the whole
 * card (invisible but real), so clicks, taps, keyboard arrows and assistive
 * tech all work on the actual control.
 */
const RadioCard = ({
  name,
  value,
  checked,
  onSelect,
  title,
  children,
  icon,
  badge,
}: RadioCardProps) => (
  <label className="relative block cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={() => onSelect(value)}
      className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0"
    />
    <span
      className={cn(
        "flex h-full items-start gap-3 rounded-xl border-2 bg-card p-4 transition-colors",
        "hover:border-muted-foreground/50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
        checked && "border-primary bg-primary/5"
      )}
    >
      {icon}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center justify-between gap-2">
          <span className="font-display text-base font-bold">{title}</span>
          {badge}
        </span>
        {children}
      </span>
    </span>
  </label>
);

export default RadioCard;
