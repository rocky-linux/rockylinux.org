"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavItem from "./components/header/nav/desktop/NavItem";
import NavList from "./components/header/nav/desktop/NavList";
import NavListItem from "./components/header/nav/desktop/NavListItem";

import type { NavigationMenuItems } from "./NavigationTypes";

export interface DesktopNavigationProps {
  translations: NavigationMenuItems;
}

const DesktopNavigation = ({ translations: t }: DesktopNavigationProps) => {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
