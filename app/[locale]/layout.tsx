import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";

import Header from "./layout/header/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rocky Linux",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Rocky Linux is an open enterprise Operating System designed to be 100% bug-for-bug compatible with Enterprise Linux.",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: any };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html className="h-full" lang={locale}>
      <body className="h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
