const fs = require('fs');
const path = require('path');

const meta = {
  docs: {
    description: 'By design, action maps define functions that have to return the Action type'
  },
};

const isActionMap = (node) => {
  return (node.id.name === 'Actions' || node.id.name === 'ActionsMap' || node.id.name === 'ActionMap')
    && node.right.type === 'ObjectTypeAnnotation';
}

const getPropertiesThatAreFunctions = (node) => {
  return node.right.properties.filter(prop => {
    return prop.type === 'ObjectTypeProperty'
      && prop.value.type === 'FunctionTypeAnnotation';
  })
}

const doesFunctionReturnAction = (node) => {
  return node.value.returnType.type == 'GenericTypeAnnotation'
    && node.value.returnType.id.type === 'Identifier'
    && node.value.returnType.id.name === 'Action';
}

const create = (context) => {
  return {
    TypeAlias: (node) => {
      if (!isActionMap(node)) {
        return;
      }

      getPropertiesThatAreFunctions(node).forEach(functionProp => {
        if (!doesFunctionReturnAction(functionProp)) {
          context.report(functionProp.value.returnType, 'must return Action');
        }
      });
    },
  };
};

module.exports = { create, meta };
