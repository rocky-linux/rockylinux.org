"use client";

import { classNames } from "@/utils/classNames";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef, type ReactNode } from "react";

import { HiExternalLink } from "react-icons/hi";

export interface LinkComponent
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  className?: string;
  iconClassName?: string;
}

const Link = forwardRef<HTMLAnchorElement, LinkComponent>(
  ({ children, className, iconClassName, target, ...rest }, ref) => {
    const isExternal = target === "_blank";

    return (
      <NextLink
        ref={ref}
        target={target}
        className={classNames(
          className ?? "",
          "flex items-center gap-x-1 text-green-600 underline text-sm font-medium"
        )}
        {...rest}
      >
        {isExternal && (
          <HiExternalLink
            className={classNames(iconClassName ?? "", "w-5 h-5")}
          />
        )}
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
