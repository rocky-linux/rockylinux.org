const path = require("path");

process.argv.slice(2).forEach((file) => {
  const basename = path.basename(file, path.extname(file));
  // Check if the file is a Storybook Markdown file
  const isStorybookMarkdown = basename.endsWith(".stories");
  if (basename.includes(".") && !isStorybookMarkdown) {
    console.error(
      `Invalid filename: ${file}. Filenames for .md and .mdx files should not contain dots, except for Storybook Markdown files (e.g., .stories.md or .stories.mdx).`
    );
    process.exit(1);
  }
});

console.log("All filenames are valid.");
