const path = require("path");

process.argv.slice(2).forEach((file) => {
  const basename = path.basename(file, path.extname(file));
  if (basename.includes(".")) {
    console.error(
      `Invalid filename: ${file}. Filenames for .md and .mdx files should not contain dots.`
    );
    process.exit(1);
  }
});

console.log("All filenames are valid.");
