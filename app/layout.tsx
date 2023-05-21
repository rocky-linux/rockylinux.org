import "./globals.css";
import "@/fonts/fonts.css";

import type { Metadata } from "next";
import Header from "@/components/shared/Header";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
