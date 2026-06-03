"use client";

import { useMemo } from "react";
import Logo, { LogoWordmark } from "@/components/Logo";
import { getActiveBranding } from "@/utils/branding";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import brandingSchedule from "@/data/branding-schedule.json";

/** Default favicon used when no scheduled branding is active. */
const DEFAULT_FAVICON = "/favicon.png";

const BrandedLogo = () => {
  const activeBranding = useMemo(() => getActiveBranding(brandingSchedule), []);

  /*
    Render the favicon link declaratively so React 19 hoists it into <head>
    and reconciles it across client-side navigations. The previous approach
    mutated document.head imperatively in a useEffect (removing/appending
    <link> nodes), which corrupted Next.js's head reconciliation and broke
    client-side navigation — the URL changed but content and <title> stayed
    stale, so links appeared to require a second click.

    This is the single source of truth for the favicon (the root layout no
    longer sets one), so there is exactly one <link rel="icon"> and no
    ordering ambiguity between a default and a branded icon.
  */
  const favicon = (
    <link
      rel="icon"
      href={activeBranding?.favicon ?? DEFAULT_FAVICON}
    />
  );

  if (!activeBranding) {
    return (
      <>
        {favicon}
        <Logo />
      </>
    );
  }

  return (
    <TooltipProvider>
      {favicon}
      <Tooltip>
        <TooltipTrigger asChild>
          <svg
            width="1165"
            height="256"
            fill="none"
            version="1.1"
            viewBox="0 0 1165 256"
            className="h-12 w-auto"
          >
            <image
              href={activeBranding.icon}
              x="32"
              y="32"
              width="192"
              height="192"
            />
            <LogoWordmark />
          </svg>
        </TooltipTrigger>
        <TooltipContent>
          <p>{activeBranding.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BrandedLogo;
