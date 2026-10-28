#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const GPG_SEARCH_DIRS = [
  "/usr/bin",
  "/bin",
  "/usr/local/bin",
  "/opt/homebrew/bin",
];

const FILE = "public/.well-known/security.txt";
const KEY = "public/security-pgp-key.asc";
const FINGERPRINT = "F4C0847D7089F5B9B827E66F327541AF5CE5F44B";
const WARN_DAYS = 60;

const failures = [];

function checkExpires(contents) {
  const matches = contents.match(/^Expires:\s*(\S+)\s*$/gim) || [];
  if (matches.length === 0) {
    failures.push("No `Expires` field found. RFC 9116 requires exactly one.");
    return;
  }
  if (matches.length > 1) {
    failures.push(
      `Found ${matches.length} \`Expires\` fields. RFC 9116 allows exactly one.`
    );
    return;
  }

  const value = matches[0].replace(/^Expires:\s*/i, "").trim();
  const expires = new Date(value);
  if (Number.isNaN(expires.getTime())) {
    failures.push(`\`Expires\` is not a valid RFC 3339 date: \`${value}\``);
    return;
  }

  const days = Math.floor((expires.getTime() - Date.now()) / 86400000);
  if (days < 0) {
    failures.push(
      `\`Expires\` passed ${Math.abs(days)} day(s) ago (${value}). The file is stale and must be re-signed.`
    );
  } else if (days <= WARN_DAYS) {
    failures.push(
      `\`Expires\` is in ${days} day(s) (${value}), within the ${WARN_DAYS}-day window. Update the date and re-sign.`
    );
  } else {
    console.log(`Expires in ${days} day(s) (${value})`);
  }
}

function resolveGpg() {
  for (const dir of GPG_SEARCH_DIRS) {
    const candidate = path.join(dir, "gpg");
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`gpg not found in: ${GPG_SEARCH_DIRS.join(", ")}`);
}

function checkSignature() {
  const gpgBin = resolveGpg();
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "sec-txt-"));
  try {
    fs.chmodSync(home, 0o700);
    const gpg = (args) =>
      execFileSync(gpgBin, ["--batch", "--homedir", home, ...args], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });

    gpg(["--import", KEY]);

    let output;
    try {
      output = gpg(["--status-fd", "1", "--verify", FILE]);
    } catch (err) {
      failures.push(
        `Signature on ${FILE} failed to verify. Re-sign with \`gpg --clearsign -u ${FINGERPRINT}\`.\n\n\`\`\`\n${(err.stderr || "").trim()}\n\`\`\``
      );
      return;
    }

    const signer = output.match(/VALIDSIG ([0-9A-F]{40})/);
    if (!signer) {
      failures.push(`Could not determine the signing key for ${FILE}.`);
    } else if (signer[1] !== FINGERPRINT) {
      failures.push(
        `${FILE} is signed by \`${signer[1]}\`, expected \`${FINGERPRINT}\`.`
      );
    } else {
      console.log(`Good signature from ${FINGERPRINT}`);
    }
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
}

for (const f of [FILE, KEY]) {
  if (!fs.existsSync(f)) {
    console.error(`Missing required file: ${f}`);
    process.exit(1);
  }
}

const contents = fs.readFileSync(FILE, "utf8");
checkExpires(contents);
checkSignature();

if (failures.length > 0) {
  const summary = [
    "## security.txt check failed",
    "",
    ...failures.map((f) => `- ${f}`),
    "",
    `Checked \`${FILE}\` against \`${KEY}\`.`,
  ].join("\n");

  console.error(`\n${summary}`);
  fs.writeFileSync("security-txt-summary.md", `${summary}\n`);
  process.exit(1);
}

console.log("security.txt checks passed.");
