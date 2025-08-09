import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  links: Links[];
}

interface DownloadCardProps {
  versions: VersionItem[];
}

const VersionPicker: React.FC<DownloadCardProps> = ({ versions }) => {
  const t = useTranslations("download");
  const [selectedVersion, setSelectedVersion] = useState(
    versions[0]?.versionId || "rocky-10"
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <span className="text-sm">{t("selectVersion")}</span>
        {/* Mobile dropdown */}
        <div className="sm:hidden w-full">
          <Select
            value={selectedVersion}
            onValueChange={setSelectedVersion}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {versions.find((v) => v.versionId === selectedVersion)
                  ?.versionName || versions[0]?.versionName}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {versions.map((version, index) => (
                <SelectItem
                  key={index}
                  value={version.versionId}
                >
                  {version.versionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Desktop tabs */}
        <TabsList className="hidden sm:inline-flex">
          {versions.map((version, index) => (
            <TabsTrigger
              key={index}
              value={version.versionId}
              onClick={() => setSelectedVersion(version.versionId)}
            >
              {version.versionName}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {/* Show only selected version content on mobile */}
      {versions.map((version, index) => (
        <TabsContent
          value={version.versionId}
          key={index}
          className={`sm:block ${selectedVersion === version.versionId ? "block" : "hidden"}`}
        >
          <TooltipProvider>
            <Tooltip>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-2xl sm:text-4xl">
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
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
            {version.downloadOptions.map((option, index) => (
              <Link
                href={option.link}
                key={index}
                className="w-full sm:w-auto"
              >
                <Button
                  key={index}
                  className={`w-full sm:w-auto ${index !== 0 ? "sm:ml-4" : ""}`}
                >
                  {option.label}
                </Button>
              </Link>
            ))}
          </div>
          {/* Links */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left">
            {version.links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="underline hover:no-underline"
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
