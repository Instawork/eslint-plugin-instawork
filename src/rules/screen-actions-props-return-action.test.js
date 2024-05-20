// @flow

const { RuleTester } = require('eslint');
const rule = require('./screen-actions-props-return-action');

const ruleTester = new RuleTester({
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-flow'],
    },
  },
});

ruleTester.run('screen-actions-props-return-action', rule, {
  invalid: [
    {
      code: 'type Actions = { foo: () => void }',
      errors: [{ column: 29, line: 1, message: 'must return Action' }],
    },
    {
      code: 'type ActionsMap = { foo: () => void }',
      errors: [{ column: 32, line: 1, message: 'must return Action' }],
    },
    {
      code: 'type ActionMap = { foo: () => void }',
      errors: [{ column: 31, line: 1, message: 'must return Action' }],
    },
  ],
  valid: [
    {
      code: 'type Actions = { foo: () => Action }',
    },
  ],
});
