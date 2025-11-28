# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official Rocky Linux website built with Next.js 15, React 19, and TypeScript. The site supports 34 languages and provides download options for multiple architectures.

## Quick Start

```bash
npm install
npm run dev
```

## Key Commands

- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run e2e` - Run Playwright E2E tests

## Important Conventions

1. **TypeScript First** - All new code should be written in TypeScript
2. **Internationalization** - All user-facing text must use the i18n system
3. **Accessibility** - Follow WCAG 2.1 AA standards
4. **Component Structure** - Use the established shadcn/ui pattern for new components
5. **Testing** - Write tests for new features and bug fixes

## Key Features to Understand

1. **Download System** - Architecture detection and dynamic URL state management
2. **Internationalization** - 34 language support with next-intl
3. **News System** - Markdown-based blog with RSS feed
4. **Theme System** - Dark/light mode with next-themes

## Common Tasks

### Adding a New Page

1. Create the page in `/app/[locale]/your-page/page.tsx`
2. Add translations to `/messages/en.json` (and other locales)
3. Update navigation if needed in `/lib/navigation-items.ts`

### Adding a New Component

1. Create component in `/components/ui/` or `/components/`
2. Follow the existing component patterns
3. Include TypeScript types
4. Add to component exports if needed

### Working with Translations

1. Edit message files in `/messages/[locale].json`
2. Use `useTranslations` hook in components
3. Create the english translation in `/messages/en.json` (other locale translations are created automatically by Crowdin)

## Code Quality Standards

- Run `npm run lint` before committing
- Follow the existing code style
- Write meaningful commit messages
- Keep components small and focused
- Document complex logic

## Technical Documentation

Detailed technical documentation is available in the `/docs` folder:

- [Documentation Index](./docs/README.md)
- [i18n Caching and Locale Detection](./docs/i18n/caching-and-locale-detection.md) - Critical information about Vercel caching behavior with next-intl
