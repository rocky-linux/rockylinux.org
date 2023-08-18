import { classNames } from "@/utils/classNames";
import { type ReactNode, type HTMLAttributes, forwardRef } from "react";

export interface ContainerComponent extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerComponent>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          className ?? "",
          "mx-auto max-w-7xl px-6 lg:px-8"
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
