#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync, statSync } from "node:fs";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CLONE_TIMEOUT_MS = Number(process.env.NEWS_FETCH_TIMEOUT_MS ?? 120_000);

const redactUrl = (url) => {
  try {
    const u = new URL(url);
    if (u.username || u.password) {
      u.username = "***";
      u.password = "";
    }
    return u.toString();
  } catch {
    return url;
  }
};

const CONTENT_REPO_URL =
  process.env.NEWS_CONTENT_REPO_URL ??
  "https://github.com/rocky-linux/rockylinux.org-content.git";
const CONTENT_REPO_BRANCH = process.env.NEWS_CONTENT_REPO_BRANCH ?? "main";

// Anchor paths to this script's location, not process.cwd(), so the script
// can't accidentally delete a `news/` directory in some other working dir.
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const TMP_DIR = resolve(REPO_ROOT, ".content-tmp");
const NEWS_DIR = resolve(REPO_ROOT, "news");

// Resolve `git` to an absolute path from a set of system-owned directories so
// the spawn cannot be hijacked by a binary in a user-writable directory the
// calling shell happens to have on its PATH (SonarCloud javascript:S4036).
const programFiles =
  process.env.ProgramFiles ?? String.raw`C:\Program Files`;
const programFilesX86 =
  process.env["ProgramFiles(x86)"] ?? String.raw`C:\Program Files (x86)`;
const SAFE_PATH_DIRS =
  process.platform === "win32"
    ? [
        join(process.env.SystemRoot ?? String.raw`C:\Windows`, "System32"),
        join(programFiles, "Git", "cmd"),
        join(programFiles, "Git", "bin"),
        join(programFilesX86, "Git", "cmd"),
        join(programFilesX86, "Git", "bin"),
      ]
    : ["/usr/local/bin", "/usr/bin", "/bin", "/opt/homebrew/bin"];
const SAFE_PATH = SAFE_PATH_DIRS.join(delimiter);
const GIT_EXECUTABLE = process.platform === "win32" ? "git.exe" : "git";

// On Unix, require the resolved binary to be root-owned so a user-writable
// directory in the allowlist (e.g. Homebrew's /usr/local/bin on Intel macOS)
// can't be the source of the binary we actually run. On Windows we rely on
// the ACLs that protect Program Files / System32 by default.
const isTrustedBin = (candidate) => {
  if (!existsSync(candidate)) return false;
  if (process.platform === "win32") return true;
  try {
    return statSync(candidate).uid === 0;
  } catch {
    return false;
  }
};

const GIT_BIN = SAFE_PATH_DIRS.map((dir) => join(dir, GIT_EXECUTABLE)).find(
  isTrustedBin,
);

const log = (msg) => console.log(`[fetch-news-content] ${msg}`);
const err = (msg) => console.error(`[fetch-news-content] ${msg}`);

const fail = (msg, { cleanupTmp = true } = {}) => {
  err(msg);
  if (cleanupTmp) {
    rmSync(TMP_DIR, { recursive: true, force: true });
  }
  process.exit(1);
};

if (process.env.SKIP_NEWS_FETCH === "1") {
  log("SKIP_NEWS_FETCH=1 — leaving news/ untouched.");
  process.exit(0);
}

if (!existsSync(join(REPO_ROOT, "package.json"))) {
  fail(
    `script appears to be running outside its repo (no package.json at ${REPO_ROOT}). Aborting.`,
    { cleanupTmp: false },
  );
}

if (!GIT_BIN) {
  fail(
    `could not find a trusted ${GIT_EXECUTABLE} in ${SAFE_PATH}. ` +
      `On Unix, the binary must be owned by root. Aborting.`,
    { cleanupTmp: false },
  );
}

rmSync(TMP_DIR, { recursive: true, force: true });

const redactedUrl = redactUrl(CONTENT_REPO_URL);
log(`cloning ${redactedUrl} (${CONTENT_REPO_BRANCH}) into ${TMP_DIR}`);
const clone = spawnSync(
  GIT_BIN,
  [
    "clone",
    "--depth",
    "1",
    "--branch",
    CONTENT_REPO_BRANCH,
    CONTENT_REPO_URL,
    TMP_DIR,
  ],
  {
    stdio: "inherit",
    env: { ...process.env, PATH: SAFE_PATH },
    timeout: CLONE_TIMEOUT_MS,
    killSignal: "SIGTERM",
  },
);

if (clone.error) {
  if (clone.error.code === "ETIMEDOUT") {
    fail(
      `git clone exceeded ${CLONE_TIMEOUT_MS}ms timeout — override with NEWS_FETCH_TIMEOUT_MS.`,
    );
  }
  fail(`failed to spawn git: ${clone.error.message}`);
}
if (clone.status === null) {
  fail(`git was terminated by ${clone.signal ?? "unknown signal"} before completing.`);
}
if (clone.status !== 0) {
  fail(`git clone failed (exit ${clone.status}). Set SKIP_NEWS_FETCH=1 to bypass for offline work.`);
}

const clonedNewsDir = resolve(TMP_DIR, "news");
if (!existsSync(clonedNewsDir)) {
  fail(`expected ${clonedNewsDir} to exist after clone but it does not.`);
}

// Only swap in the new content once we have a verified clone — this keeps
// the previous news/ intact if anything above fails.
rmSync(NEWS_DIR, { recursive: true, force: true });
renameSync(clonedNewsDir, NEWS_DIR);
rmSync(TMP_DIR, { recursive: true, force: true });

log(`news/ populated from ${redactedUrl}@${CONTENT_REPO_BRANCH}.`);
