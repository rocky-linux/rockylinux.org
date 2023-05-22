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
        className={classNames(
          className ?? "relative group",
          buttonVariantStyleClass
        )}
        {...rest}
      >
        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full bg-black group-hover:top-0.5 group-hover:left-0.5 duration-500 transition-all rounded-md"></span>
        <span className="fold-bold relative inline-block h-full w-full border-2 border-black bg-white px-3 py-1 text-base font-semibold text-black transition duration-100 hover:bg-green-500 hover:text-white rounded-md">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
