# Known Issues

Tracked build warnings and known issues in the project that are not bugs in our code.

| Issue                                                                                  | Affected Package  | Severity | Details                                                       |
| -------------------------------------------------------------------------------------- | ----------------- | -------- | ------------------------------------------------------------- |
| [Webpack cache warning from next-intl extractor](#next-intl-extractor-webpack-warning) | next-intl >=4.8.0 | Cosmetic | [Full writeup](./known-issues/next-intl-extractor-warning.md) |

---

## next-intl extractor webpack warning

Since next-intl 4.8.0, the build emits webpack `PackFileCacheStrategy` warnings about parsing `extractor/format/index.js`. This is harmless and does not affect build output or runtime behavior. See the [full writeup](./known-issues/next-intl-extractor-warning.md) for details.

Last updated: 2026-03-16
