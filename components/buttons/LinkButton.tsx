"use client";

import { ButtonVariant } from "@/constants/ButtonVariant";
import { useButtonStyle } from "@/hooks/useButtonStyle";
import { LinkHTMLAttributes, forwardRef } from "react";
import { classNames } from "@/utils/classNames";

import Link from "next-intl/link";

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
          className={classNames(className ?? "", buttonVariantStyleClass)}
          {...rest}
        >
          {children}
        </a>
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
