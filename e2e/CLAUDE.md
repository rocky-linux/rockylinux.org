# E2E Tests

## Before Writing Tests

Read [docs/e2e/testing-patterns.md](../docs/e2e/testing-patterns.md) for Playwright patterns and gotchas specific to this project (Radix UI portaled components, accessible selectors, etc.).

## Conventions

- Reusable selectors and helpers go in `e2e/utils/PageUtils.ts`
- Target components by accessible name (`getByRole` with `{ name }`) rather than generic roles or test IDs
