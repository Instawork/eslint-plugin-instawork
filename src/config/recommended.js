// @flow

// Default rules that aren't applicable to our projects
const disabledRules = {
  'import/extensions': 'off',
  'import/first': 'off',
  'import/no-unresolved': 'off',
  'import/prefer-default-export': 'off',

  // Forcing tracking everywhere is probably not a good idea; it adds maintenance for not much
  // benefit. Should instead add tracking as required by funnel maintainers' requirements.
  'instawork/require-tracking': 'off',

  'no-console': 'off',
  'no-constant-condition': 'off',
  'react/jsx-filename-extension': 'off',
  'react/prefer-stateless-function': 'off',
  'react/sort-comp': 'off',
};

// Additional rules we think are useful
const errorRules = {
  'brace-style': ['error', '1tbs', { allowSingleLine: false }],
  curly: ['error', 'all'],
  'flowtype/semi': 'error',
  'flowtype/space-before-type-colon': 'error',
  'instawork/component-methods-use-arrows': 'error',
  'instawork/exact-object-types': 'error',
  'instawork/flow-annotate': 'error',
  'instawork/localization-namespace': 'error',
  'instawork/localization-string-key': 'error',
  'instawork/screen-actions-props-function': 'error',
  'instawork/screen-actions-props-return-action': 'error',
  'instawork/screen-selectors-props-function': 'error',
  'prettier/prettier': 'error',
  'sort-imports': 'error',
};

// These should be "error", but are now set to "warn" until we fix linting issues in all projects
const warningRules = {
  'import/no-extraneous-dependencies': [
    'warn',
    {
      devDependencies: [
        '**/*.stories.js',
        '**/*.test.js',
        '**/stories.js',
        'scripts/*',
        'scripts/*/*',
        'scripts/*/*/*',
        'storybook/*',
        'test',
        'test/*',
        'test/**/*',
      ],
    },
  ],
  'instawork/deprecate-bound': 'warn',
  'instawork/deprecate-components': 'warn',
  'instawork/deprecate-stateless': 'warn',
  'instawork/import-components': 'warn',
  'instawork/import-modules': 'warn',
  'instawork/import-overlays': 'warn',
  'instawork/import-screens': 'warn',
  'instawork/import-services': 'warn',
  'instawork/naming-components': 'warn',
  'instawork/naming-overlays': 'warn',
  'instawork/naming-screens': 'warn',
  'instawork/props-no-function': 'warn',
  'instawork/pure-components': 'warn',
  'instawork/redux-type-selectors': 'warn',
  'instawork/stories-components': 'warn',
  'instawork/stories-name': 'warn',
  'instawork/stories-navbars': 'warn',
  'instawork/stories-screens': 'warn',
  'no-multiple-empty-lines': [
    'warn',
    {
      max: 1,
    },
  ],
  'no-underscore-dangle': 'warn',
  'react/jsx-sort-props': 'warn',
  'sort-keys': 'warn',
};

const rules = {
  ...disabledRules,
  ...errorRules,
  ...warningRules,
};

// "extends" is an existing keyword, and so we use "extend$"
const extend$ = [
  'airbnb',
  'plugin:flowtype/recommended',
  'prettier',
  'plugin:prettier/recommended',
  'prettier/flowtype',
  'prettier/react',
  'prettier/standard',
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
