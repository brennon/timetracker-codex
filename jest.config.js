module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^uuid$': '<rootDir>/node_modules/uuid/dist/index.js',
  },
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
