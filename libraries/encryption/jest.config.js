/** @type {import('ts-jest').JestConfigWithTsJest} */
const commonConfig = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testMatch: ["**/test/**/*.test.(ts|js)", "**/src/**/*.test.(ts|js)"],
};

module.exports = {
  projects: [
    {
      ...commonConfig,
      testEnvironment: "node",
    },
    {
      ...commonConfig,
      preset: "jest-puppeteer",
    },
  ],
};
