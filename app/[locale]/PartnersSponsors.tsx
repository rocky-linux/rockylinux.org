import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import AwsLogo from "@/components/partnerSponsorLogos/AwsLogo";
import EquinixLogo from "@/components/partnerSponsorLogos/EquinixLogo";
import FortyFiveDrivesLogo from "@/components/partnerSponsorLogos/FortyFiveDrivesLogo";
import GoogleCloudLogo from "@/components/partnerSponsorLogos/GoogleCloudLogo";
import MattermostLogo from "@/components/partnerSponsorLogos/MattermostLogo";
import OslLogo from "@/components/partnerSponsorLogos/OslLogo";
import VmwareLogo from "@/components/partnerSponsorLogos/VmwareLogo";

const PartnersSponsors = async () => {
  const t = await getTranslations("home.logos");

  return (
    <div className="py-12 sm:py-24">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-display tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="mx-auto grid w-full grid-cols-2 items-center justify-center gap-6 md:grid-cols-5">
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border focus-visible:outline-none focus-visible:ring-1"
            href="https://45drives.com"
            target="_blank"
          >
            <FortyFiveDrivesLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://arm.com"
            target="_blank"
          >
            <Image
              alt={t("arm")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/arm.svg"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://aws.com"
            target="_blank"
          >
            <AwsLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
            <p className="sr-only">{t("aws")}</p>
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://ciq.com"
          >
            <Image
              alt={t("ciq")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/ciq.png"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://equinix.com"
            target="_blank"
          >
            <EquinixLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
            <p className="sr-only">{t("equinix")}</p>
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://fastly.com"
            target="_blank"
          >
            <Image
              alt={t("fastly")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/fastly.svg"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://cloud.google.com"
            target="_blank"
          >
            <GoogleCloudLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
            <p className="sr-only">{t("googlecloud")}</p>
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://mattermost.com"
            target="_blank"
          >
            <MattermostLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
            <p className="sr-only">{t("mattermost")}</p>
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://www.mvista.com"
            target="_blank"
          >
            <Image
              alt={t("montavista")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/montavista.png"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://ncloud.com"
            target="_blank"
          >
            <Image
              alt={t("navercloud")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/navercloud.svg"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://opendrives.com"
            target="_blank"
          >
            <Image
              alt={t("opendrives")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/opendrives.png"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://osuosl.org"
            target="_blank"
          >
            <OslLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
            <p className="sr-only">{t("osuosl")}</p>
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://symphony.rakuten.com"
            target="_blank"
          >
            <Image
              alt={t("rakutensymphony")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/rakutensymphony.svg"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://supermicro.com"
            target="_blank"
          >
            <Image
              alt={t("supermicro")}
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height="40"
              src="/images/sponsors-partners/supermicro.svg"
              width="160"
            />
          </Link>
          <Link
            className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border"
            href="https://vmware.com"
            target="_blank"
          >
            <VmwareLogo
              className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
              height={40}
              width={160}
            />
            <p className="sr-only">{t("vmware")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnersSponsors;
