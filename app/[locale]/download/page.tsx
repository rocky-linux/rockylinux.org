import { getTranslations, setRequestLocale } from "next-intl/server";
import downloadData from "@/data/downloads.json";

import DownloadExperience from "./components/DownloadExperience";
import GetInvolved from "./components/get-involved";
import ExportCompliance from "./components/export-compliance";

import type { Metadata } from "next";
import type { DownloadData } from "@/types/downloads";
import { alternatesForPath } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Download - Rocky Linux",
    description: "Get started and download Rocky Linux today!",
    alternates: alternatesForPath(locale, "/download"),
  };
}

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
            <h1 className="text-3xl font-bold font-display tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <div className="mt-10 sm:mt-14">
            <DownloadExperience downloadData={typedDownloadData} />
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
