import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shop - Rocky Linux",
  description:
    "Purchase official Rocky Linux merchandise! All vendors ship globally.",
};

const vendors = [
  {
    name: "Muckles' U!",
    role: "Ships worldwide, based in US",
    imageUrl: "/images/shop/muckles-u.png",
    link: "https://www.mucklesu.com/collections/rocky-linux",
  },
  {
    name: "HELLOTUX",
    role: "Ships worldwide, based in EU",
    imageUrl: "/images/shop/hellotux.png",
    link: "https://www.hellotux.com/rocky-linux",
  },
  {
    name: "FreeWear",
    role: "Ships worldwide, based in EU",
    imageUrl: "/images/shop/freewear.png",
    link: "https://www.freewear.org/RockyLinux",
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

const ShopPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("shop");

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg leading-8">{t("description")}</p>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ul
              role="list"
              className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {vendors.map((vendor) => (
                <li key={vendor.name}>
                  <a
                    href={vendor.link}
                    target="_blank"
                  >
                    <Image
                      className="w-full rounded-2xl object-fit"
                      src={vendor.imageUrl}
                      alt={vendor.name}
                      height={1000}
                      width={1000}
                    />
                    <h3 className="mt-6 text-lg font-bold leading-8 tracking-tight font-display">
                      {vendor.name}
                    </h3>
                    <p className="text-base leading-7">{vendor.role}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
