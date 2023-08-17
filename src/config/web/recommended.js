// @flow

const webTypescriptConfig = require('./recommended-typescript');
const javascriptRules = require('./recommended-javascript-rules');

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
  // Configuration files
  {
    files: ['./*.js'],
    env: {
      node: true,
    },
  },
  // ES module source code: overrides to be added
  {
    files: ['instawork/ui-webpack/src/**/*.js'],
    rules: {
      ...javascriptRules.sourceCodeDisabledRules,
      ...javascriptRules.sourceCodeWarningRules,
      ...javascriptRules.sourceCodeErrorRules,
    },
  },
  {
    ...webTypescriptConfig,
  },
  // Configuration
  {
    files: [
      'instawork/ui-webpack/webpack.*.js',
      'instawork/ui-webpack/*.conf.js',
      'instawork/ui-webpack/bundle-entries.js',
      'instawork/ui-webpack/test/bundle.js',
    ],
    env: {
      node: true,
    },
    rules: {
      ...javascriptRules.configFilesDisabledRules,
      ...javascriptRules.configFilesWarningRules,
      ...javascriptRules.configFilesErrorRules,
    },
  },
  // ignore console statements in storybook file and test files
  {
    files: [
      '*.stories.[jt]s?(x)',
      'stories.[jt]s?(x)',
      '*.test.[jt]s?(x)',
      // all files under any folder named test
      '**/test/**/*.[jt]s?(x)',
    ],
    rules: {
      ...javascriptRules.storiesDisabledRules,
      ...javascriptRules.storiesWarningRules,
      ...javascriptRules.storiesErrorRules,
    },
  },
  // Legacy test code
  {
    files: ['instawork/ui-webpack/src/**/*.spec.ts'],
    plugins: ['@typescript-eslint', 'mocha'],
    extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:mocha/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    env: {
      node: true,
      mocha: true,
    },
    rules: {
      ...javascriptRules.legacyTestCodeDisabledRules,
      ...javascriptRules.legacyTestCodeWarningRules,
      ...javascriptRules.legacyTestCodeErrorRules,
    },
  },
  // Legacy code
  {
    files: ['instawork/static/**/*.js', 'staff_scheduler/static/**/*.js'],
    plugins: ['compat'],
    env: {
      jquery: true,
    },
    globals: {
      Intercooler: 'readonly',
    },
    rules: {
      ...javascriptRules.legacyCodeDisabledRules,
      ...javascriptRules.legacyCodeWarningRules,
      ...javascriptRules.legacyCodeErrorRules,
    },
    settings: {
      polyfills: [
        // We have our own polyfill for Object.assign inside instawork/static/js/polyfills.js
        'Object.assign',

        // These are covered by Polyfill.js
        'Array.prototype.includes',
        'Promise',
      ],
    },
  },
];

module.exports = {
  parserOptions,
  env,
  extends: extend$,
  plugins,
  overrides,
};
