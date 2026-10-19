import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import cloudImages from "@/data/cloud-images.json";

import DownloadRow from "./DownloadRow";
import { Columns } from "./CloudImage/Table/Columns";
import { DataTable } from "./CloudImage/Table/DataTable";

const GOOGLE_URL =
  "https://console.cloud.google.com/marketplace/browse?filter=partner:Rocky%20Linux";
const AZURE_URL =
  "https://azuremarketplace.microsoft.com/en-us/marketplace/apps/resf.rockylinux-x86_64";

/** Marketplace entries for the big three clouds. */
const CloudProviders = () => {
  const t = useTranslations("download");
  const tGlobal = useTranslations("global");
  const providers = "cards.cloudImages.cloudProviders";

  return (
    <ul className="divide-y">
      <DownloadRow
        name={t(`${providers}.aws.name`)}
        hint={t("cloudActions.aws")}
        actionLabel=""
        action={
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-44 sm:shrink-0"
              >
                {t("cloudActions.viewAmis")}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-10 pb-10 max-w-7xl mx-auto">
              <DrawerHeader className="flex items-center justify-between">
                <p className="font-display font-bold text-xl">
                  {t(`${providers}.aws.drawerTitle`)}
                </p>
                <DrawerClose asChild>
                  <Button variant="outline">{tGlobal("close")}</Button>
                </DrawerClose>
              </DrawerHeader>
              <DataTable
                columns={Columns}
                data={cloudImages}
              />
            </DrawerContent>
          </Drawer>
        }
      />
      <DownloadRow
        name={t(`${providers}.googleCloud`)}
        hint={t("cloudActions.google")}
        actionLabel={t("cloudActions.openMarketplace")}
        href={GOOGLE_URL}
        external
      />
      <DownloadRow
        name={t(`${providers}.azure`)}
        hint={t("cloudActions.azure")}
        actionLabel={t("cloudActions.openMarketplace")}
        href={AZURE_URL}
        external
      />
    </ul>
  );
};

export default CloudProviders;
