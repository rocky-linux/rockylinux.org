import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";

export interface NavListItemProps {
  title: string;
  href: string;
}

const NavListItem = ({ title, href }: NavListItemProps) => {
  return (
    <SheetClose asChild>
      <Link
        className="flex w-full items-center py-2 focus:text-primary hover:underline"
        href={href}
      >
        {title}
      </Link>
    </SheetClose>
  );
};

export default NavListItem;
