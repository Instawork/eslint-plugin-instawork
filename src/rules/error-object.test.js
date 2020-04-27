// @flow

const { RuleTester } = require('eslint');
const rule = require('./error-object');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

ruleTester.run('error-object', rule, {
  invalid: [
    {
      code: 'class MyError extends Error {}',
      errors: [{ message: /^'MyError' should extend IWBaseError instead of Error$/ }],
    },
    {
      code: 'class MyClass extends IWBaseError {}',
      errors: [{ message: /^'MyClass' should be named 'IWMyClassError'$/ }],
    },
    {
      code: 'class MyClassError extends IWBaseError {}',
      errors: [{ message: /^'MyClassError' should be named 'IWMyClassError'$/ }],
    },
    {
      code: 'class IWMyClass extends IWBaseError {}',
      errors: [{ message: /^'IWMyClass' should be named 'IWMyClassError'$/ }],
    },
    {
      code: 'const foo = new Error()',
      errors: [
        {
          message: /^Should not directly instanciate object from 'Error' class, instead instanciate object from class extending 'IWBaseError'$/,
        },
      ],
    },
  ],
  valid: [
    {
      code: 'class IWMyError extends IWBaseError {}',
    },
  ],
});
