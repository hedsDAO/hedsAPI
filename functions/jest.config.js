/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '\\.js$': './custom-transformer.js',
  },
  // modulePathIgnorePatterns: ['<rootDir>/test/'],
};
