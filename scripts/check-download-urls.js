#!/usr/bin/env node

const fs = require("fs");
const https = require("https");
const http = require("http");
const { URL } = require("url");
const path = require("path");

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};

// Read downloads.json
const downloadsPath = path.join(__dirname, "..", "data", "downloads.json");
const downloadsData = JSON.parse(fs.readFileSync(downloadsPath, "utf8"));

// Extract all URLs from the nested structure
function extractUrls(obj, path = "") {
  const urls = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      urls.push({ url: value, path: currentPath });
    } else if (typeof value === "object" && value !== null) {
      urls.push(...extractUrls(value, currentPath));
    }
  }

  return urls;
}

// Check if URL is accessible
function checkUrl(urlInfo) {
  return new Promise((resolve) => {
    const url = new URL(urlInfo.url);
    const protocol = url.protocol === "https:" ? https : http;

    const options = {
      method: "HEAD",
      timeout: 10000,
      headers: {
        "User-Agent": "Rocky Linux URL Checker/1.0 (+https://rockylinux.org)",
      },
    };

    const req = protocol.request(url, options, (res) => {
      // Accept 2xx and 3xx status codes
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ ...urlInfo, status: "OK", statusCode: res.statusCode });
      } else {
        resolve({ ...urlInfo, status: "FAILED", statusCode: res.statusCode });
      }
    });

    req.on("error", (err) => {
      resolve({ ...urlInfo, status: "ERROR", error: err.message });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({ ...urlInfo, status: "TIMEOUT" });
    });

    req.end();
  });
}

// Progress bar
function updateProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  const barLength = 40;
  const filledLength = Math.round((current / total) * barLength);
  const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

  process.stdout.write(
    `\r${colors.blue}Checking URLs: [${bar}] ${percentage}% (${current}/${total})${colors.reset}`
  );
}

// Main execution
async function main() {
  console.log(
    `${colors.blue}Rocky Linux Download URL Checker${colors.reset}\n`
  );

  const urls = extractUrls(downloadsData);
  console.log(
    `Found ${colors.yellow}${urls.length}${colors.reset} URLs to check\n`
  );

  const results = [];
  const batchSize = 10;
  let processed = 0;

  // Process in batches to avoid overwhelming servers
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);

    processed += batch.length;
    updateProgress(processed, urls.length);

    // Small delay between batches
    if (i + batchSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Clear progress bar
  process.stdout.write("\r" + " ".repeat(80) + "\r");

  // Report results
  const failed = results.filter((r) => r.status !== "OK");
  const successful = results.filter((r) => r.status === "OK");

  console.log("\n" + colors.blue + "=" + "=".repeat(50) + colors.reset);
  console.log(`${colors.blue}URL Check Results${colors.reset}`);
  console.log(colors.blue + "=" + "=".repeat(50) + colors.reset + "\n");

  console.log(
    `Total URLs checked: ${colors.yellow}${results.length}${colors.reset}`
  );
  console.log(`Successful: ${colors.green}${successful.length}${colors.reset}`);
  console.log(`Failed: ${colors.red}${failed.length}${colors.reset}\n`);

  if (failed.length > 0) {
    console.log(`${colors.red}Failed URLs:${colors.reset}`);
    console.log(colors.red + "-".repeat(50) + colors.reset);

    failed.forEach((result) => {
      console.log(`\n${colors.yellow}Path:${colors.reset} ${result.path}`);
      console.log(`${colors.yellow}URL:${colors.reset} ${result.url}`);

      if (result.statusCode) {
        const statusColor =
          result.statusCode >= 400 ? colors.red : colors.yellow;
        console.log(
          `${colors.yellow}Status Code:${colors.reset} ${statusColor}${result.statusCode}${colors.reset}`
        );
      }

      if (result.error) {
        console.log(
          `${colors.yellow}Error:${colors.reset} ${colors.red}${result.error}${colors.reset}`
        );
      }

      if (result.status === "TIMEOUT") {
        console.log(
          `${colors.yellow}Error:${colors.reset} ${colors.red}Request timeout${colors.reset}`
        );
      }
    });

    // Create GitHub issue comment if running in GitHub Actions
    if (process.env.GITHUB_ACTIONS) {
      const summary =
        `## 🚨 URL Check Failed\n\n` +
        `Found ${failed.length} broken URL(s) in downloads.json:\n\n` +
        failed
          .map(
            (r) =>
              `- **${r.path}**: ${r.url} (${r.status}${r.statusCode ? " - " + r.statusCode : ""})`
          )
          .join("\n");

      fs.writeFileSync("url-check-summary.md", summary);
    }

    console.log(
      "\n" + colors.red + "Some URLs are not accessible!" + colors.reset
    );
    process.exit(1);
  } else {
    console.log(`${colors.green}✅ All URLs are accessible!${colors.reset}`);
  }

  // Show some statistics
  console.log(`\n${colors.gray}Response time distribution:${colors.reset}`);
  const statusCodes = {};
  successful.forEach((r) => {
    statusCodes[r.statusCode] = (statusCodes[r.statusCode] || 0) + 1;
  });

  Object.entries(statusCodes)
    .sort()
    .forEach(([code, count]) => {
      console.log(`  ${colors.gray}${code}: ${count} URLs${colors.reset}`);
    });
}

// Run the checker
main().catch((err) => {
  console.error(`${colors.red}Error running URL checker:${colors.reset}`, err);
  process.exit(1);
});
