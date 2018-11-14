const util = require('./util');

const meta = {
  docs: {
    description: 'story names must correspond to the directory in which they are located',
  },
};

const create = (context) => {
  const filepath = context.getFilename();

  if (!util.isStoryPath(filepath)) {
    return {};
  }

  return {
    CallExpression: (node) => {
      if (util.isStoryDeclarationNode(node)) {
        const actualStoryName = util.getStoryNameForStoryDeclarationNode(node);
        const expectedStoryName = util.getExpectedStoryNameForPath(filepath);

        if (actualStoryName !== expectedStoryName) {
          context.report(node, `story name should be '${expectedStoryName}'`);
        }
      }
    },
  }
};

module.exports = { create, meta };
