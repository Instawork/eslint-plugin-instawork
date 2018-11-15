'use strict';

var meta = {
  docs: {
    description: 'certain object types must be exact types (e.g. ActionsMap, SelectorsMap)'
  },
  fixable: 'code'
};

var TYPE_NAME_REGEX = /((Action|Event|Selector)s?Map|Props|Attributes|Relationships|State)$/;
var TYPE_NAME_EXCLUDE_REGEX = /^(RootState|PartialState|PartialAttributes|SelectionState)$/;
var SERVICES_PATH_REGEX = /src\/services/i;

var create = function create(context) {
  var sourcePath = context.getFilename();
  if (sourcePath.match(SERVICES_PATH_REGEX)) return {};

  return {
    TypeAlias: function TypeAlias(node) {
      var typeName = node.id.name;
      var typeDefinition = node.right;

      if (typeDefinition.type !== 'ObjectTypeAnnotation') return;
      if (!TYPE_NAME_REGEX.test(typeName) || TYPE_NAME_EXCLUDE_REGEX.test(typeName)) return;
      if (typeDefinition.exact) return;

      var fix = function fix(fixer) {
        var typeDefinitionSource = context.getSourceCode().getText(typeDefinition);
        var fixedTypeDefinitionSource = typeDefinitionSource.replace(/^{([\s\S]*)}$/, '{|$1|}');
        return fixer.replaceText(typeDefinition, fixedTypeDefinitionSource);
      };

      context.report({
        fix: fix,
        message: '\'' + typeName + '\' must be an exact type',
        node: node.id
      });
    }
  };
};

module.exports = { create: create, meta: meta };