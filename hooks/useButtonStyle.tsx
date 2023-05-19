import { useMemo } from "react";
import { ButtonVariant } from "@/constants/ButtonVariant";

import type { ButtonVariantType } from "@/types/ButtonType";

export interface ButtonStyleProps {
  variant?: ButtonVariantType;
}

export const useButtonStyle = ({
  variant = ButtonVariant.primary,
}: ButtonStyleProps) => {
  const buttonVariantStyleClass = useMemo(() => {
    let className = "";

    switch (variant) {
      case "primary":
        className = "bg-green-900";
        break;
      case "secondary":
        className = "bg-red-900";
        break;
      case "tertiary":
        className = "bg-blue-900";
        break;
    }

    return className;
  }, [variant]);

  return { buttonVariantStyleClass };
};
