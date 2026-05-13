#!/usr/bin/env node

// Build-time fetch of news markdown from rocky-linux/rockylinux.org-content.
// Wired into postinstall, prebuild, and predev in package.json.
//
// Environment overrides:
//   NEWS_CONTENT_REPO_URL    Override the upstream content repo URL.
//   NEWS_CONTENT_REPO_BRANCH Branch to clone (default: "main").
//   NEWS_FETCH_TIMEOUT_MS    Clone timeout in ms (default: 120000).
//   SKIP_NEWS_FETCH=1        Skip entirely (offline dev / debugging).

import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync, statSync } from "node:fs";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const parseTimeoutMs = (raw) => {
  if (raw === undefined) return 120_000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    console.error(
      `[fetch-news-content] invalid NEWS_FETCH_TIMEOUT_MS=${JSON.stringify(raw)} — must be a non-negative finite number.`,
    );
    process.exit(1);
  }
  return n;
};
const CLONE_TIMEOUT_MS = parseTimeoutMs(process.env.NEWS_FETCH_TIMEOUT_MS);

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

// Walk the allowlist and prefer a root-owned binary on Unix (these can't have
// been planted by a non-privileged attacker). Fall back to whichever candidate
// exists so Homebrew/Nix/user-managed toolchains aren't broken — the absolute
// path + locked PATH env on spawn is the real S4036 mitigation; the ownership
// check is defense-in-depth on top of that.
const findGitBin = () => {
  const candidates = SAFE_PATH_DIRS.map((dir) => join(dir, GIT_EXECUTABLE)).filter(
    existsSync,
  );
  if (candidates.length === 0) return null;
  if (process.platform === "win32") {
    return { path: candidates[0], rootOwned: true };
  }
  const rootOwned = candidates.find((c) => {
    try {
      return statSync(c).uid === 0;
    } catch {
      return false;
    }
  });
  return rootOwned
    ? { path: rootOwned, rootOwned: true }
    : { path: candidates[0], rootOwned: false };
};
const git = findGitBin();
const GIT_BIN = git?.path;

const log = (msg) => console.log(`[fetch-news-content] ${msg}`);
const err = (msg) => console.error(`[fetch-news-content] ${msg}`);

const fail = (msg, { cleanupTmp = true } = {}) => {
  err(msg);
  if (cleanupTmp) {
    try {
      rmSync(TMP_DIR, { recursive: true, force: true });
    } catch {
      // best effort — we're already failing
    }
  }
  process.exit(1);
};

// Route filesystem failures (rmSync, renameSync, statSync, etc.) through
// fail() so they surface as a clear "[fetch-news-content] …" line instead of
// a raw Node stack trace.
process.on("uncaughtException", (e) => {
  fail(`unexpected error: ${e?.message ?? e}`);
});

if (git && !git.rootOwned) {
  log(
    `warning: using ${git.path}, which is not root-owned. Acceptable for Homebrew/Nix toolchains, but CI/Vercel should resolve a root-owned binary.`,
  );
}

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
    `could not find ${GIT_EXECUTABLE} in ${SAFE_PATH}. Aborting.`,
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
