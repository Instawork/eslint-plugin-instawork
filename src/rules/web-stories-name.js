// @flow

const util = require('./util');

const meta = {
  docs: {
    description: 'story names must correspond to the directory in which they are located',
  },
};

const create = (context) => {
  const filepath = context.getFilename();
  if (!filepath.endsWith('stories.tsx')) {
    return {};
  }

  return {
    ExportDefaultDeclaration(node) {
      const expectedTitle = util.getExpectedWebStoryTitle(filepath);

      // Find the title property in the export object
      let storyTitle = '';
      if (node.declaration.type === 'ObjectExpression' && node.declaration.properties) {
        node.declaration.properties.forEach((property) => {
          if (
            property.key.type === 'Identifier' &&
            property.key.name === 'title' &&
            property.value.type === 'Literal'
          ) {
            storyTitle = property.value.value;
          }
        });
      }

      if (storyTitle !== expectedTitle) {
        context.report(node, `story title should be '${expectedTitle}'`);
      }
    },
  };
};

module.exports = { create, meta };
