'use strict';

var util = require('./util');

var IMPORT_PATH_REGEX = /\/src\/modules\/([^/]+?)$/i;
var IMPORT_NAME_SUFFIXES = ['', 'Module'];

var meta = {
  docs: {
    description: 'imported module must be a wildcard import with the correct name'
  }
};

var create = function create(context) {
  return {
    ImportDeclaration: function ImportDeclaration(node) {
      if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) return;
      var expectedNames = util.getExpectedImportName(node, IMPORT_NAME_SUFFIXES);
      if (!util.isWildcardImport(node, expectedNames)) {
        var statement = util.getImportStatement(node, context);
        context.report(node, '\'' + statement + '\' must be a wildcard import named ' + expectedNames.join(' or '));
      }
    }
  };
};

module.exports = { create: create, meta: meta };