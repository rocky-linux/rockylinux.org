import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = {
  title: "Download - Rocky Linux",
  description: "Get started and download Rocky Linux today!",
};

const DownloadPage = () => {
  return (
    <NextIntlClientProvider>
      <DownloadContent />
    </NextIntlClientProvider>
  );
};

export default DownloadPage;
