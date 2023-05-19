"use client";

import { ButtonVariant } from "@/constants/ButtonVariant";
import { useButtonStyle } from "@/hooks/useButtonStyle";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { classNames } from "@/utils/classNames";

import type { ButtonVariantType } from "@/types/ButtonType";

export interface ButtonProps {
  variant?: ButtonVariantType;
  disabled?: boolean;
  children?: React.ReactNode;
}

export type ButtonComponent = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonComponent>(
  (
    {
      variant = ButtonVariant.primary,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const { buttonVariantStyleClass } = useButtonStyle({
      variant,
    });

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        className={classNames(className ?? "", buttonVariantStyleClass)}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
