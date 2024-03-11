import { useTranslations } from "next-intl";
import Link from "next/link";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

import DarkModeToggle from "./components/header/DarkModeToggle";
import DesktopNavigation from "./components/header/DesktopNavigation";
import MobileNavigation from "./components/header/MobileNavigation";

import type { NavigationMenuItems } from "./components/header/NavigationTypes";

export default function Header() {
  const tGlobal = useTranslations("global");
  const tHeader = useTranslations("header");
  const tNav = useTranslations("header.nav");

  const navigationTranslations: NavigationMenuItems = {
    newsName: tNav("newsName"),
    aboutName: tNav("aboutName"),
    communityName: tNav("communityName"),
    supportName: tNav("supportName"),
    contributeName: tNav("contributeName"),
    about: {
      about: tNav("about.about"),
      charter: tNav("about.charter"),
      wiki: tNav("about.wiki"),
      partners: tNav("about.partners"),
      sponsors: tNav("about.sponsors"),
    },
    community: {
      forums: tNav("community.forums"),
      mailing: tNav("community.mailing"),
      mattermost: tNav("community.mattermost"),
      irc: tNav("community.irc"),
      calendar: tNav("community.calendar"),
    },
    support: {
      docs: tNav("support.docs"),
      submitBug: tNav("support.submitBug"),
      supportProviders: tNav("support.supportProviders"),
    },
    contribute: {
      contribute: tNav("contribute.contribute"),
      shop: tNav("contribute.shop"),
      donate: tNav("contribute.donate"),
    },
  };

  return (
    <header>
      <nav
        className="mx-auto flex items-center justify-between py-6 px-2 lg:px-0"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">{tGlobal("name")}</span>
            <Logo />
          </Link>
        </div>
        <MobileNavigation
          darkModeSRText={tHeader("toggleTheme")}
          openMainMenuSRText={tNav("openMainMenu")}
          rockyLinuxSRText={tGlobal("name")}
          downloadSRText={tGlobal("download")}
          translations={navigationTranslations}
        />
        <DesktopNavigation translations={navigationTranslations} />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <DarkModeToggle srText={tHeader("toggleTheme")} />
          <Link href="/download">
            <Button className="p-5 ml-2">{tGlobal("download")}</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
