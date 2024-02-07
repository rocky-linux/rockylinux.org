import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^test-utils": "<rootDir>/@types/test-utils/test-utils.tsx",
  },
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
    "!<rootDir>/i18n.ts",
    "!<rootDir>/middleware.ts",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
