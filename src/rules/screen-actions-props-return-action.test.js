// @flow

const { RuleTester } = require('eslint');
const rule = require('./screen-actions-props-return-action');

const ruleTester = new RuleTester();

ruleTester.run('screen-actions-props-return-action', rule, {
  invalid: [
    {
      code: 'type Actions = { foo: () => void }',
      errors: [{ column: 29, line: 1, message: 'must return Action' }],
      parser: 'babel-eslint',
    },
    {
      code: 'type ActionsMap = { foo: () => void }',
      errors: [{ column: 32, line: 1, message: 'must return Action' }],
      parser: 'babel-eslint',
    },
    {
      code: 'type ActionMap = { foo: () => void }',
      errors: [{ column: 31, line: 1, message: 'must return Action' }],
      parser: 'babel-eslint',
    },
  ],
  valid: [
    {
      code: 'type Actions = { foo: () => Action }',
      parser: 'babel-eslint',
    },
  ],
});
