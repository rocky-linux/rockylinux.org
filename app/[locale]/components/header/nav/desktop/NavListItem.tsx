import { cn } from "@/lib/utils";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export interface NavListItemProps {
  title: string;
  href: string;
}

const NavListItem = ({ title, href }: NavListItemProps) => {
  return (
    <NavigationMenuLink
      title={title}
      href={href}
    >
      <a
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
      </a>
    </NavigationMenuLink>
  );
};

export default NavListItem;
