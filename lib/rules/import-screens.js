'use strict';

var util = require('./util');

var IMPORT_PATH_REGEX = /\/src\/screens\/([^/]+?)$/i;
var IMPORT_NAME_SUFFIX = '';

var meta = {
  docs: {
    description: 'imported screen must be a wildcard import with the correct name'
  }
};

var create = function create(context) {
  return {
    ImportDeclaration: function ImportDeclaration(node) {
      if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) return;
      var expectedName = util.getExpectedImportName(node, IMPORT_NAME_SUFFIX);
      if (!util.isWildcardImport(node, expectedName)) {
        var statement = util.getImportStatement(node, context);
        context.report(node, '\'' + statement + '\' must be a wildcard import named ' + expectedName);
      }
    }
  };
};

module.exports = { create: create, meta: meta };