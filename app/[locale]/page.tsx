import Hero from "./Hero";
import FeatureOne from "./FeatureOne";
import ReleaseTracker from "./ReleaseTracker";
import NewsSnippet from "./NewsSnippet";
import LogoCloud from "@/components/logoCloud/LogoCloud";
import { setRequestLocale } from "next-intl/server";
import { alternatesForPath } from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: alternatesForPath(locale, "/"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureOne />
      <ReleaseTracker />
      <NewsSnippet />
      <LogoCloud />
    </>
  );
}
