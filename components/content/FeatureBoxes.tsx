import { classNames } from "@/utils/classNames";
import LinkButton from "../buttons/LinkButton";
import { Children, cloneElement } from "react";

export interface FeatureBoxesProps {
  children?: React.ReactNode;
  className?: string;
}

export type FeatureBoxesComponent = FeatureBoxesProps & {
  Box?: typeof Box;
  Header?: typeof Header;
  HeaderText?: typeof HeaderText;
  HeaderIcon?: typeof HeaderIcon;
  Content?: typeof Content;
  CTA?: typeof CTA;
};

const FeatureBoxes = ({ children, className }: FeatureBoxesComponent) => {
  return (
    <div
      className={classNames(
        className ?? "",
        "grid lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-8"
      )}
    >
      {children}
    </div>
  );
};

export interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  order?: number;
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div
      className={classNames(
        className ?? "",
        "flex flex-col items-center justify-center"
      )}
    >
      {Children.map(children, (child, index) => {
        const oldStyle = (child as React.ReactElement<any>).props.style || {};
        const newStyle = { ...oldStyle, order: index };
        return cloneElement(child as React.ReactElement<any>, {
          style: newStyle,
        });
      })}
    </div>
  );
};

const Header = ({ children, className, order = 0 }: BoxProps) => {
  return (
    <dt
      style={{ order }}
      className={classNames(
        className ?? "",
        "flex flex-col text-lg font-bold leading-7 bg-gray-200 w-full text-center rounded-t-lg font-display"
      )}
    >
      {children}
    </dt>
  );
};

const HeaderIcon = ({ children, className, order = 1 }: BoxProps) => {
  return (
    <div
      style={{ order }}
      className={classNames(
        className ?? "",
        "-mt-6 flex items-center justify-center"
      )}
    >
      {children}
    </div>
  );
};

const HeaderText = ({ children, className, order = 2 }: BoxProps) => {
  return (
    <h2 style={{ order }} className={classNames(className ?? "", "mt-7")}>
      {children}
    </h2>
  );
};

const Content = ({ children, className, order = 3 }: BoxProps) => {
  return (
    <dd
      style={{ order }}
      className={classNames(
        className ?? "",
        "pt-1 flex flex-auto flex-col text-base leading-7 bg-gray-200 w-full text-center rounded-b-lg px-6 pb-8"
      )}
    >
      {children}
    </dd>
  );
};

export interface CTAProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
  order?: number;
}

const CTA = ({ children, className, href, order = 4 }: CTAProps) => {
  return (
    <LinkButton
      href={href}
      style={{ order }}
      className={classNames(className ?? "", "mt-4 sm:mt-8")}
    >
      {children}
    </LinkButton>
  );
};

FeatureBoxes.Box = Box;
FeatureBoxes.Header = Header;
FeatureBoxes.HeaderText = HeaderText;
FeatureBoxes.HeaderIcon = HeaderIcon;
FeatureBoxes.Content = Content;
FeatureBoxes.CTA = CTA;

export default FeatureBoxes;
