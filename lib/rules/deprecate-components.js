'use strict';

var DEPRECATED_COMPONENT_REGEX = /^(downlayout|rightlayout|uplayout|leftlayout|label)$/i;

var meta = {
  docs: {
    description: 'must not use deprecated components'
  }
};

var create = function create(context) {
  return {
    JSXOpeningElement: function JSXOpeningElement(node) {
      var componentName = node.name.name;

      if (DEPRECATED_COMPONENT_REGEX.test(componentName)) {
        context.report(node, '\'' + componentName + '\' has been deprecated');
      }
    }
  };
};

module.exports = { create: create, meta: meta };