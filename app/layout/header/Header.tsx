import { useNavigation } from "@/hooks/useNavigation";

import HeaderContainer from "./HeaderContainer";
import TopHeaderBar from "./TopHeaderBar";
import NavigationContainer from "./NavigationContainer";
import Logo from "./Logo";
import MobileMenu from "./mobile/MobileMenu";
import DesktopMenu from "./desktop/DesktopMenu";

export default function Header() {
  const { navigation, mainNavigation, extraNavigation } = useNavigation();

  return (
    <HeaderContainer>
      <TopHeaderBar />
      <NavigationContainer>
        <Logo />
        <MobileMenu
          mainNavigation={mainNavigation}
          extraNavigation={extraNavigation}
        />
        <DesktopMenu navigation={navigation} />
      </NavigationContainer>
    </HeaderContainer>
  );
}
