'use strict';

var _require = require('..'),
    rules = _require.rules;

var _require2 = require('eslint'),
    RuleTester = _require2.RuleTester;

var ruleTester = new RuleTester();
var expectedErrorMessage = 'connected components must have tracking code';

var validCase = '// @flow\n\nimport * as ScreenHocs from \'applicant-app/src/services/screen-hocs\';\nimport * as Tracking from \'applicant-app/src/services/tracking\';\nimport type { Events } from \'./types\';\nimport FooScreen from \'./presentation\';\n\nconst events: Events = {\n  onTrackFoo: { name: \'foo\' },\n};\n\nconst withTracking = ScreenHocs.withTracking(Tracking.NAMESPACES.FOO, events);\n\nexport default withTracking(FooScreen);\n';

var invalidCase = '// @flow\n\nimport * as ScreenHocs from \'applicant-app/src/services/screen-hocs\';\nimport FooScreen from \'./presentation\';\n\nexport default FooScreen;\n';

ruleTester.run('require-tracking', rules['require-tracking'], {
  valid: [{ code: validCase, parser: 'babel-eslint' }],
  invalid: [{
    code: invalidCase,
    errors: [{ message: expectedErrorMessage, column: 1, line: 1 }],
    parser: 'babel-eslint'
  }]
});