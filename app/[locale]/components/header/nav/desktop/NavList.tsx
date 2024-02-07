import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import type { ReactNode } from "react";

export interface NavListProps {
  name: string;
  children?: ReactNode;
}

const NavList = ({ name, children }: NavListProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-[250px] p-4">{children}</ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default NavList;
