// @flow

const disabledRules = {
  'comma-dangle': 'off',
  'func-call-spacing': 'off',
  'function-paren-newline': 'off',
  // Turned off spacing rules since it clashes with our editor and prettier config
  'implicit-arrow-linebreak': 'off',
  // Turned off since we are in favor of named imports
  'import/prefer-default-export': 'off',
  indent: 'off',
  'no-redeclare': 'off',
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.md#how-to-use
  'no-shadow': 'off',
  'no-spaced-func': 'off',
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  'no-undef': 'off',
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
  'no-unused-vars': 'off',
  // Note you must disable the base rule as it can report incorrect errors.
  // See https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
  'no-use-before-define': 'off',
  'object-curly-newline': 'off',
  'prefer-destructuring': 'off',
  'react/destructuring-assignment': 'off',
  'react/jsx-indent': 'off',
  'react/jsx-indent-props': 'off',
  'react/prop-types': 'off',
  'react/require-default-props': 'off',
};

const warnRules = {
  '@typescript-eslint/no-inferrable-types': 'warn',
  'no-case-declarations': 'warn',
  'no-inner-declarations': 'warn',
  'no-var': 'warn',
  'prettier/prettier': 'warn',
  'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
};

const errorRules = {
  '@typescript-eslint/no-explicit-any': ['error'],
  '@typescript-eslint/no-redeclare': ['error'],
  '@typescript-eslint/no-shadow': ['error'],
  '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  '@typescript-eslint/no-use-before-define': 'error',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['**/stories.*', '**/.storybook/**/*.*', '**/*.ts', '**/*.tsx'],
      peerDependencies: true,
    },
  ],
  'import/order': [
    'error',
    {
      alphabetize: { caseInsensitive: true, order: 'asc' },
      groups: ['builtin', 'external', 'internal', ['sibling', 'index']],
      'newlines-between': 'always',
      pathGroups: [
        { group: 'external', pattern: '@*', position: 'after' },
        { group: 'external', pattern: '@*/**', position: 'after' },
        { group: 'internal', pattern: 'microFECommon/**', position: 'before' },
      ],
      pathGroupsExcludedImportTypes: ['@*', '@*/**'],
    },
  ],
  'jsx-a11y/label-has-associated-control': [
    2,
    {
      asserts: 'either',
      controlComponents: ['IWPhoneInput', 'Form.Control'],
      depth: 3,
    },
  ],

  'no-console': ['error'],
  // Disabled for immer state updates https://github.com/immerjs/immer/issues/189#issuecomment-506396244
  'no-param-reassign': [
    'error',
    { ignorePropertyModificationsFor: ['draft', 'ref', 'acc'], props: true },
  ],
  'no-restricted-imports': ['error', { patterns: ['../*'] }],
  'react/function-component-definition': [
    2,
    {
      namedComponents: ['arrow-function', 'function-declaration'],
    },
  ],

  'react/jsx-props-no-spreading': [
    'error',
    { exceptions: ['FormControl', 'Form.Check'], explicitSpread: 'ignore' },
  ],
  'sort-imports': [
    'error',
    {
      allowSeparatedGroups: true,
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
    },
  ],
};

module.exports = {
  disabledRules,
  errorRules,
  warnRules,
};
