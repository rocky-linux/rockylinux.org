#!/usr/bin/env node

// PreToolUse hook: block Claude from writing into paths that are cloned from
// rocky-linux/rockylinux.org-content at dev/build time. Files there are
// gitignored and overwritten on every fetch, so edits would be silently lost.
//
// Keep CONTENT_PATHS in sync with the content-repo entries in .gitignore and
// the output dirs in scripts/fetch-news-content.mjs.

import { readFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const CONTENT_PATHS = [
  "news",
  ".content-tmp",
  join("public", "images", "content"),
];

const input = JSON.parse(readFileSync(0, "utf8"));
const filePath = input.tool_input?.file_path ?? input.tool_input?.notebook_path;
if (!filePath) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd();
const rel = relative(projectDir, resolve(projectDir, filePath));

const blocked = CONTENT_PATHS.find(
  (dir) => rel === dir || rel.startsWith(dir + sep)
);

if (blocked) {
  console.error(
    `Blocked: ${rel} is under ${blocked}/, which is cloned from rocky-linux/rockylinux.org-content and overwritten on every fetch. ` +
      "Make content changes in a PR to that repo; only rendering code belongs in this repo."
  );
  process.exit(2);
}
