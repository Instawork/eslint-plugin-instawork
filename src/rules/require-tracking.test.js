const { rules, configs } = require('..');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();
const expectedErrorMessage = 'connected components must have tracking code';

const validCase =
`// @flow

import * as ScreenHocs from 'applicant-app/src/services/screen-hocs';
import * as Tracking from 'applicant-app/src/services/tracking';
import type { Events } from './types';
import FooScreen from './presentation';

const events: Events = {
  onTrackFoo: { name: 'foo' },
};

const withTracking = ScreenHocs.withTracking(Tracking.NAMESPACES.FOO, events);

export default withTracking(FooScreen);
`

const invalidCase =
`// @flow

import * as ScreenHocs from 'applicant-app/src/services/screen-hocs';
import FooScreen from './presentation';

export default FooScreen;
`

ruleTester.run('require-tracking', rules['require-tracking'], {
  valid: [
    { code: validCase, parser: 'babel-eslint' }
  ],
  invalid: [
    {
      code: invalidCase,
      errors: [{ message: expectedErrorMessage, column: 1, line: 1 }],
      parser: 'babel-eslint',
    },
  ],
});