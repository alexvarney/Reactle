/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // The glob patterns Jest uses to detect test files (any x.test.js or x.spec.ts files in src will be matched)
  testMatch: ["<rootDir>/src/**/*.test.**"],
  //setupFiles: ['<rootDir>/src/test-utils/setupTests.ts'],
  coverageReporters: ["json-summary"],
};
