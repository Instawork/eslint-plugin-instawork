'use strict';

var COMPONENT_SUPERCLASS_REGEX = /^(Pure)?Component$/i;
var DEPRECATED_CLASS_NAME_REGEX = /(Managed)|(Stateless)/i;
var DEPRECATED_TYPE_NAME_REGEX = /(ManagedProp)|(StatelessProp)/i;
var ERROR_MESSAGE = 'The \'managed + stateless\' component pattern has been superseded by the \'presentation + hoc\' pattern';

var meta = {
  docs: {
    description: 'the managed/stateless component pattern has been superseded by presentation + hoc'
  }
};

var getSuperclassName = function getSuperclassName(classDeclarationNode) {
  var superClass = classDeclarationNode.superClass;

  if (!superClass) return null;

  if (superClass.type === 'MemberExpression') {
    return superClass.property.name;
  } else if (superClass.type === 'Identifier') {
    return superClass.name;
  }

  throw new Error('Unexpected superClass type: ' + superClass.type);
};

var isComponentClass = function isComponentClass(classDeclarationNode) {
  var superclassName = getSuperclassName(classDeclarationNode);
  return COMPONENT_SUPERCLASS_REGEX.test(superclassName);
};

var create = function create(context) {
  return {
    ClassDeclaration: function ClassDeclaration(node) {
      var className = node.id.name;
      if (!isComponentClass(node)) return;

      if (DEPRECATED_CLASS_NAME_REGEX.test(className)) {
        context.report(node.id, ERROR_MESSAGE);
      }
    },
    TypeAlias: function TypeAlias(node) {
      var typeName = node.id.name;

      if (DEPRECATED_TYPE_NAME_REGEX.test(typeName)) {
        context.report(node.id, ERROR_MESSAGE);
      }
    }
  };
};

module.exports = { create: create, meta: meta };