module.exports = {
  "*.{js,jsx,ts,tsx}": ["next lint", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
  "*.{test,spec}.{js,jsx,ts,tsx}": ["jest --findRelatedTests --bail"],
};
