import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export interface NavItemProps {
  title: string;
  href: string;
}

const NavItem = ({ title, href }: NavItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={navigationMenuTriggerStyle()}
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavItem;
