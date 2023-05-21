import Link from "next/link";

import type { NavigationItem } from "@/types/Navigation";

const MobileMenuItem = ({ name, href }: NavigationItem) => {
  return (
    <Link
      href={href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >
      {name}
    </Link>
  );
};

export default MobileMenuItem;
