import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^test-utils": "<rootDir>/@types/test-utils/test-utils.tsx",
    "^next-intl$": "<rootDir>/__mocks__/next-intl.tsx",
    "^next-intl/plugin$": "<rootDir>/__mocks__/next-intl/plugin.js",
    "^next-intl/(.*)$": "<rootDir>/__mocks__/next-intl.tsx",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true },
          transform: { react: { runtime: "automatic" } },
          target: "es2022",
          loose: true,
        },
        module: { type: "commonjs" },
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next-intl)/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  modulePathIgnorePatterns: ["<rootDir>/e2e/"],
  passWithNoTests: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/jest.config.js",
    "!**/jest.setup.js",
    "!**/types/**",
    "!**/@types/**",
    "!**/next-env.d.ts",
    "!**/next.config.js",
    "!**/jest.config.mjs",
    "!<rootDir>/tailwind.config.ts",
    "!**/postcss.config.js",
    "!**/layout.{ts,tsx,js,jsx}",
    "!<rootDir>/e2e/**",
    "!<rootDir>/i18n.ts",
    "!<rootDir>/middleware.ts",
  ],
  // Prevent Jest from using Babel
  transformIgnorePatterns: [
    "node_modules/(?!(@swc/jest|next-intl)/)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
