import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

interface DownloadOption {
  label: string;
  link: string;
}

interface Links {
  name: string;
  link: string;
}

interface VersionContentProps {
  currentVersion: string;
  plannedEol: string;
  downloadOptions: DownloadOption[];
  links?: Links[];
}

const VersionContent: React.FC<VersionContentProps> = ({
  currentVersion,
  plannedEol,
  downloadOptions,
  links,
}) => {
  const t = useTranslations("download");

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-2xl sm:text-4xl">
              {currentVersion}
            </h2>
            <TooltipTrigger asChild>
              <InfoCircledIcon className="hidden sm:block w-6 h-6 opacity-50 hover:opacity-100 transition-opacity cursor-help" />
            </TooltipTrigger>
          </div>
          <TooltipContent className="max-w-[300px]">
            <p className="text-sm">
              {t("plannedEol")} {plannedEol}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="sm:hidden text-sm text-muted-foreground">
        {t("plannedEol")} {plannedEol}
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {downloadOptions.map((option, optIndex) => (
          <Button
            key={optIndex}
            className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700 dark:text-white"
            size="lg"
            asChild
          >
            <a href={option.link}>{option.label}</a>
          </Button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 text-sm">
        {links?.map((link, linkIndex) => (
          <a
            key={linkIndex}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
};

export default VersionContent;
