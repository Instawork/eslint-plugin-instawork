'use strict';

var util = require('./util');

describe('isStoryPath', function () {
  it('returns true if the path is a path to a story file', function () {
    var result = util.isStoryPath('src/screens/foo-bar/stories.js');
    expect(result).toBe(true);
  });

  it('returns false if the path is not a path to a story file', function () {
    var result = util.isStoryPath('src/screens/foo-bar/index.js');
    expect(result).toBe(false);
  });
});

describe('getExpectedStoryNameForPath', function () {
  it('returns the expected Storybook entry name', function () {
    var result = util.getExpectedStoryNameForPath('src/screens/foo-bar/stories.js');
    expect(result).toEqual('Screens/FooBarScreen');
  });

  it('also works for other entity types', function () {
    var result = util.getExpectedStoryNameForPath('src/services/foo-bar/stories.js');
    expect(result).toEqual('Services/FooBarService');
  });
});

describe('isStoryDeclarationNode', function () {
  it('returns true if the node is a story declaration node', function () {
    var node = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'storiesOf'
      },
      arguments: [{ type: 'Literal', value: 'Screens/FooBarService' }]
    };

    var result = util.isStoryDeclarationNode(node);
    expect(result).toBe(true);
  });

  it('returns false if the node is not a story declaration node', function () {
    var node = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'foobar'
      },
      arguments: []
    };

    var result = util.isStoryDeclarationNode(node);
    expect(result).toBe(false);
  });
});

describe('getStoryNameForStoryDeclarationNode', function () {
  it('returns the story name, given a story declaration node', function () {
    var node = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'storiesOf'
      },
      arguments: [{ type: 'Literal', value: 'Screens/FooBarService' }]
    };

    var result = util.getStoryNameForStoryDeclarationNode(node);
    expect(result).toBe('Screens/FooBarService');
  });
});

describe('getEntityTypeForPath', function () {
  it('returns the entity type, given a path', function () {
    var result = util.getEntityTypeForPath('src/screens/foo/index.js');
    expect(result).toBe('screen');
  });
});

describe('getExpectedClassNameForPath', function () {
  it('returns the expected class name for screens', function () {
    var result = util.getExpectedClassNameForPath('src/screens/foo-bar/index.js');
    expect(result).toBe('FooBarScreen');
  });

  it('returns the expected class name for services', function () {
    var result = util.getExpectedClassNameForPath('src/services/foo-bar/index.js');
    expect(result).toBe('FooBarService');
  });

  it('does not add a suffix for components', function () {
    var result = util.getExpectedClassNameForPath('src/components/foo-bar/index.js');
    expect(result).toBe('FooBar');
  });

  it('does not add a suffix for sub-components', function () {
    var result = util.getExpectedClassNameForPath('src/screens/foo-bar/zig/index.js');
    expect(result).toBe('Zig');
  });
});