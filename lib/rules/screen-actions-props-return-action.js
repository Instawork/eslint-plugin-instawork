'use strict';

var meta = {
  docs: {
    description: 'By design, action maps define functions that have to return the Action type'
  }
};

var isActionMap = function isActionMap(node) {
  return (node.id.name === 'Actions' || node.id.name === 'ActionsMap' || node.id.name === 'ActionMap') && node.right.type === 'ObjectTypeAnnotation';
};

var getPropertiesThatAreFunctions = function getPropertiesThatAreFunctions(node) {
  return node.right.properties.filter(function (prop) {
    return prop.type === 'ObjectTypeProperty' && prop.value.type === 'FunctionTypeAnnotation';
  });
};

var doesFunctionReturnAction = function doesFunctionReturnAction(node) {
  return node.value.returnType.type === 'GenericTypeAnnotation' && node.value.returnType.id.type === 'Identifier' && node.value.returnType.id.name === 'Action';
};

var create = function create(context) {
  return {
    TypeAlias: function TypeAlias(node) {
      if (!isActionMap(node)) {
        return;
      }

      getPropertiesThatAreFunctions(node).forEach(function (functionProp) {
        if (!doesFunctionReturnAction(functionProp)) {
          context.report(functionProp.value.returnType, 'must return Action');
        }
      });
    }
  };
};

module.exports = { create: create, meta: meta };