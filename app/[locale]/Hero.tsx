import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const Hero = () => {
  const t = useTranslations("home.hero");
  const tGlobal = useTranslations("global");

  return (
    <div className="relative isolate pt-12 sm:pt-24">
      <div className="pb-12 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-display">
              {t("title")}{" "}
              <span className="relative whitespace-nowrap text-primary">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/50"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
                <span className="relative">{t("titleTwo")}</span>
              </span>{" "}
            </h1>
            <p className="mt-6 text-lg leading-8">{t("description")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/download">
                <Button className="p-5">{tGlobal("download")}</Button>
              </a>
              <a href="#">
                <Button
                  variant="secondary"
                  className="p-5"
                >
                  {t("migrate")}
                </Button>
              </a>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-slate-900/5 dark:bg-slate-100/5 p-2 ring-1 ring-inset ring-slate-900/10 dark:ring-slate-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/images/home-hero.png"
                alt="Rocky Linux Screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-100/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
