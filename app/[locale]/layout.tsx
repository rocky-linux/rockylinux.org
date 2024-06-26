// noinspection HtmlRequiredTitleElement

import { availableLanguages } from "@/config/i18nProperties";
import { notFound } from "next/navigation";
import "./globals.css";
import {
  Inter as FontSans,
  Red_Hat_Display as FontDisplay,
} from "next/font/google";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "./Header";
import Footer from "./Footer";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import PlausibleProvider from "next-plausible";

type RootLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: "Rocky Linux",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Rocky Linux is an open enterprise Operating System designed to be 100% bug-for-bug compatible with Enterprise Linux.",
  alternates: {
    types: {
      "application/rss+xml": "https://rockylinux.org/rss.xml",
    },
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!availableLanguages.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <head>
        <PlausibleProvider
          domain="rockylinux.org"
          customDomain="https://img.resf.workers.dev"
          trackOutboundLinks
          trackFileDownloads
          taggedEvents
          scriptProps={{
            // @ts-expect-error missing types
            "data-api": "https://img.resf.workers.dev/img/event",
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased mx-auto px-4 xl:px-0",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
