"use client";

import { useEffect, useMemo } from "react";
import Logo, { LogoWordmark } from "@/components/Logo";
import { getActiveBranding } from "@/utils/branding";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import brandingSchedule from "@/data/branding-schedule.json";

const BrandedLogo = () => {
  const activeBranding = useMemo(() => getActiveBranding(brandingSchedule), []);

  useEffect(() => {
    if (!activeBranding) return;

    const updateFavicon = () => {
      const existingIcons = document.querySelectorAll(
        "link[rel='icon'], link[rel='shortcut icon']"
      );
      existingIcons.forEach((icon) => icon.remove());

      const link = document.createElement("link");
      link.rel = "icon";
      link.href = activeBranding.favicon;
      document.head.appendChild(link);
    };

    // Run immediately and also after a brief delay to handle
    // Next.js head streaming that may re-add the default favicon
    updateFavicon();
    const timeout = setTimeout(updateFavicon, 100);
    return () => clearTimeout(timeout);
  }, [activeBranding]);

  if (!activeBranding) {
    return <Logo />;
  }

  return (
    <TooltipProvider>
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
