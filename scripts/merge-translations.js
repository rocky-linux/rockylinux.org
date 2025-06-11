const fs = require("fs");
const path = require("path");

// Function to recursively merge objects, only adding new keys
function mergeDeep(target, source) {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          // Only add new keys that don't exist in target
          Object.assign(output, { [key]: source[key] });
        } else {
          // Recursively merge nested objects
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else if (!(key in target)) {
        // Only add new string keys that don't exist in target
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

// Read the source file (en-US.json)
const sourcePath = path.join(__dirname, "../messages/en-US.json");
const sourceContent = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

// Get all language files except en-US.json
const messagesDir = path.join(__dirname, "../messages");
const files = fs
  .readdirSync(messagesDir)
  .filter((file) => file.endsWith(".json") && file !== "en-US.json");

// Process each language file
files.forEach((file) => {
  const filePath = path.join(messagesDir, file);
  const targetContent = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Merge the content, only adding new keys
  const mergedContent = mergeDeep(targetContent, sourceContent);

  // Write back to file with proper formatting
  fs.writeFileSync(filePath, JSON.stringify(mergedContent, null, 2), "utf8");

  console.log(`Updated ${file}`);
});

console.log("All language files have been updated!");
