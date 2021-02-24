// @flow

const meta = {
  docs: {
    description: 'certain object types must be exact types (e.g. ActionsMap, SelectorsMap)',
  },
  fixable: 'code',
};

const TYPE_NAME_REGEX = /((Action|Event|Selector)s?Map|Props|Attributes|Relationships|State)$/;
const TYPE_NAME_EXCLUDE_REGEX = /^(RootState|PartialState|PartialAttributes|SelectionState)$/;
const SERVICES_PATH_REGEX = /src\/services/i;

const create = (context) => {
  const sourcePath = context.getFilename();
  if (sourcePath.match(SERVICES_PATH_REGEX)) {
    return {};
  }

  return {
    TypeAlias: (node) => {
      const typeName = node.id.name;
      const typeDefinition = node.right;

      if (typeDefinition.type !== 'ObjectTypeAnnotation') {
        return;
      }
      if (!TYPE_NAME_REGEX.test(typeName) || TYPE_NAME_EXCLUDE_REGEX.test(typeName)) {
        return;
      }
      if (typeDefinition.exact) {
        return;
      }

      const fix = (fixer) => {
        const typeDefinitionSource = context.getSourceCode().getText(typeDefinition);
        const fixedTypeDefinitionSource = typeDefinitionSource.replace(/^{([\s\S]*)}$/, '{|$1|}');
        return fixer.replaceText(typeDefinition, fixedTypeDefinitionSource);
      };

      context.report({
        fix,
        message: `'${typeName}' must be an exact type`,
        node: node.id,
      });
    },
  };
};

module.exports = { create, meta };
