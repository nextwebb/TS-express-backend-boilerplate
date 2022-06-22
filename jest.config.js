module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['lcov', 'html', 'text-summary'],
    testPathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/node_modules/',
      '<rootDir>/prisma/',
    ],
    coverageThreshold: {
      global: {
        statements: 65.24,
        branches: 42.29,
        functions: 59.89,
        lines: 63.05,
      },
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  