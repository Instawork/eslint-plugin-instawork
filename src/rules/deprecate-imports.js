// @flow

const meta = {
  docs: {
    description: 'Must not use deprecated import paths',
  },
  schema: {
    items: {
      path: 'RegExp',
      reason: 'string',
    },
    type: 'array',
  },
};

const create = context => {
  const [deprecationOptions] = context.options;

  return {
    ImportDeclaration: importDeclaration => {
      const { source } = importDeclaration;

      if (source.type !== 'Literal') {
        return;
      }

      const importPath = source.value;

      deprecationOptions.find(deprecationOption => {
        if (importPath.match(deprecationOption.path)) {
          context.report(
            importDeclaration,
            `Importing from '${importPath}' has been deprecated. ${deprecationOption.reason}`,
          );
          return true;
        }

        return false;
      });
    },
  };
};

module.exports = { create, meta };
