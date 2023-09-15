import DesktopMenuItem from "./DesktopMenuItem";

import type { Navigation } from "@/types/Navigation";

export interface DesktopMenuProps {
  navigation: Navigation;
}

const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {navigation.map(item => (
        <DesktopMenuItem key={item.href} name={item.name} href={item.href} />
      ))}
    </div>
  );
};

export default DesktopMenu;
