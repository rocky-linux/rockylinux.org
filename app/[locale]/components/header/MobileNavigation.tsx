"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

import DarkModeToggle from "./DarkModeToggle";
import NavItem from "./nav/mobile/NavItem";
import NavList from "./nav/mobile/NavList";
import NavListItem from "./nav/mobile/NavListItem";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import type { NavigationMenuItems } from "./NavigationTypes";
import type { Route } from "next";

export interface MobileNavigationProps {
  darkModeSRText: string;
  openMainMenuSRText: string;
  rockyLinuxSRText: string;
  downloadSRText: string;
  translations: NavigationMenuItems;
}

const MobileNavigation = ({
  darkModeSRText,
  openMainMenuSRText,
  rockyLinuxSRText,
  downloadSRText,
  translations: t,
}: MobileNavigationProps) => {
  return (
    <div className="flex lg:hidden">
      <Sheet>
        <DarkModeToggle srText={darkModeSRText} />
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="py-5 px-3 ml-2"
          >
            <span className="sr-only">{openMainMenuSRText}</span>
            <HamburgerMenuIcon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full"
        >
          <Link href={"/" as Route}>
            <Logo />
            <span className="sr-only">{rockyLinuxSRText}</span>
          </Link>
          <Accordion
            type="single"
            collapsible
          >
            <NavItem
              title={t.newsName}
              href="/news"
            />
            <NavList name={t.aboutName}>
              <NavListItem
                title={t.about.about}
                href="/about"
              />
              <NavListItem
                title={t.about.charter}
                href={"/about/charter" as Route}
              />
              <NavListItem
                title={t.about.wiki}
                href="https://wiki.rockylinux.org"
              />
              <NavListItem
                title={t.about.sponsors}
                href={"/about/sponsors" as Route}
              />
              <NavListItem
                title={t.about.partners}
                href={"/about/partners" as Route}
              />
            </NavList>
            <NavList name={t.communityName}>
              <NavListItem
                title={t.community.forums}
                href="https://forums.rockylinux.org"
              />
              <NavListItem
                title={t.community.mailing}
                href="https://lists.resf.org/"
              />
              <NavListItem
                title={t.community.mattermost}
                href="https://chat.rockylinux.org/"
              />
              <NavListItem
                title={t.community.irc}
                href="https://wiki.rockylinux.org/irc/"
              />
              <NavListItem
                title={t.community.calendar}
                href="https://calendar.google.com/calendar/u/0/embed?src=c_2e1oqh6t0i6sqhja5nu9lq8lgo@group.calendar.google.com"
              />
            </NavList>
            <NavList name={t.supportName}>
              <NavListItem
                title={t.support.docs}
                href="https://docs.rockylinux.org"
              />
              <NavListItem
                title={t.support.submitBug}
                href="https://bugs.rockylinux.org"
              />
              <NavListItem
                title={t.support.supportProviders}
                href={"/support/support-providers" as Route}
              />
            </NavList>
            <NavList name={t.contributeName}>
              <NavListItem
                title={t.contribute.contribute}
                href="https://wiki.rockylinux.org/contributing/"
              />
              <NavListItem
                title={t.contribute.shop}
                href={"/contribute/shop" as Route}
              />
              <NavListItem
                title={t.contribute.donate}
                href="https://rockylinux.z2systems.com/np/clients/rockylinux/donation.jsp"
              />
            </NavList>
          </Accordion>
          <div className="mt-auto">
            <Link href="/download">
              <SheetClose asChild>
                <Button className="p-5 w-full mt-4">{downloadSRText}</Button>
              </SheetClose>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
