// @flow

const typescriptRules = require('./recommended-typescript-rules');

const env = {
  browser: true,
};

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

export { env, extend$ as extends, parser, parserOptions, plugins, rules, settings };
