// @flow

const path = require('path');

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce allowed imports from specific folders',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const options = context?.options?.[0] ?? { allowed: [] };

        if (!node.source.value.startsWith(`${options.appsDirectoryShorthandPrefix}/`)) {
          return;
        }

        const [importPathPrefix] = node.source.value
          .replace(`${options.appsDirectoryShorthandPrefix}/`, '')
          .split('/');
        const [currentPathPrefix] = context
          .getFilename()
          .replace(`${path.resolve(process.cwd(), options.appsDirectory)}/`, '')
          .split('/');

        if ([...options.allowed, currentPathPrefix].includes(importPathPrefix)) {
          return;
        }

        context.report({
          node,
          message: `Import from '${node.source.value}' is not allowed`,
        });
      },
    };
  },
};
