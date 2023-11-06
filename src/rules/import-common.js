// @flow

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
        const importPath = node.source.value;

        // Define your not allowed prefix here
        const notAllowedPrefix = ['microFE/'];

        const isNotAllowed = notAllowedPrefix.some((prefix) => importPath.startsWith(prefix));

        if (isNotAllowed) {
          context.report({
            node,
            message: `Import from '${importPath}' is not allowed`,
          });
        }
      },
    };
  },
};