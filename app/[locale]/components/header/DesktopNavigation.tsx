"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import NavItem from "./nav/desktop/NavItem";
import NavList from "./nav/desktop/NavList";
import NavListItem from "./nav/desktop/NavListItem";

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
            title={t.about.wiki}
            href="https://wiki.rockylinux.org"
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
            href="/support/support-providers"
          />
        </NavList>
        <NavList name={t.contributeName}>
          <NavListItem
            title={t.contribute.contribute}
            href="https://wiki.rockylinux.org/contributing/"
          />
          <NavListItem
            title={t.contribute.shop}
            href="/contribute/shop"
          />
          <NavListItem
            title={t.contribute.donate}
            href="https://rockylinux.z2systems.com/np/clients/rockylinux/donation.jsp"
          />
        </NavList>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
