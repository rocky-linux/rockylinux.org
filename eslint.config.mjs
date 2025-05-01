import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      "**/typings/",
      "**/public/",
      "**/scripts/",
      "**/__mocks__/**",
      "**/__tests__/**",
      ".lintstagedrc.js",
    ],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    settings: { next: { rootDir: __dirname } },
  }),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: { ...globals.jest },
    },
    plugins: {
      react,
      reactHooks,
      "@typescript-eslint": typescriptPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-undef": "off", // TypeScript handles this
      "no-duplicate-imports": "error",
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
      "react/jsx-no-literals": ["warn", { noStrings: true, ignoreProps: true }],
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: { ...globals.jest },
    },
    plugins: { react, reactHooks, "@next/next": nextPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      "no-console": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-undef": "error",
      "no-duplicate-imports": "error",
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
      "react/jsx-no-literals": ["warn", { noStrings: true, ignoreProps: true }],
    },
  },
];

export default eslintConfig;
