import { cn } from "@/lib/utils";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/navigation";

export interface NavListItemProps {
  title: string;
  href: string;
}

const NavListItem = ({ title, href }: NavListItemProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
      </Link>
    </NavigationMenuLink>
  );
};

export default NavListItem;
