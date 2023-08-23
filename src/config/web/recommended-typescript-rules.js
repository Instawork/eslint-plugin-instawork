// @flow

const disabledRules = {
  'no-redeclare': 'off',
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
  'no-unused-vars': 'off',
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.md#how-to-use
  'no-shadow': 'off',
  'react/destructuring-assignment': 'off',
  'implicit-arrow-linebreak': 'off',
  'function-paren-newline': 'off',
  'object-curly-newline': 'off',
  'prefer-destructuring': 'off',
  'comma-dangle': 'off',
  'react/prop-types': 'off',
  // Turned off spacing rules since it clashes with our editor and prettier config
  indent: 'off',
  'react/jsx-indent': 'off',
  'react/jsx-indent-props': 'off',
  'no-spaced-func': 'off',
  'func-call-spacing': 'off',
  // Turned off since we are in favor of named imports
  'import/prefer-default-export': 'off',
  // Note you must disable the base rule as it can report incorrect errors.
  // See https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
  'no-use-before-define': 'off',
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  'no-undef': 'off',
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
  'no-console': ['error'],
  '@typescript-eslint/no-redeclare': ['error'],
  '@typescript-eslint/no-explicit-any': ['error'],
  '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  '@typescript-eslint/no-shadow': ['error'],
  'react/jsx-props-no-spreading': [
    'error',
    { exceptions: ['FormControl', 'Form.Check'], explicitSpread: 'ignore' },
  ],
  '@typescript-eslint/no-use-before-define': 'error',
  // Disabled for immer state updates https://github.com/immerjs/immer/issues/189#issuecomment-506396244
  'no-param-reassign': [
    'error',
    { props: true, ignorePropertyModificationsFor: ['draft', 'ref', 'acc'] },
  ],
  'react/function-component-definition': [
    2,
    {
      namedComponents: ['arrow-function', 'function-declaration'],
    },
  ],
  'jsx-a11y/label-has-associated-control': [
    2,
    {
      controlComponents: ['IWPhoneInput', 'Form.Control'],
      asserts: 'either',
      depth: 3,
    },
  ],
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
  'no-restricted-imports': ['error', { patterns: ['../*'] }],
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      allowSeparatedGroups: true,
    },
  ],
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['sibling', 'index']],
      pathGroups: [
        { pattern: '@*', group: 'external', position: 'after' },
        { pattern: '@*/**', group: 'external', position: 'after' },
        { pattern: 'microFECommon/**', group: 'internal', position: 'before' },
      ],
      pathGroupsExcludedImportTypes: ['@*', '@*/**'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      'newlines-between': 'always',
    },
  ],
};

module.exports = {
  disabledRules,
  errorRules,
  warnRules,
};
