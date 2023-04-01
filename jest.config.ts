export default {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: false,
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.ts"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testTimeout: 30000
};