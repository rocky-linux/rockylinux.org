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
import AccessibilityWidget from "@/components/AccessibilityWidget";

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
        <AccessibilityWidget />
      </body>
    </html>
  );
}
