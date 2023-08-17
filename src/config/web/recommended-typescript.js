// @flow

const typescriptRules = require('./recommended-typescript-rules');

const files = [
  'instawork/ui-webpack/src/**/*.ts',
  'apps/**/partner_react/**/*.ts',
  'apps/**/partner_react/**/*.tsx',
  'web_frontend/**/*.ts',
  'web_frontend/**/*.tsx',
  'marketing/ui/src/**/*.ts',
];

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

module.exports = {
  files,
  plugins,
  extends: extend$,
  parser,
  parserOptions,
  rules,
};
