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
import { Tabs } from "@/components/ui/tabs";
import VersionPicker from "./VersionPicker";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

import { CloudImage, Columns } from "./Table/Columns";
import { DataTable } from "./Table/DataTable";
import cloudImages from "@/data/cloud-images.json";

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
  titleTooltipButtonLink: Url;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {titleTooltip ? (
            <HoverCard>
              <div className="flex gap-2 items-center">
                <h2 className="text-2xl font-display font-bold">{title}</h2>
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
                <Link href={titleTooltipButtonLink}>
                  <Button className="mt-2">{titleTooltipButtonLabel}</Button>
                </Link>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl font-display font-bold">{title}</h2>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-display font-bold">
          {t("cards.cloudImages.genericCloud")}
        </h3>
        <Tabs defaultValue="rocky-10">
          <VersionPicker versions={versions} />
        </Tabs>
        <hr className="my-8" />
        <div className="mt-8">
          <h3 className="text-lg font-display font-bold mb-4">
            {t("cards.cloudImages.cloudProviders.title")}
          </h3>

          <div className="flex gap-4">
            <Drawer>
              <DrawerTrigger>
                <span
                  className={buttonVariants({ variant: "default" }) + " mb-6"}
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
            >
              <Button>
                {t("cards.cloudImages.cloudProviders.googleCloud")}
              </Button>
            </Link>
            <Link
              href="https://azuremarketplace.microsoft.com/en-us/marketplace/apps/resf.rockylinux-x86_64"
              target="_blank"
            >
              <Button>{t("cards.cloudImages.cloudProviders.azure")}</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CloudImageCard;
