module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --write"],
  "*.{json,css}": ["prettier --write"],
  "*.{md,mdx}": [
    "node ./scripts/precomit-check-md-filenames.js",
    "prettier --write",
  ],
  "*.{test,spec}.{js,jsx,ts,tsx}": ["jest --findRelatedTests --bail"],
};
