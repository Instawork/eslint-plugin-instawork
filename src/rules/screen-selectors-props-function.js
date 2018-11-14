const fs = require('fs');
const path = require('path');

const meta = {
  docs: {
    description: 'By design, selector maps define functions'
  },
};

const isSelectorMap = (node) => {
  return (node.id.name === 'Selectors' || node.id.name === 'SelectorsMap' || node.id.name === 'SelectorMap')
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
      if (!isSelectorMap(node)) {
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
