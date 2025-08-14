# Architecture Overview

The Rocky Linux website is built as a modern, performant web application using Next.js 15's App Router architecture.

## Core Architecture Principles

1. **Static First** - Most content is statically generated at build time
2. **Progressive Enhancement** - JavaScript enhances functionality but isn't required
3. **Mobile First** - Responsive design starting from mobile viewports
4. **Performance Focused** - Optimized assets, code splitting, and lazy loading
5. **Globally Accessible** - Full internationalization and accessibility support

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                         │
├─────────────────────────────────────────────────────────┤
│                    Next.js App Router                    │
├─────────────┬─────────────┬─────────────┬───────────────┤
│   Pages     │ Components  │   Lib/Utils │     Public    │
├─────────────┼─────────────┼─────────────┼───────────────┤
│   Locales   │   UI/UX     │   i18n      │    Assets     │
│   Routes    │   Layouts   │   Data      │    Fonts      │
│   Layouts   │   Shared    │   Helpers   │    Images     │
└─────────────┴─────────────┴─────────────┴───────────────┘
```

## Key Architectural Decisions

### 1. Next.js App Router

- Server Components by default for better performance
- File-based routing with locale support
- Built-in optimization features

### 2. Internationalization Strategy

- URL-based locale detection (`/en/`, `/es/`, etc.)
- Fallback to English for missing translations
- Integration with Crowdin for community translations

### 3. Content Management

- Markdown files for news/blog content
- Type-safe message files for UI translations
- Static generation for optimal performance

### 4. State Management

- URL state for shareable configurations (downloads page)
- Local storage for user preferences (theme)
- No global state management needed due to simple flows

### 5. Styling Architecture

- Tailwind CSS v4 with PostCSS
- Component variants with CVA
- CSS custom properties for theming
- Utility-first approach with component classes

## Data Flow

1. **Static Content**: Markdown files → Build time processing → Static HTML
2. **Translations**: JSON files → next-intl → Rendered content
3. **User Preferences**: Browser → Local storage → Theme/locale
4. **Downloads**: Architecture detection → URL state → Download links

## Security Considerations

- Content Security Policy headers
- No server-side data persistence
- All external assets verified
- HTTPS enforcement
- XSS protection through React

## Performance Optimizations

1. **Build Time**
   - Static generation of all pages
   - Image optimization
   - Font subsetting

2. **Runtime**
   - Code splitting by route
   - Lazy loading of components
   - Efficient bundle sizes

3. **Network**
   - CDN compatibility
   - Efficient caching strategies
   - Minimal external requests
