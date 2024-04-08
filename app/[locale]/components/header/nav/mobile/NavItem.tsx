import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";

export interface NavItemProps {
  title: string;
  href: string;
}

const NavItem = ({ title, href }: NavItemProps) => {
  return (
    <SheetClose asChild>
      <Link
        className="flex w-full items-center py-4 focus:text-primary border-b text-sm hover:underline"
        href={href}
      >
        {title}
      </Link>
    </SheetClose>
  );
};

export default NavItem;
