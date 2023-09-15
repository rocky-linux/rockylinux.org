import Link from "next-intl/link";

import type { NavigationItem } from "@/types/Navigation";

const DesktopMenuItem = ({ name, href }: NavigationItem) => {
  return (
    <Link href={href} className="text-sm font-semibold leading-6 text-gray-900">
      {name}
    </Link>
  );
};

export default DesktopMenuItem;
