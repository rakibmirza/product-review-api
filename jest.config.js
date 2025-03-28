module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 10000,
  detectOpenHandles: true,
  forceExit: true,
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};