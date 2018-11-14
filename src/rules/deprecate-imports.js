const meta = {
  docs: {
    description: 'Must not use deprecated import paths',
  },
  schema: {
    type: 'array',
    items: {
      path: 'RegExp',
      reason: 'string',
    },
  },
};

const create = (context) => {
  const deprecationOptions = context.options[0];

  return {
    ImportDeclaration: (importDeclaration) => {
      const { source } = importDeclaration;

      if (source.type !== 'Literal') return;

      const importPath = source.value;

      deprecationOptions.find((deprecationOption) => {
        if (importPath.match(deprecationOption.path)) {
          context.report(importDeclaration, `Importing from '${importPath}' has been deprecated. ${deprecationOption.reason}`);
          return true;
        }

        return false;
      });
    },
  };
};

module.exports = { create, meta };
