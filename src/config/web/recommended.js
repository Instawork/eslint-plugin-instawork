// @flow

const webTypescriptConfig = require('./recommended-typescript');

const parserOptions = {
  ecmaVersion: 12,
  sourceType: 'module',
};

const env = {
  browser: true,
};

const plugins = ['unicorn', 'prettier'];

const extend$ = [
  'eslint:recommended',
  'plugin:prettier/recommended',
  'plugin:storybook/recommended',
];

const overrides = [
  {
    ...webTypescriptConfig,
  },
];

module.exports = {
  parserOptions,
  env,
  extends: extend$,
  plugins,
  overrides,
};
