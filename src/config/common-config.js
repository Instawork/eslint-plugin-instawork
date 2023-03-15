// @flow

// Default rules that aren't applicable to our projects
const disabledRules = {
  'import/extensions': 'off',
  'import/first': 'off',
  'import/no-unresolved': 'off',

  // Added in 0.4.0 after updating dependencies
  // This conflicts with the rule sort-imports
  // We should figure out which one is the most relevant
  // https://app.asana.com/0/474532500889635/1126294696598145/f
  'import/order': 'off',

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
  'import/no-extraneous-dependencies': [
    'error',
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
  'instawork/component-methods-use-arrows': 'error',
  'instawork/deprecate-bound': 'error',
  'instawork/error-object': 'error',
  'instawork/exact-object-types': 'error',
  'instawork/flow-annotate': 'error',
  'instawork/import-components': 'error',
  'instawork/import-overlays': 'error',
  'instawork/import-screens': 'error',
  'instawork/localization-namespace': 'error',
  'instawork/localization-string-key': 'error',
  'instawork/naming-components': 'error',
  'instawork/naming-overlays': 'error',
  'instawork/naming-screens': 'error',
  'instawork/props-no-function': 'warn',
  'instawork/redux-type-selectors': 'error',
  'instawork/rn-list-clip-subviews': 'error',
  'instawork/screen-actions-props-function': 'error',
  'instawork/screen-actions-props-return-action': 'error',
  'instawork/screen-selectors-props-function': 'error',
  'instawork/stories-name': 'error',
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
    },
  ],
  'no-underscore-dangle': 'error',
  'prefer-destructuring': [
    'error',
    {
      AssignmentExpression: {
        array: true,
        object: true,
      },
      VariableDeclarator: {
        array: true,
        object: true,
      },
    },
    {
      enforceForRenamedProperties: false,
    },
  ],
  'prettier/prettier': 'error',
  'sort-imports': 'error',
};

// These should be "error", but are now set to "warn" until we fix linting issues in all projects
// https://app.asana.com/0/426551029573976/1112529141606707/f
const warningRules = {
  'instawork/deprecate-components': 'warn',
  'instawork/deprecate-stateless': 'warn',
  'instawork/import-modules': 'warn',
  'instawork/import-services': 'warn',
  'instawork/pure-components': 'warn',
  'instawork/stories-components': 'warn',
  'instawork/stories-navbars': 'warn',
  'instawork/stories-screens': 'warn',
  'max-classes-per-file': 'warn',
  'prefer-object-spread': 'warn',
  'react/destructuring-assignment': ['warn', 'never'],
  'react/forbid-prop-types': 'warn',
  'react/jsx-fragments': 'warn',
  'react/jsx-pascal-case': 'warn',
  'react/jsx-props-no-spreading': 'warn',
  'react/jsx-sort-props': 'warn',
  'react/no-deprecated': 'warn',
  'react/prop-types': 'warn',
  'react/state-in-constructor': 'warn',
  'react/static-property-placement': 'warn',
  'sort-keys': 'warn',
};

export const commonConfig = {
  disabledRules,
  errorRules,
  warningRules,
};
