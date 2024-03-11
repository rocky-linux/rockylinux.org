export interface NavigationMenuItems {
  newsName: string;
  aboutName: string;
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
  community: {
    forums: string;
    mailing: string;
    mattermost: string;
    irc: string;
    calendar: string;
  };
  support: {
    docs: string;
    submitBug: string;
    supportProviders: string;
  };
  contribute: {
    contribute: string;
    shop: string;
    donate: string;
  };
}
