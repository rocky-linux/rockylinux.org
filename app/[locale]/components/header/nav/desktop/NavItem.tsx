import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import type { Route } from "next";

export interface NavItemProps<T extends string> {
  title: string;
  href: Route<T> | URL;
}

const NavItem = <T extends string>({ title, href }: NavItemProps<T>) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href as Route<T>}
          className={navigationMenuTriggerStyle()}
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavItem;
