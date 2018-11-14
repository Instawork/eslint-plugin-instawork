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

const getProperties = (node) => {
  return node.right.properties;
}

const isPropertyFunction = (node) => {
  return node.type === 'ObjectTypeProperty'
    && node.value.type === 'FunctionTypeAnnotation';
}

const create = (context) => {
  return {
    TypeAlias: (node) => {
      if (!isActionMap(node)) {
        return;
      }

      getProperties(node).forEach(prop => {
        if (!isPropertyFunction(prop)) {
          context.report(prop, 'must be a function');
        }
      });
    },
  };
};

module.exports = { create, meta };
