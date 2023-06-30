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
        className =
          "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600";
        break;
      case "secondary":
        className =
          "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700";
        break;
      case "tertiary":
        className =
          "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900";
        break;
    }

    return className;
  }, [variant]);

  return { buttonVariantStyleClass };
};
