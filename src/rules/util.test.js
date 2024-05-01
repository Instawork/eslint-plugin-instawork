/* eslint-disable prettier/prettier */
// @flow

const util = require('./util');

describe('isStoryPath', () => {
  it('returns true if the path is a path to a story file', () => {
    const result = util.isStoryPath('src/screens/foo-bar/stories.js');
    expect(result).toBe(true);
  });

  it('returns false if the path is not a path to a story file', () => {
    const result = util.isStoryPath('src/screens/foo-bar/index.js');
    expect(result).toBe(false);
  });
});

describe('getExpectedStoryNameForPath', () => {
  it('returns the expected Storybook entry name', () => {
    const result = util.getExpectedStoryNameForPath('src/screens/foo-bar/stories.js');
    expect(result).toEqual('Screens/FooBarScreen');
  });

  it('also works for other entity types', () => {
    const result = util.getExpectedStoryNameForPath('src/services/foo-bar/stories.js');
    expect(result).toEqual('Services/FooBarService');
  });
});

describe('isStoryDeclarationNode', () => {
  it('returns true if the node is a story declaration node', () => {
    const node = {
      arguments: [{ type: 'Literal', value: 'Screens/FooBarService' }],
      callee: {
        name: 'storiesOf',
        type: 'Identifier',
      },
      type: 'CallExpression',
    };

    const result = util.isStoryDeclarationNode(node);
    expect(result).toBe(true);
  });

  it('returns false if the node is not a story declaration node', () => {
    const node = {
      arguments: [],
      callee: {
        name: 'foobar',
        type: 'Identifier',
      },
      type: 'CallExpression',
    };

    const result = util.isStoryDeclarationNode(node);
    expect(result).toBe(false);
  });
});

describe('getStoryNameForStoryDeclarationNode', () => {
  it('returns the story name, given a story declaration node', () => {
    const node = {
      arguments: [{ type: 'Literal', value: 'Screens/FooBarService' }],
      callee: {
        name: 'storiesOf',
        type: 'Identifier',
      },
      type: 'CallExpression',
    };

    const result = util.getStoryNameForStoryDeclarationNode(node);
    expect(result).toBe('Screens/FooBarService');
  });
});

describe('getEntityTypeForPath', () => {
  it('returns the entity type, given a path', () => {
    const result = util.getEntityTypeForPath('src/screens/foo/index.js');
    expect(result).toBe('screen');
  });
});

describe('getExpectedClassNameForPath', () => {
  it('returns the expected class name for screens', () => {
    const result = util.getExpectedClassNameForPath('src/screens/foo-bar/index.js');
    expect(result).toBe('FooBarScreen');
  });

  it('returns the expected class name for services', () => {
    const result = util.getExpectedClassNameForPath('src/services/foo-bar/index.js');
    expect(result).toBe('FooBarService');
  });

  it('does not add a suffix for components', () => {
    const result = util.getExpectedClassNameForPath('src/components/foo-bar/index.js');
    expect(result).toBe('FooBar');
  });

  it('does not add a suffix for sub-components', () => {
    const result = util.getExpectedClassNameForPath('src/screens/foo-bar/zig/index.js');
    expect(result).toBe('Zig');
  });
});

describe('isFirstLevelViewIndex', () => {
  test('matches a first-level view index file in common/views/', () => {
    const filePath = 'web_frontend/common/views/view-name/index.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(true);
  });

  test('matches a first-level view index file in common/src/views/', () => {
    const filePath = 'web_frontend/common/src/views/view-name/index.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(true);
  });

  test('does not match a first-level components index file in common/src/views/', () => {
    const filePath = 'web_frontend/common/src/views/components/my-componentindex.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(false);
  });

  test('does not match a file in a subdirectory of a first-level view', () => {
    const filePath = 'web_frontend/common/views/view-name/subfolder/index.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(false);
  });

  test('does not match a view component index file in common/src/views/components/', () => {
    const filePath = 'web_frontend/common/src/views/components/component-name/index.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(false);
  });

  test('does not match a file that is not index.ts', () => {
    const filePath = 'web_frontend/common/src/views/view-name/not-index.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(false);
  });

  test('does not match a file in a completely different directory', () => {
    const filePath = 'web_frontend/unrelated/directory/structure/index.ts';
    expect(util.isFirstLevelViewIndex(filePath)).toBe(false);
  });
});