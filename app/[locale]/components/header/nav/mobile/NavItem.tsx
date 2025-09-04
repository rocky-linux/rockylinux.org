import { SheetClose } from "@/components/ui/sheet";
import { Route } from "next";
import Link from "next/link";

export interface NavItemProps<T extends string> {
  title: string;
  href: Route<T> | URL;
}

const NavItem = <T extends string>({ title, href }: NavItemProps<T>) => {
  return (
    <SheetClose asChild>
      <Link
        className="flex w-full items-center py-4 focus:text-primary border-b text-sm hover:underline"
        href={href as Route<T>}
      >
        {title}
      </Link>
    </SheetClose>
  );
};

export default NavItem;
