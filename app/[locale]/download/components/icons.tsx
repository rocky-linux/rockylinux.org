import type { SVGProps } from "react";

export {
  ComponentInstanceIcon,
  CubeIcon,
  DesktopIcon,
  LaptopIcon,
} from "@radix-ui/react-icons";

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const ServerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...base}
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="7"
      rx="2"
    />
    <rect
      x="3"
      y="14"
      width="18"
      height="7"
      rx="2"
    />
    <path d="M7 6.5h.01M7 17.5h.01" />
  </svg>
);

export const CloudIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...base}
    {...props}
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);
