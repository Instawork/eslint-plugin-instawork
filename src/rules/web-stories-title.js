// @flow

const meta = {
  docs: {
    description: 'stories must not have an explicit title',
  },
};

const create = (context) => {
  const filepath = context.getFilename();
  if (!filepath.endsWith('stories.tsx')) {
    return {};
  }

  return {
    ExportDefaultDeclaration(node) {
      let exportDeclaration = node.declaration;
      // Handle TSAsExpression to reach the object expression
      if (exportDeclaration.type === 'TSAsExpression') {
        exportDeclaration = exportDeclaration.expression;
      }

      if (exportDeclaration.type === 'ObjectExpression') {
        const titleProperty = exportDeclaration.properties.find(
          (property) =>
            property.type === 'Property' &&
            property.key.type === 'Identifier' &&
            property.key.name === 'title',
        );

        if (titleProperty) {
          context.report(titleProperty, 'stories must not have an explicit title');
        }
      }
    },
  };
};

module.exports = { create, meta };
