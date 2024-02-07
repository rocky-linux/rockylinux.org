import { useTranslations } from "next-intl";

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
    resourcesName: tNav("resourcesName"),
    communityName: tNav("communityName"),
    supportName: tNav("supportName"),
    contributeName: tNav("contributeName"),
    about: {
      about: tNav("about.about"),
      charter: tNav("about.charter"),
      partners: tNav("about.partners"),
      sponsors: tNav("about.sponsors"),
    },
    resources: {
      faq: tNav("resources.faq"),
      guidesAndManuals: tNav("resources.guidesAndManuals"),
      gpgKeyInfo: tNav("resources.gpgKeyInfo"),
      wiki: tNav("resources.wiki"),
    },
    community: {
      forums: tNav("community.forums"),
      mailing: tNav("community.mailing"),
      mattermost: tNav("community.mattermost"),
      irc: tNav("community.irc"),
      calendar: tNav("community.calendar"),
    },
    support: {
      supportProviders: tNav("support.supportProviders"),
      submitBug: tNav("support.submitBug"),
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
        className="mx-auto flex items-center justify-between py-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href="#"
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">{tGlobal("name")}</span>
            <Logo />
          </a>
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
          <a href="/download">
            <Button className="p-5 ml-2">{tGlobal("download")}</Button>
          </a>
        </div>
      </nav>
    </header>
  );
}
