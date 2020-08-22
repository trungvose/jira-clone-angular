module.exports = {
  name: 'api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/api',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};
