import { getTranslations } from "next-intl/server";

import partnerSponsorData from "@/data/partnersSponsors";

import PartnerSponsor from "./PartnerSponsor";

const LogoCloud = async () => {
  const t = await getTranslations("home.logoCloud");

  const allSponsorsAndPartners = partnerSponsorData.flatMap((data) => [
    ...data.sponsors.flatMap((group) => group.tierOne),
    ...data.partners.flatMap((group) => group.tierOne),
  ]);

  const sortedSponsorsAndPartners = allSponsorsAndPartners.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="mx-auto grid w-full grid-cols-2 items-center justify-center gap-6 md:grid-cols-5 pt-10 sm:pt-16">
          {sortedSponsorsAndPartners.map((partnerSponsor, index) => (
            <PartnerSponsor
              key={index}
              href={partnerSponsor.href}
              logo={partnerSponsor.logo || undefined}
              src={partnerSponsor.src || undefined}
              alt={partnerSponsor.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
