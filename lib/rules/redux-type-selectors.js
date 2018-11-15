'use strict';

var SELECTOR_TYPE_REGEX = /^Selector$/i;

var meta = {
  docs: {
    description: 'redux selectors must be parameterized and define a return type (e.g. Selector<boolean>)'
  }
};

var create = function create(context) {
  return {
    TypeAnnotation: function TypeAnnotation(node) {
      var typeName = node.typeAnnotation.id ? node.typeAnnotation.id.name : null;
      var hasParams = !!node.typeAnnotation.typeParameters;

      if (!typeName) return;

      if (SELECTOR_TYPE_REGEX.test(typeName) && !hasParams) {
        context.report(node.typeAnnotation.id, '\'' + typeName + '\' must be parameterized and define a return type (e.g. \'' + typeName + '<boolean>\')');
      }
    }
  };
};

module.exports = { create: create, meta: meta };