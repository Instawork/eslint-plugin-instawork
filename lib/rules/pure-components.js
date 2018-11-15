'use strict';

var NAME_REGEX = /^Component$/i;

var meta = {
  docs: {
    description: 'components should be pure for better overall performance'
  }
};

var getSuperclassName = function getSuperclassName(classExpressionNode) {
  var superClass = classExpressionNode.superClass;

  if (!superClass) return null;

  if (superClass.type === 'MemberExpression') {
    return superClass.property.name;
  } else if (superClass.type === 'Identifier') {
    return superClass.name;
  }

  throw new Error('Unexpected superClass type: ' + superClass.type);
};

var create = function create(context) {
  return {
    ClassDeclaration: function ClassDeclaration(node) {
      var superclassName = getSuperclassName(node);

      if (superclassName && NAME_REGEX.test(superclassName)) {
        var className = node.id.name;
        context.report(node.superClass, '\'' + className + '\' should extend PureComponent instead of Component');
      }
    }
  };
};

module.exports = { create: create, meta: meta };