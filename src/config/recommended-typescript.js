// @flow

const commonConfig = require('./common-config');

// Default rules that aren't applicable to our projects
const disabledRules = {
  ...commonConfig.disabledRules,
  'instawork/flow-annotate': 'off',
};

// Additional rules we think are useful
const errorRules = {
  ...commonConfig.errorRules,
  // to enforce using type for object type definitions, can be type or interface
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/no-unused-vars': 'error',
};

const rules = {
  ...disabledRules,
  ...errorRules,
  ...commonConfig.warningRules,
};

const rootExtends = ['plugin:instawork/recommended'];

// "extends" is an existing keyword, and so we use "extend$"
const extend$ = [
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'airbnb',
  'airbnb/hooks',
];

const files = ['*.ts', '*.tsx'];

const plugins = ['@typescript-eslint', 'prettier'];

const parser = '@typescript-eslint/parser';

const env = {
  browser: true,
  jest: true,
};

const globals = {
  __DEV__: true,
  __TEST__: true,
};

const settings = {
  'import/resolver': {
    'babel-module': {},
  },
};

module.exports = {
  extends: rootExtends,
  overrides: [
    {
      env,
      extends: extend$,
      files,
      globals,
      parser,
      plugins,
      rules,
      settings,
    },
  ],
};
