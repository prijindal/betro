/** @type {import('jest').Config} */
const commonConfig = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.ts"],
  testMatch: ["**/test/**/*.test.(ts|js)", "**/src/**/*.test.(ts|js)"],
};

module.exports = {
  coverageDirectory: ".nyc_output",
  coverageReporters: [
    "json"
  ],
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
