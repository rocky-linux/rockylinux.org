import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

const eslintConfig = defineConfig([
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/typings/",
    "**/public/",
    "scripts/**",
    "**/__mocks__/**",
    "**/__tests__/**",
    ".lintstagedrc.js",
    "next.config.mjs",
    "global.d.ts",
    "jest.setup.js",
  ]),
  ...nextVitals,
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
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      "no-console": "off",
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
    rules: {
      ...js.configs.recommended.rules,
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
]);

export default eslintConfig;
