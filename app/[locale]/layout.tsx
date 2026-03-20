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
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import type { Metadata } from "next";

import PlausibleProvider from "next-plausible";
import type { Locale } from "@/types/i18nTypes";
import { alternatesForPath } from "@/lib/seo";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  const title = "Rocky Linux";
  const description =
    "Rocky Linux is an open enterprise Operating System designed to be 100% bug-for-bug compatible with Enterprise Linux.";
  const url = "https://rockylinux.org";

  return {
    title,
    icons: { icon: "/favicon.png" },
    description,
    alternates: {
      ...alternatesForPath(locale, "/"),
      types: { "application/rss+xml": `${url}/rss.xml` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
});

export function generateStaticParams() {
  return availableLanguages.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  if (!availableLanguages.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
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
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased mx-auto px-4 xl:px-0",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
