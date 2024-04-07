import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface DownloadOption {
  label: string;
  link: string;
}

interface Links {
  name: string;
  link: string;
}

interface VersionItem {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  downloadOptions: DownloadOption[];
  links?: Links[];
}

interface DownloadCardProps {
  versions: VersionItem[];
}

const VersionPicker: React.FC<DownloadCardProps> = ({ versions }) => {
  const t = useTranslations("download");

  return (
    <>
      <span className="mr-2">{t("selectVersion")}</span>
      <TabsList>
        {versions.map((version, index) => (
          <TabsTrigger
            key={index}
            value={version.versionId}
          >
            {version.versionName}
          </TabsTrigger>
        ))}
      </TabsList>
      {versions.map((version, index) => (
        <TabsContent
          value={version.versionId}
          key={index}
        >
          <TooltipProvider>
            <Tooltip>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-4xl">
                  {version.currentVersion}
                </h2>
                <TooltipTrigger>
                  <InfoCircledIcon className="text-muted-foreground h-5 w-5" />
                </TooltipTrigger>
              </div>
              <TooltipContent>
                <b>{t("plannedEol")} </b>
                {version.plannedEol}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-4">
            {version.downloadOptions.map((option, index) => (
              <Link
                href={option.link}
                key={index}
              >
                <Button
                  key={index}
                  className={`mt-2 ${index !== 0 ? "ml-4" : ""}`}
                >
                  {option.label}
                </Button>
              </Link>
            ))}
          </div>
          {/* Links */}
          <div className="mt-4 sm:flex grid grid-cols-2 sm:gap-4">
            {version.links?.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </TabsContent>
      ))}
    </>
  );
};

export default VersionPicker;
