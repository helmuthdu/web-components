const esModules = [].join('|');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/packages/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|less|s(c|a)ss)$': 'identity-obj-proxy'
  }
};
