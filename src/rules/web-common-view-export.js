// @flow

const util = require('./util');

const meta = {
  docs: {
    description: 'each top level view of Common Views should only have one export',
  },
};

const create = (context) => {
  const filePath = context.getFilename();
  if (!util.isFirstLevelViewIndex(filePath)) {
    return {};
  }

  return {
    Program(node) {
      let exportCount = 0;
      node.body.forEach((childNode) => {
        if (
          childNode.type === 'ExportNamedDeclaration' ||
          childNode.type === 'ExportDefaultDeclaration'
        ) {
          exportCount += 1;
        }
      });

      if (exportCount !== 1) {
        context.report(node, `Common views should have exactly one export. Found: ${exportCount}`);
      }
    },
  };
};

module.exports = { create, meta };
