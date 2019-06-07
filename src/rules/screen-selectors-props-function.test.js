// @flow

const { RuleTester } = require('eslint');
const rule = require('./screen-selectors-props-function');

const ruleTester = new RuleTester();

ruleTester.run('screen-selectors-props-function', rule, {
  invalid: [
    {
      code: 'type Selectors = { foo: * }',
      errors: [{ column: 20, line: 1, message: 'must be a function' }],
      parser: 'babel-eslint',
    },
    {
      code: 'type SelectorsMap = { foo: * }',
      errors: [{ column: 23, line: 1, message: 'must be a function' }],
      parser: 'babel-eslint',
    },
    {
      code: 'type SelectorMap = { foo: * }',
      errors: [{ column: 22, line: 1, message: 'must be a function' }],
      parser: 'babel-eslint',
    },
  ],
  valid: [
    {
      code: 'type Selectors = { foo: (*) => number }',
      parser: 'babel-eslint',
    },
  ],
});
