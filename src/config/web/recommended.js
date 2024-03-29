// @flow

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
      'no-console': 'off',
    },
  },
];

module.exports = {
  env,
  extends: extend$,
  overrides,
  parserOptions,
  plugins,
};
