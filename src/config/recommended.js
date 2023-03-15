// @flow

const commonConfig = require('./config/common-config');

const rules = {
  ...commonConfig.disabledRules,
  ...commonConfig.errorRules,
  ...commonConfig.warningRules,
};

// "extends" is an existing keyword, and so we use "extend$"
const extend$ = [
  'airbnb',
  'plugin:flowtype/recommended',
  'prettier',
  'plugin:prettier/recommended',
];

const plugins = ['flowtype', 'prettier'];

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
  rules,
  settings,
};
