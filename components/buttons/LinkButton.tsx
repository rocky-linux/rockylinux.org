"use client";

import { ButtonVariant } from "@/constants/ButtonVariant";
import { useButtonStyle } from "@/hooks/useButtonStyle";
import { forwardRef, LinkHTMLAttributes } from "react";
import { classNames } from "@/utils/classNames";

import Link from "next/link";

import type { ButtonVariantType } from "@/types/ButtonType";

export interface ButtonProps {
  href: string;
  variant?: ButtonVariantType;
  children?: React.ReactNode;
}

export type ButtonComponent = ButtonProps &
  LinkHTMLAttributes<HTMLAnchorElement>;

const LinkButton = forwardRef<HTMLAnchorElement, ButtonComponent>(
  (
    { href, variant = ButtonVariant.primary, className, children, ...rest },
    ref
  ) => {
    const { buttonVariantStyleClass } = useButtonStyle({
      variant,
    });

    return (
      <Link href={href} legacyBehavior>
        <a
          ref={ref}
          className={classNames(
            className ?? "relative group rounded-md",
            buttonVariantStyleClass
          )}
          {...rest}
        >
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full bg-black group-hover:top-0.5 group-hover:left-0.5 duration-500 transition-all rounded-md"></span>
          <span className="fold-bold relative inline-block h-full w-full border-2 border-black bg-white px-3 py-1 text-sm font-semibold text-black transition duration-100 hover:bg-green-500 hover:text-white rounded-md">
            {children}
          </span>
        </a>
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
