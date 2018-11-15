'use strict';

var meta = {
  docs: {
    description: 'prop types must be more specific than Function (e.g. \'() => void\')'
  }
};

var PROP_NAME_REGEX = /Props$/i;
var FUNCTION_TYPE_REGEX = /^Function$/i;

var create = function create(context) {
  return {
    TypeAlias: function TypeAlias(node) {
      var typeName = node.id.name;
      if (!PROP_NAME_REGEX.test(typeName) || !node.right || node.right.type !== 'ObjectTypeAnnotation') return;

      var properties = node.right.properties;


      properties.forEach(function (property) {
        if (property.type !== 'ObjectTypeProperty' || property.value.type !== 'GenericTypeAnnotation' || !FUNCTION_TYPE_REGEX.test(property.value.id.name)) return;

        context.report(property.value.id, 'function prop types must be more specific than \'Function\'');
      });
    }
  };
};

module.exports = { create: create, meta: meta };