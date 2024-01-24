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
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    './lib/**/*.ts',
    '**/*.{ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};