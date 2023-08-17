// @flow

const legacyCodeDisabledRules = {};

const legacyCodeWarningRules = {
  'no-prototype-builtins': 'warn',
  'no-redeclare': 'warn',
  'no-undef': 'warn',
  'no-unused-vars': 'warn',
  'no-useless-escape': 'warn',
  'prettier/prettier': 'warn',
};

const legacyCodeErrorRules = {
  'compat/compat': 'error',
};

const legacyTestCodeDisabledRules = {
  'mocha/no-mocha-arrows': 'off',
};

const legacyTestCodeWarningRules = {
  '@typescript-eslint/no-empty-function': 'warn',
  'mocha/no-setup-in-describe': 'warn',
};

const legacyTestCodeErrorRules = {};

const storiesDisabledRules = {};

const storiesWarningRules = {};

const storiesErrorRules = {};

const configFilesDisabledRules = {};

const configFilesWarningRules = {
  'prettier/prettier': 'warn',
};

const configFilesErrorRules = {};

const sourceCodeDisabledRules = {};

const sourceCodeWarningRules = {
  'prettier/prettier': 'warn',
  'no-undef': 'warn',
  'no-unused-vars': 'warn',
};

const sourceCodeErrorRules = {};

module.exports = {
  legacyCodeDisabledRules,
  legacyCodeWarningRules,
  legacyCodeErrorRules,
  legacyTestCodeDisabledRules,
  legacyTestCodeWarningRules,
  legacyTestCodeErrorRules,
  storiesDisabledRules,
  storiesWarningRules,
  storiesErrorRules,
  configFilesDisabledRules,
  configFilesWarningRules,
  configFilesErrorRules,
  sourceCodeDisabledRules,
  sourceCodeWarningRules,
  sourceCodeErrorRules,
}