import type React from "react";

export interface NavigationItem {
  name: string | React.JSX.Element;
  href: string;
}

export type Navigation = NavigationItem[];
