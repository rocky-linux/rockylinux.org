import { classNames } from "@/utils/classNames";

import type { ReactNode } from "react";

export interface PillProps {
  className?: string;
  children?: ReactNode;
}

const Pill = ({ className, children, ...rest }: PillProps) => {
  return (
    <span
      className={classNames(
        className ??
          "rounded-md bg-green-500/10 px-3 py-1 text-sm font-semibold leading-6 text-green-500 ring-1 ring-inset ring-green-500/10"
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

Pill.displayName = "Pill";

export default Pill;
