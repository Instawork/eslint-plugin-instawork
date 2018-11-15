'use strict';

var meta = {
  docs: {
    description: 'By design, selector maps define functions'
  }
};

var isSelectorMap = function isSelectorMap(node) {
  return (node.id.name === 'Selectors' || node.id.name === 'SelectorsMap' || node.id.name === 'SelectorMap') && node.right.type === 'ObjectTypeAnnotation';
};

var getProperties = function getProperties(node) {
  return node.right.properties;
};

var isPropertyFunction = function isPropertyFunction(node) {
  return node.type === 'ObjectTypeProperty' && node.value.type === 'FunctionTypeAnnotation';
};

var create = function create(context) {
  return {
    TypeAlias: function TypeAlias(node) {
      if (!isSelectorMap(node)) {
        return;
      }

      getProperties(node).forEach(function (prop) {
        if (!isPropertyFunction(prop)) {
          context.report(prop, 'must be a function');
        }
      });
    }
  };
};

module.exports = { create: create, meta: meta };