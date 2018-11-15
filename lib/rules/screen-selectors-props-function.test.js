'use strict';

var rule = require('./screen-selectors-props-function');

var _require = require('eslint'),
    RuleTester = _require.RuleTester;

var ruleTester = new RuleTester();

ruleTester.run('screen-selectors-props-function', rule, {
  valid: [{
    code: 'type Selectors = { foo: (*) => number }',
    parser: 'babel-eslint'
  }],
  invalid: [{
    code: 'type Selectors = { foo: * }',
    errors: [{ message: 'must be a function', column: 20, line: 1 }],
    parser: 'babel-eslint'
  }, {
    code: 'type SelectorsMap = { foo: * }',
    errors: [{ message: 'must be a function', column: 23, line: 1 }],
    parser: 'babel-eslint'
  }, {
    code: 'type SelectorMap = { foo: * }',
    errors: [{ message: 'must be a function', column: 22, line: 1 }],
    parser: 'babel-eslint'
  }]
});