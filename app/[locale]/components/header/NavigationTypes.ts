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
    wiki: string;
    sponsors: string;
    partners: string;
  };
  resources: {
    docs: string;
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
