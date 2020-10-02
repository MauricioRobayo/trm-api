module.exports = {
  env: {
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['dist', 'coverage'],
};
