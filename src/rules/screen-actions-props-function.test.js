// @flow

const { RuleTester } = require('eslint');
const rule = require('./screen-actions-props-function');

const ruleTester = new RuleTester();

ruleTester.run('screen-actions-props-function', rule, {
  invalid: [
    {
      code: 'type Actions = { foo: * }',
      errors: [{ column: 18, line: 1, message: 'must be a function' }],
      parser: 'babel-eslint',
    },
    {
      code: 'type ActionsMap = { foo: * }',
      errors: [{ column: 21, line: 1, message: 'must be a function' }],
      parser: 'babel-eslint',
    },
    {
      code: 'type ActionMap = { foo: * }',
      errors: [{ column: 20, line: 1, message: 'must be a function' }],
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
