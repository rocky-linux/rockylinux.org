import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

type SponsorProps = {
  href: string;
  logo?: JSX.Element;
  src?: string;
  alt: string;
};

const PartnerSponsor: React.FC<SponsorProps> = ({ href, logo, src, alt }) => {
  return (
    <Link
      className="mx-auto flex w-full items-center justify-center p-4 sm:p-8 rounded-lg border focus-visible:outline-none focus-visible:ring-1"
      href={href}
      target="_blank"
    >
      {logo ? (
        React.cloneElement(logo, {
          className:
            "aspect-[4/1] overflow-hidden rounded-lg object-contain object-center",
          height: 40,
          width: 160,
        })
      ) : src ? (
        <Image
          alt={alt}
          className="aspect-[4/1] overflow-hidden rounded-lg object-contain object-center"
          height={40}
          src={src}
          width={160}
        />
      ) : null}
      <p className="sr-only">{alt}</p>
    </Link>
  );
};

export default PartnerSponsor;
