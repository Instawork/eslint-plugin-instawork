// @flow

// Default rules that aren't applicable to our projects
const disabledRules = {
  'instawork/flow-annotate': 'off',
};

// Additional rules we think are useful
const errorRules = {
  "@typescript-eslint/no-unused-vars": "error",
  // to enforce using type for object type definitions, can be type or interface 
  '@typescript-eslint/consistent-type-definitions': [
    'error',
    'type'
  ]
};


const rules = {
  ...disabledRules,
  ...errorRules,
};

// "extends" is an existing keyword, and so we use "extend$"
const extend$ = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'airbnb',
  'airbnb/hooks',
];

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
  env,
  extends: extend$,
  globals,
  plugins,
  parser,
  rules,
  settings,
};
