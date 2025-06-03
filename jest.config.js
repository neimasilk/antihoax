module.exports = {
  // Look for test files in the 'tests' directory at the root level
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],
  // Environment in which the tests should run
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.js', // Collect coverage from source files
    '!src/app.js', // Exclude app.js for now as it's not implemented
  ],
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover'
  ],
  // Setup files to run before each test file
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // if you have a setup file
};
