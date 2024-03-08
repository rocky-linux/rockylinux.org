import React from "react";
import partnerSponsorData from "@/data/partnersSponsors";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sponsors - Rocky Linux",
  description:
    "Our sponsors provide us with financial backing. We wouldn't be here without their help!",
};

const SponsorsPage = () => {
  const { sponsors } = partnerSponsorData[0];

  const sortedTierOneSponsors = sponsors.flatMap((sponsor) => sponsor.tierOne);
  const sortedTierFourSponsors = sponsors.flatMap(
    (sponsor) => sponsor.tierFour
  );

  const t = useTranslations("sponsors");

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg leading-8">{t("description")}</p>
            <a href="https://www.resf.org/become-sponsor">
              <Button className="mt-4 p-5">{t("learnMore")}</Button>
            </a>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {sortedTierOneSponsors.map((sponsor) => (
              <Link
                href={sponsor.href}
                target="_blank"
                rel="noreferrer"
                key={sponsor.name}
              >
                <div className="flex flex-col overflow-hidden ml-7">
                  <div className="flex bg-card border border-muted rounded-lg items-center justify-center">
                    {sponsor.logo ? (
                      React.cloneElement(sponsor.logo, {
                        className: "h-32 p-10 object-fit pointer-events-none",
                      })
                    ) : (
                      <Image
                        alt={sponsor.name}
                        className="h-32 w-fit p-10 object-fit pointer-events-none"
                        height={1000}
                        src={sponsor.src || ""}
                        width={1000}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-6">
                    <span className="flex items-center gap-x-3">
                      <p className="text-xl font-semibold">{sponsor.name}</p>
                      <div>
                        {sponsor.founding && (
                          <Badge>{t("foundingSponsor")}</Badge>
                        )}
                      </div>
                    </span>
                    <p className="mt-3 text-base line-clamp-6 hover:line-clamp-none">
                      {sponsor.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            {sortedTierFourSponsors.map((sponsor) => (
              <Link
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex flex-col overflow-hidden ml-7">
                  <div className="flex flex-1 flex-col justify-between bg-card border border-muted rounded-lg">
                    <span className="flex items-center justify-center gap-x-3">
                      <p className="text-xl font-semibold p-8">
                        {sponsor.name}
                      </p>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorsPage;
