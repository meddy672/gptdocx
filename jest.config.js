/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["<rootDir>/jest.globalSetup.js"],
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    './lib/**/*.ts',
    '**/*.{ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};