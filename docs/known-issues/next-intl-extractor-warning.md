# next-intl Extractor Webpack Cache Warning

## Summary

Starting with next-intl 4.8.0, the production build emits three identical warnings:

```
[webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of
.../node_modules/next-intl/dist/esm/production/extractor/format/index.js
for build dependencies failed at 'import(t)'.
Build dependencies behind this expression are ignored and might cause
incorrect cache invalidation.
```

These warnings are **cosmetic only** and do not affect the build output, runtime behavior, or application correctness.

## Root Cause

next-intl 4.8.0 introduced a message extractor feature (`useExtracted`) that supports custom codec loading via dynamic `import()`. The extractor's `format/index.js` contains a dynamic import where the argument is a variable:

```js
const n = await import(t);
```

Webpack's `FileSystemInfo` module parses ESM files to track build dependencies for persistent cache invalidation. It can only handle static string arguments in `import()` calls. When it encounters `import(t)` with a variable, it cannot determine the dependency statically, so it emits the warning and skips tracking that file for cache purposes.

## Why It Is Harmless

- The file lives in `node_modules` and does not change between builds unless the package version is updated, at which point the cache is invalidated anyway.
- The warning is about **cache invalidation accuracy**, not build correctness.
- The extractor feature is opt-in and not used by this project.

## Why It Cannot Be Suppressed

- Webpack's `ignoreWarnings` config only applies to compilation-phase warnings.
- This warning is emitted by webpack's infrastructure-level `PackFileCacheStrategy`, which runs before compilation and has no granular message filtering.
- `infrastructureLogging.level: 'error'` would suppress it but also hides all other infrastructure warnings, which is too broad.

## References

- [webpack Discussion #18071 - FileSystemInfo dynamic import() expects string?](https://github.com/orgs/webpack/discussions/18071)
- [webpack Issue #17865 - PackFileCacheStrategy/FileSystemInfo warnings](https://github.com/webpack/webpack/issues/17865)
- [next-intl Issue #2087 - Stabilize useExtracted](https://github.com/amannn/next-intl/issues/2087)
- [next-intl Discussion #2036 - useExtracted feedback](https://github.com/amannn/next-intl/discussions/2036)
- [next-intl useExtracted docs](https://next-intl.dev/docs/usage/extraction)

## Resolution

This will likely be resolved upstream in a future next-intl release if the extractor module is restructured to avoid variable-based dynamic imports, or in a future webpack version that handles this pattern more gracefully. No action is required on our side.

Last updated: 2026-03-16
