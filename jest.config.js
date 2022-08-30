module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
};
