'use strict';

var NAME_REGEX = /^_?bound$/i;

var meta = {
  docs: {
    description: 'using \'this.bound \' as a pattern has been deprecated'
  }
};

var create = function create(context) {
  return {
    ClassProperty: function ClassProperty(node) {
      var propertyName = node.key.name;

      if (NAME_REGEX.test(propertyName)) {
        context.report(node, 'do not use \'this.bound\' to bind methods; use arrow functions instead');
      }
    }
  };
};

module.exports = { create: create, meta: meta };