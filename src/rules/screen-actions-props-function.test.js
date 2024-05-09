// @flow

const { RuleTester } = require('eslint');
const rule = require('./screen-actions-props-function');

const ruleTester = new RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-flow'],
    },
  },
});

ruleTester.run('screen-actions-props-function', rule, {
  invalid: [
    {
      code: 'type Actions = { foo: * }',
      errors: [{ column: 18, line: 1, message: 'must be a function' }],
    },
    {
      code: 'type ActionsMap = { foo: * }',
      errors: [{ column: 21, line: 1, message: 'must be a function' }],
    },
    {
      code: 'type ActionMap = { foo: * }',
      errors: [{ column: 20, line: 1, message: 'must be a function' }],
    },
  ],
  valid: [
    {
      code: 'type Actions = { foo: () => Action }',
    },
  ],
});
