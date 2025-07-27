# Technology Stack

## Core Technologies

### Framework & Runtime

- **Next.js 15.3** - React framework with App Router
- **React 19.1** - UI library
- **TypeScript 5.8** - Type-safe JavaScript
- **Node.js** - JavaScript runtime

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **Shadcn/UI Components** - Component library utilizing Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Tailwind class merging utility

### Internationalization

- **next-intl** - Next.js internationalization library
- **Crowdin** - Translation management platform
- Support for 34 languages

### Content & Data

- **gray-matter** - Front matter parser for Markdown
- **Unified/Remark/Rehype** - Markdown processing pipeline
- **bright** - Syntax highlighting
- **reading-time** - Article reading time calculation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Testing

- **Jest** - Unit testing framework
- **Playwright** - E2E testing framework
- **Testing Library** - React component testing

### Analytics

- **Plausible Analytics** - Privacy-focused analytics

## Component Libraries

### Radix UI Components Used

- Accordion
- Alert Dialog
- Checkbox
- Dialog
- Dropdown Menu
- Label
- Navigation Menu
- Popover
- Radio Group
- Select
- Separator
- Sheet
- Tabs
- Toggle
- Toggle Group
- Tooltip

### Custom Components

- Theme Provider
- Language Picker
- Logo variants
- Share buttons
- Navigation components
- Feature sections

## Build Tools

### Bundling & Compilation

- Next.js built-in Webpack configuration
- TypeScript compiler
- PostCSS with Tailwind CSS

### Asset Optimization

- Next.js Image optimization
- Font optimization with local fonts
- Automatic code splitting

## External Services

### Analytics

- Plausible Analytics

### Translation Management

- Crowdin integration for community translations

### Version Control & CI/CD

- Git for version control
- GitHub for repository hosting
- Automated workflows (details in deployment docs)

## Browser Support

Targets modern browsers with:

- ES2015+ JavaScript support
- CSS Grid and Flexbox
- CSS Custom Properties
- IntersectionObserver API

## Performance Budget

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90
- Bundle size targets per route
