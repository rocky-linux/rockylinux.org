#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const CONTENT_REPO_URL =
  process.env.NEWS_CONTENT_REPO_URL ??
  "https://github.com/rocky-linux/rockylinux.org-content.git";
const CONTENT_REPO_BRANCH = process.env.NEWS_CONTENT_REPO_BRANCH ?? "main";

const REPO_ROOT = process.cwd();
const TMP_DIR = resolve(REPO_ROOT, ".content-tmp");
const NEWS_DIR = resolve(REPO_ROOT, "news");

const log = (msg) => console.log(`[fetch-news-content] ${msg}`);
const err = (msg) => console.error(`[fetch-news-content] ${msg}`);

if (process.env.SKIP_NEWS_FETCH === "1") {
  log("SKIP_NEWS_FETCH=1 — leaving news/ untouched.");
  process.exit(0);
}

rmSync(NEWS_DIR, { recursive: true, force: true });
rmSync(TMP_DIR, { recursive: true, force: true });

log(`cloning ${CONTENT_REPO_URL} (${CONTENT_REPO_BRANCH}) into ${TMP_DIR}`);
const clone = spawnSync(
  "git",
  [
    "clone",
    "--depth",
    "1",
    "--branch",
    CONTENT_REPO_BRANCH,
    CONTENT_REPO_URL,
    TMP_DIR,
  ],
  { stdio: "inherit" },
);

if (clone.status !== 0) {
  err(`git clone failed (exit ${clone.status}). Set SKIP_NEWS_FETCH=1 to bypass for offline work.`);
  process.exit(1);
}

const clonedNewsDir = resolve(TMP_DIR, "news");
if (!existsSync(clonedNewsDir)) {
  err(`expected ${clonedNewsDir} to exist after clone but it does not.`);
  rmSync(TMP_DIR, { recursive: true, force: true });
  process.exit(1);
}

renameSync(clonedNewsDir, NEWS_DIR);
rmSync(TMP_DIR, { recursive: true, force: true });
log(`news/ populated from ${CONTENT_REPO_URL}@${CONTENT_REPO_BRANCH}.`);
