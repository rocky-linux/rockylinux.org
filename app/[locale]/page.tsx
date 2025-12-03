import Hero from "./Hero";
import FeatureOne from "./FeatureOne";
import NewsSnippet from "./NewsSnippet";
import LogoCloud from "@/components/logoCloud/LogoCloud";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureOne />
      <NewsSnippet />
      <LogoCloud />
    </>
  );
}
