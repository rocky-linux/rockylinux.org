import Link from "next/link";

import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export interface NavItemProps {
  title: string;
  href: string;
}

const NavItem = ({ title, href }: NavItemProps) => {
  return (
    <NavigationMenuItem>
      <Link
        href={href}
        className={navigationMenuTriggerStyle()}
      >
        {title}
      </Link>
    </NavigationMenuItem>
  );
};

export default NavItem;
