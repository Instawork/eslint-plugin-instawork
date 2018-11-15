'use strict';

var util = require('./util');

var IMPORT_PATH_REGEX = /\/src\/components\/([^/]+?)$/i;

var meta = {
  docs: {
    description: 'imported component must be a default import with the correct name'
  }
};

var create = function create(context) {
  return {
    ImportDeclaration: function ImportDeclaration(node) {
      if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) return;
      var expectedName = util.getExpectedImportName(node);
      if (!util.isDefaultImport(node, expectedName)) {
        var statement = util.getImportStatement(node, context);
        context.report(node, '\'' + statement + '\' must be a default import named ' + expectedName);
      }
    }
  };
};

module.exports = { create: create, meta: meta };