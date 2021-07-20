export default {
  bail: 0,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/*'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>/src/'],
};
