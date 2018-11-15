'use strict';

var meta = {
  docs: {
    description: 'Must not use deprecated import paths'
  },
  schema: {
    type: 'array',
    items: {
      path: 'RegExp',
      reason: 'string'
    }
  }
};

var create = function create(context) {
  var deprecationOptions = context.options[0];

  return {
    ImportDeclaration: function ImportDeclaration(importDeclaration) {
      var source = importDeclaration.source;


      if (source.type !== 'Literal') return;

      var importPath = source.value;

      deprecationOptions.find(function (deprecationOption) {
        if (importPath.match(deprecationOption.path)) {
          context.report(importDeclaration, 'Importing from \'' + importPath + '\' has been deprecated. ' + deprecationOption.reason);
          return true;
        }

        return false;
      });
    }
  };
};

module.exports = { create: create, meta: meta };