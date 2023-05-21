"use client";

import { useMenu } from "@/hooks/useMenu";

import { Dialog } from "@headlessui/react";

import { Navigation } from "@/types/Navigation";
import Logo from "../Logo";
import MobileMenuItem from "./MobileMenuItem";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export interface MobileMenuProps {
  mainNavigation: Navigation;
  extraNavigation: Navigation;
}

const MobileMenu = ({ mainNavigation, extraNavigation }: MobileMenuProps) => {
  const { open: mobileMenuOpen, openMenu, closeMenu } = useMenu(false);

  return (
    <>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={openMenu}
        >
          <span className="sr-only">Open Main Menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={closeMenu}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMenu}
            >
              <span className="sr-only">Close Menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {mainNavigation.map(item => (
                  <MobileMenuItem
                    key={item.href}
                    href={item.href}
                    name={item.name}
                  />
                ))}
              </div>
              <div className="py-6">
                {extraNavigation.map(item => (
                  <MobileMenuItem
                    key={item.href}
                    href={item.href}
                    name={item.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default MobileMenu;
