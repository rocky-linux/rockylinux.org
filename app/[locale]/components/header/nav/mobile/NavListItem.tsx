import { SheetClose } from "@/components/ui/sheet";
import { Route } from "next";
import Link from "next/link";

export interface NavListItemProps<T extends string> {
  title: string;
  href: Route<T> | URL;
}

const NavListItem = <T extends string>({
  title,
  href,
}: NavListItemProps<T>) => {
  return (
    <SheetClose asChild>
      <Link
        className="flex w-full items-center py-2 focus:text-primary hover:underline"
        href={href as Route<T>}
      >
        {title}
      </Link>
    </SheetClose>
  );
};

export default NavListItem;
