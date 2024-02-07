"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

import DarkModeToggle from "./components/header/DarkModeToggle";
import NavItem from "./components/header/nav/mobile/NavItem";
import NavList from "./components/header/nav/mobile/NavList";
import NavListItem from "./components/header/nav/mobile/NavListItem";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import type { NavigationMenuItems } from "./NavigationTypes";

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
          <a href="/">
            <Logo />
            <span className="sr-only">{rockyLinuxSRText}</span>
          </a>
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
                href="/about/charter"
              />
              <NavListItem
                title={t.about.sponsors}
                href="/about/sponsors"
              />
              <NavListItem
                title={t.about.partners}
                href="/about/partners"
              />
            </NavList>
            <NavList name={t.resourcesName}>
              <NavListItem
                title={t.resources.faq}
                href="/resources/faq"
              />
              <NavListItem
                title={t.resources.guidesAndManuals}
                href="/resources/guides-and-manuals"
              />
              <NavListItem
                title={t.resources.gpgKeyInfo}
                href="/resources/gpg-key-info"
              />
              <NavListItem
                title={t.resources.wiki}
                href="/resources/wiki"
              />
            </NavList>
            <NavList name={t.communityName}>
              <NavListItem
                title={t.community.forums}
                href="/community/forums"
              />
              <NavListItem
                title={t.community.mailing}
                href="/community/mailing"
              />
              <NavListItem
                title={t.community.mattermost}
                href="/community/mattermost"
              />
              <NavListItem
                title={t.community.irc}
                href="/community/irc"
              />
              <NavListItem
                title={t.community.calendar}
                href="/community/calendar"
              />
            </NavList>
            <NavList name={t.supportName}>
              <NavListItem
                title={t.support.supportProviders}
                href="/support/support-providers"
              />
              <NavListItem
                title={t.support.submitBug}
                href="/support/submit-bug"
              />
            </NavList>
            <NavList name={t.contributeName}>
              <NavListItem
                title={t.contribute.contribute}
                href="/contribute/contribute"
              />
              <NavListItem
                title={t.contribute.shop}
                href="/contribute/shop"
              />
              <NavListItem
                title={t.contribute.donate}
                href="/contribute/donate"
              />
            </NavList>
          </Accordion>
          <div className="mt-auto">
            <a href="/download">
              <Button className="p-5 w-full mt-4">{downloadSRText}</Button>
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
