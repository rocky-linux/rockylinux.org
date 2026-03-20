# Rocky Linux Website Documentation

Technical documentation for the Rocky Linux website codebase.

## Documentation Index

### Internationalization (i18n)

- [Caching and Locale Detection](./i18n/caching-and-locale-detection.md) - Deep dive into i18n caching issues with Vercel and next-intl, including root cause analysis and recommended solutions.

### End-to-End Testing (E2E)

- [Testing Patterns and Lessons Learned](./e2e/testing-patterns.md) - Playwright patterns for Radix UI components, accessible selectors, and portaled element handling.

### Upgrades

- [Next.js 16 Upgrade](./upgrades/next-16.md) - Migration from Next.js 15 to 16, including middleware→proxy rename, ESLint config changes, and Turbopack adoption.

### Decisions

- [ESLint 9 over Biome](./decisions/eslint-9-over-biome.md) - Why we stayed on ESLint 9 instead of migrating to Biome or ESLint 10.

### Known Issues

- [Known Issues Index](./known-issues.md) - Tracked build warnings and known issues that are not bugs in our code.

## Quick Links

- [Project README](../README.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [AI Assistant Instructions](../CLAUDE.md)

## Documentation Standards

When adding new documentation:

1. Use clear, descriptive headings
2. Include code examples where applicable
3. Link to external sources and references
4. Add entries to this index file
5. Include a "Last updated" date at the bottom of documents
