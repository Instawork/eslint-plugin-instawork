'use strict';

var rule = require('./screen-actions-props-function');

var _require = require('eslint'),
    RuleTester = _require.RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('screen-actions-props-function', rule, {
  valid: [{
    code: 'type Actions = { foo: () => Action }',
    parser: 'babel-eslint'
  }],
  invalid: [{
    code: 'type Actions = { foo: * }',
    errors: [{ message: 'must be a function', column: 18, line: 1 }],
    parser: 'babel-eslint'
  }, {
    code: 'type ActionsMap = { foo: * }',
    errors: [{ message: 'must be a function', column: 21, line: 1 }],
    parser: 'babel-eslint'
  }, {
    code: 'type ActionMap = { foo: * }',
    errors: [{ message: 'must be a function', column: 20, line: 1 }],
    parser: 'babel-eslint'
  }]
});