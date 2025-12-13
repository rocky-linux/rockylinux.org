import path from "path";

const buildEslintCommand = (filenames) => {
  const filesToLint = filenames.filter(
    (f) =>
      !f.includes("__mocks__") &&
      !f.includes("__tests__") &&
      !f.includes(".lintstagedrc.js")
  );

  if (filesToLint.length === 0) return "echo 'No files to lint'";

  return `eslint ${filesToLint
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;
};

const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"],
};

export default config;
