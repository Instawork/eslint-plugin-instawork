// @flow

const typescriptRules = require('./recommended-typescript-rules');

const files = ['**/*.ts', '**/*.tsx'];

const plugins = ['@typescript-eslint'];

const extend$ = [
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'airbnb',
  'airbnb/hooks',
  'plugin:import/recommended',
  'plugin:import/typescript',
  'plugin:prettier/recommended',
];

const parser = '@typescript-eslint/parser';

const parserOptions = {
  ecmaVersion: 2021,
  sourceType: 'module',
};

const rules = {
  ...typescriptRules.disabledRules,
  ...typescriptRules.warnRules,
  ...typescriptRules.errorRules,
};

const settings = {
  'import/resolver': {
    typescript: {},
  },
};

module.exports = {
  files,
  plugins,
  extends: extend$,
  parser,
  parserOptions,
  rules,
  settings,
};
