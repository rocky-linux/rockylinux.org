export interface NavigationMenuItems {
  newsName: string;
  aboutName: string;
  resourcesName: string;
  communityName: string;
  supportName: string;
  contributeName: string;
  about: {
    about: string;
    charter: string;
    sponsors: string;
    partners: string;
  };
  resources: {
    faq: string;
    wiki: string;
    guidesAndManuals: string;
    gpgKeyInfo: string;
  };
  community: {
    forums: string;
    mailing: string;
    mattermost: string;
    irc: string;
    calendar: string;
  };
  support: {
    supportProviders: string;
    submitBug: string;
  };
  contribute: {
    contribute: string;
    shop: string;
    donate: string;
  };
}
