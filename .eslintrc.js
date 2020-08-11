module.exports = {
  extends: ['airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ["dist", "coverage"]
};