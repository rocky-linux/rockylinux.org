# Project Structure

## Directory Overview

```
rockylinux.org/
├── app/                    # Next.js App Router pages and layouts
│   └── [locale]/          # Locale-based routing
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...               # Feature-specific components
├── lib/                   # Utility functions and data
├── utils/                 # Helper functions
├── public/               # Static assets
├── messages/             # Translation files
├── news/                 # Markdown blog posts
├── types/                # TypeScript type definitions
├── @types/               # Custom type declarations
└── docs/                 # Documentation (this folder)
```

## Detailed Structure

### `/app` Directory

The main application directory using Next.js App Router:

```
app/
├── [locale]/                     # Dynamic locale routing
│   ├── layout.tsx               # Root layout for locale
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About pages
│   │   ├── charter/
│   │   ├── code-of-conduct/
│   │   └── ...
│   ├── download/                # Download page with tabs
│   │   ├── page.tsx
│   │   └── components/          # Page-specific components
│   ├── news/                    # Blog/news section
│   │   ├── page.tsx            # News listing
│   │   └── [slug]/             # Individual news articles
│   └── ...                     # Other pages
├── globals.css                  # Global styles
├── layout.tsx                   # Root layout
└── not-found.tsx               # 404 page
```

### `/components` Directory

Organized by functionality:

```
components/
├── ui/                          # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── header.tsx                   # Site header
├── footer.tsx                   # Site footer
├── logo.tsx                     # Logo component
├── navigation/                  # Navigation components
│   ├── desktop-nav.tsx
│   └── mobile-nav.tsx
├── providers/                   # Context providers
│   └── theme-provider.tsx
└── sections/                    # Page sections
    ├── hero.tsx
    ├── feature-one.tsx
    └── ...
```

### `/lib` Directory

Core utilities and data:

```
lib/
├── navigation-items.ts          # Navigation menu structure
├── get-localized-metadata.ts    # SEO metadata helper
├── news-posts.ts               # Blog post utilities
├── utils.ts                    # General utilities
└── fonts.ts                    # Font configuration
```

### `/utils` Directory

Helper functions:

```
utils/
├── architectureDetection.ts     # System architecture detection
├── date.ts                     # Date formatting utilities
└── ...
```

### `/messages` Directory

Translation files for each locale:

```
messages/
├── en.json                     # English (base language)
├── es.json                     # Spanish
├── fr.json                     # French
└── ...                         # 34 languages total
```

### `/news` Directory

Markdown blog posts:

```
news/
├── 2024-11-25-rocky-linux-9-5-ga-release.md
├── 2024-10-15-rocky-linux-8-10-ga-release.md
└── ...
```

### `/public` Directory

Static assets:

```
public/
├── fonts/                      # Local font files
├── images/                     # Images and icons
│   ├── rocky-logo-*.svg       # Logo variants
│   └── ...
└── ...
```

### `/types` Directory

TypeScript type definitions:

```
types/
├── logo-cloud.ts              # Logo cloud types
├── news.ts                    # News/blog types
└── download.ts                # Download page types
```

## Key Files

### Configuration Files

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `jest.config.mjs` - Jest testing configuration
- `playwright.config.ts` - Playwright E2E configuration

### Package Files

- `package.json` - Dependencies and scripts
- `package-lock.json` - Locked dependency versions

### Development Files

- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.gitignore` - Git ignore rules
- `crowdin.yml` - Crowdin translation config

## Import Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
@ → /                           // Root directory
@/components → /components      // Components
@/lib → /lib                   // Libraries
@/utils → /utils               // Utilities
@/types → /types               // Types
```

Example usage:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `NavigationMenu.tsx`)
- **Utilities**: camelCase (e.g., `getLocalizedMetadata.ts`)
- **Types**: PascalCase for types, camelCase for files
- **Pages**: kebab-case directories, `page.tsx` for page files
- **Styles**: kebab-case (e.g., `globals.css`)

## Component Organization

1. **Page Components**: Located in `/app/[locale]/[page]/page.tsx`
2. **Shared Components**: Located in `/components`
3. **Page-Specific Components**: Located in `/app/[locale]/[page]/components/`
4. **UI Primitives**: Located in `/components/ui/`

## Data Flow

1. **Static Data**: Imported directly from files
2. **Translations**: Loaded via next-intl from `/messages`
3. **Blog Posts**: Parsed from `/news` Markdown files
4. **Navigation**: Centralized in `/lib/navigation-items.ts`
