import { getTranslations, setRequestLocale } from "next-intl/server";
import downloadData from "@/data/downloads.json";

import DownloadTabs from "./components/Tabs";
import GetInvolved from "./components/get-involved";
import ExportCompliance from "./components/export-compliance";

import type { Metadata } from "next";
import type { DownloadData } from "@/types/downloads";

export const metadata: Metadata = {
  title: "Download - Rocky Linux",
  description: "Get started and download Rocky Linux today!",
};

type Props = {
  params: Promise<{ locale: string }>;
};

const DownloadPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("download");
  const typedDownloadData = downloadData as DownloadData;
  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg leading-8">{t("description")}</p>
          </div>
          <div className="mx-auto mt-10 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
            <DownloadTabs downloadData={typedDownloadData} />
          </div>
          <hr className="my-8" />
          <GetInvolved />
          <hr className="my-8" />
          <ExportCompliance />
        </div>
      </div>
    </>
  );
};

export default DownloadPage;
