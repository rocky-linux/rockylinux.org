---
paths:
  - "app/[locale]/components/header/**"
  - "app/[locale]/Header.tsx"
---

# Header navigation

Header nav links are hardcoded separately in `DesktopNavigation.tsx` and `MobileNavigation.tsx` — change both. A new link also needs its label in `messages/en.json` (`header.nav.*`), `NavigationTypes.ts`, and `Header.tsx`. Details: the Navigation section of `docs/development/pages-and-navigation.md`.
