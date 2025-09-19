import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface VersionItem {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
}

interface GlobalVersionPickerProps {
  versions: VersionItem[];
  selectedVersion: string;
  onVersionChange: (versionId: string) => void;
}

const GlobalVersionPicker: React.FC<GlobalVersionPickerProps> = ({
  versions,
  selectedVersion,
  onVersionChange,
}) => {
  const t = useTranslations("download");
  const separator = "•";

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-display font-semibold mb-2">
          {t("selectVersion")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("globalVersionDescription")}
        </p>
      </div>

      {/* Desktop Version Tabs */}
      <div className="hidden sm:block">
        <Tabs
          value={selectedVersion}
          onValueChange={onVersionChange}
        >
          <TabsList className="grid w-full grid-cols-3">
            {versions.map((version) => (
              <TabsTrigger
                key={version.versionId}
                value={version.versionId}
                className="cursor-pointer"
              >
                {version.versionName}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Mobile Version Selector */}
      <div className="sm:hidden">
        <Select
          value={selectedVersion}
          onValueChange={onVersionChange}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue>
              {versions.find((v) => v.versionId === selectedVersion)
                ?.versionName || versions[0]?.versionName}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {versions.map((version) => (
              <SelectItem
                key={version.versionId}
                value={version.versionId}
                className="cursor-pointer"
              >
                {version.versionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Version Info Display */}
      <div className="mt-4 text-center">
        {versions
          .filter((version) => version.versionId === selectedVersion)
          .map((version) => (
            <div
              key={version.versionId}
              className="text-sm text-muted-foreground"
            >
              <span className="font-medium">{version.currentVersion}</span>
              <span className="mx-2">{separator}</span>
              <span>
                {t("plannedEol")} {version.plannedEol}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GlobalVersionPicker;
