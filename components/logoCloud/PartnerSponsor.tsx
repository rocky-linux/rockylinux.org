import React, { JSX } from "react";
import Image from "next/image";
import SmartLink from "@/components/SmartLink";

const ARTWORK_CLASS =
  "aspect-4/1 overflow-hidden rounded-lg object-contain object-center";

type SponsorProps = {
  href: string;
  logo?: JSX.Element;
  src?: string;
  alt: string;
};

const artwork = (logo?: JSX.Element, src?: string, alt?: string) => {
  if (logo) {
    return React.cloneElement(logo, {
      className: ARTWORK_CLASS,
      height: 40,
      width: 160,
    });
  }

  if (src) {
    return (
      <Image
        alt={alt ?? ""}
        className={ARTWORK_CLASS}
        height={40}
        src={src}
        width={160}
      />
    );
  }

  return null;
};

const PartnerSponsor: React.FC<SponsorProps> = ({ href, logo, src, alt }) => {
  return (
    <SmartLink
      className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border focus-visible:outline-hidden focus-visible:ring-1"
      href={href}
    >
      {artwork(logo, src, alt)}
      <p className="sr-only">{alt}</p>
    </SmartLink>
  );
};

export default PartnerSponsor;
