import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import VersionContent from "./VersionContent";
import Link from "next/link";

import { CloudImage, Columns } from "./Table/Columns";
import { DataTable } from "./Table/DataTable";
import cloudImages from "@/data/cloud-images.json";
import { cn } from "@/lib/utils";

interface DownloadOption {
  label: string;
  link: string;
}

interface Links {
  name: string;
  link: string;
}

interface TooltipText {
  text: string;
}

interface VersionItem {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  downloadOptions: DownloadOption[];
  links: Links[];
}

interface CloudImageCardProps {
  title: string;
  titleTooltip: boolean;
  titleTooltipText?: TooltipText[];
  titleTooltipButtonLabel: string;
  titleTooltipButtonLink: string;
  versions: VersionItem[];
}

function getData(): CloudImage[] {
  return cloudImages;
}

const CloudImageCard: React.FC<CloudImageCardProps> = ({
  title,
  titleTooltip,
  titleTooltipText,
  titleTooltipButtonLabel,
  titleTooltipButtonLink,
  versions,
}) => {
  const data = getData();

  const t = useTranslations("download");
  const tGlobal = useTranslations("global");

  // Since we now filter to only one version in TabsClient, we can directly use the first (and only) version
  const version = versions[0];

  const hasCloudImages =
    version && version.downloadOptions.length > 0 && version.links.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {titleTooltip ? (
            <HoverCard>
              <div className="flex gap-2 items-center">
                <span className="text-xl sm:text-2xl font-display font-bold">
                  {title}
                </span>
                <HoverCardTrigger className="text-muted-foreground">
                  <QuestionMarkCircledIcon />
                </HoverCardTrigger>
              </div>
              <HoverCardContent>
                {titleTooltipText?.map((line, index) => (
                  <p
                    key={index}
                    className="font-normal font-sans py-2"
                  >
                    {line.text}
                  </p>
                ))}
                <a href={titleTooltipButtonLink}>
                  <Button className="mt-2">{titleTooltipButtonLabel}</Button>
                </a>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="text-xl sm:text-2xl font-display font-bold">
                {title}
              </span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(!hasCloudImages ? "sm:!pt-0" : "")}>
        {hasCloudImages && (
          <>
            <h3 className="text-lg font-display font-bold">
              {t("cards.cloudImages.genericCloud")}
            </h3>
            <VersionContent
              currentVersion={version.currentVersion}
              plannedEol={version.plannedEol}
              downloadOptions={version.downloadOptions}
              links={version.links}
            />
            <hr className="my-8" />
          </>
        )}
        <div className={cn(hasCloudImages ? "mt-8" : "")}>
          <h3 className="text-lg font-display font-bold mb-4">
            {t("cards.cloudImages.cloudProviders.title")}
          </h3>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Drawer>
              <DrawerTrigger className="w-full sm:w-auto">
                <span
                  className={
                    buttonVariants({ variant: "default" }) + " w-full sm:w-auto"
                  }
                >
                  {t("cards.cloudImages.cloudProviders.aws.name")}
                </span>
              </DrawerTrigger>
              <DrawerContent className="px-10 pb-10 max-w-7xl mx-auto">
                <DrawerHeader className="flex items-center justify-between">
                  <p className="font-display font-bold text-xl">
                    {t("cards.cloudImages.cloudProviders.aws.drawerTitle")}
                  </p>
                  <DrawerClose>
                    <Button variant="outline">{tGlobal("close")}</Button>
                  </DrawerClose>
                </DrawerHeader>
                <DataTable
                  columns={Columns}
                  data={data}
                />
              </DrawerContent>
            </Drawer>
            <Link
              href="https://console.cloud.google.com/marketplace/browse?filter=partner:Rocky%20Linux"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto">
                {t("cards.cloudImages.cloudProviders.googleCloud")}
              </Button>
            </Link>
            <Link
              href="https://azuremarketplace.microsoft.com/en-us/marketplace/apps/resf.rockylinux-x86_64"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto">
                {t("cards.cloudImages.cloudProviders.azure")}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CloudImageCard;
