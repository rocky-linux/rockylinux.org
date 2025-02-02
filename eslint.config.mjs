import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/typings/", "**/public/", "**/scripts/"],
  },
  ...compat.extends("eslint:recommended", "next/core-web-vitals"),
  {
    plugins: {
      react,
      reactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    rules: {
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

      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [">", "}"],
        },
      ],

      "react/jsx-no-literals": [
        "warn",
        {
          noStrings: true,
          ignoreProps: true,
        },
      ],
    },
  },
];
