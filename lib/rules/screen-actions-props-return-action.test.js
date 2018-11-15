'use strict';

var rule = require('./screen-actions-props-return-action');

var _require = require('eslint'),
    RuleTester = _require.RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('screen-actions-props-return-action', rule, {
  valid: [{
    code: 'type Actions = { foo: () => Action }',
    parser: 'babel-eslint'
  }],
  invalid: [{
    code: 'type Actions = { foo: () => void }',
    errors: [{ message: 'must return Action', column: 29, line: 1 }],
    parser: 'babel-eslint'
  }, {
    code: 'type ActionsMap = { foo: () => void }',
    errors: [{ message: 'must return Action', column: 32, line: 1 }],
    parser: 'babel-eslint'
  }, {
    code: 'type ActionMap = { foo: () => void }',
    errors: [{ message: 'must return Action', column: 31, line: 1 }],
    parser: 'babel-eslint'
  }]
});