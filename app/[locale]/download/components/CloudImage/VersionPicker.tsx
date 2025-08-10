import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import VersionContent from "./VersionContent";

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
      {/* Mobile Version Selector and Content */}
      <div className="sm:hidden">
        <div className="flex flex-col gap-2 mb-4">
          <span className="text-sm">{t("selectVersion")}</span>
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
        {/* Mobile content - show only selected version */}
        {versions.map((version, index) => (
          <div
            key={index}
            className={cn(
              selectedVersion === version.versionId ? "block" : "hidden"
            )}
          >
            <VersionContent
              currentVersion={version.currentVersion}
              plannedEol={version.plannedEol}
              downloadOptions={version.downloadOptions}
              links={version.links}
            />
          </div>
        ))}
      </div>

      {/* Desktop Version Tabs */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm">{t("selectVersion")}</span>
        </div>
        <Tabs
          value={selectedVersion}
          onValueChange={setSelectedVersion}
        >
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
              <VersionContent
                currentVersion={version.currentVersion}
                plannedEol={version.plannedEol}
                downloadOptions={version.downloadOptions}
                links={version.links}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default VersionPicker;
