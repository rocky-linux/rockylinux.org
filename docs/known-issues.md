# Known Issues

Tracked build warnings and known issues in the project that are not bugs in our code.

| Issue                                                                                   | Affected Package            | Severity | Details                                                       |
| --------------------------------------------------------------------------------------- | --------------------------- | -------- | ------------------------------------------------------------- |
| [Webpack cache warning from next-intl extractor](#next-intl-extractor-webpack-warning)  | next-intl >=4.8.0           | Cosmetic | [Full writeup](./known-issues/next-intl-extractor-warning.md) |
| [react-hooks/incompatible-library disabled](#react-hooks-incompatible-library-disabled) | eslint-config-next >=16.0.0 | Disabled | Re-enable when adopting React Compiler                        |

---

## next-intl extractor webpack warning

Since next-intl 4.8.0, the build emits webpack `PackFileCacheStrategy` warnings about parsing `extractor/format/index.js`. This is harmless and does not affect build output or runtime behavior. See the [full writeup](./known-issues/next-intl-extractor-warning.md) for details.

## react-hooks/incompatible-library disabled

The `react-hooks/incompatible-library` ESLint rule (shipped with `eslint-config-next@16`) warns when third-party hooks return values that React Compiler cannot safely memoize. TanStack Table's `useReactTable` triggers this warning.

Since this project does not use React Compiler, the rule is disabled globally in `eslint.config.mjs`. **When adopting React Compiler, re-enable this rule** by removing the `"react-hooks/incompatible-library": "off"` line and addressing any warnings — they indicate components that React Compiler will skip memoizing, which could lead to stale UI.

Last updated: 2026-03-16
