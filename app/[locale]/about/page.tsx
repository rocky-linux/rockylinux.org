import LogoCloud from "@/components/logoCloud/LogoCloud";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Rocky Linux",
  description: "It all started with a blog comment.",
};

const AboutPage = () => {
  const t = useTranslations("about");

  return (
    <>
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-lg font-semibold leading-8 tracking-tight text-primary uppercase font-display">
              {t("headings.subTitle")}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-display">
              {t("headings.title")}
            </h1>
            <p className="mt-6 text-xl leading-8">
              {t.rich("intro", {
                link: (chunks) => (
                  <Link
                    target="_blank"
                    href="https://blog.centos.org/2020/12/future-is-centos-stream/#comment-183642"
                    className="text-primary underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <div className="relative lg:order-last lg:col-span-5">
              <svg
                className="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-muted [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M0.5 0V200M200 0.5L0 0.499983" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
                />
              </svg>
              <figure className="border-l border-primary pl-8">
                <blockquote className="text-xl font-semibold leading-8 tracking-tight font-display">
                  <p>{t("quote.quote")}</p>
                </blockquote>
                <figcaption className="mt-8 flex gap-x-4">
                  <Image
                    src="/images/gmk.jpg"
                    alt="Profile Photo of Gregory Kurtzer"
                    className="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50"
                    height={200}
                    width={200}
                  />
                  <div className="text-sm leading-6">
                    <div className="font-semibold font-display">
                      {t("quote.author")}
                    </div>
                    <div className="text-foreground/80 font-display">
                      {t("quote.role")}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="max-w-xl text-base leading-7 lg:col-span-7">
              <p>{t("releaseInfo")}</p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight font-display">
                {t("organizationInfo.title")}
              </h2>
              <p className="mt-6">
                {t.rich("organizationInfo.info", {
                  link: (chunks) => (
                    <Link
                      target="_blank"
                      href="https://www.resf.org/about"
                      className="text-primary underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <LogoCloud />
    </>
  );
};

export default AboutPage;
