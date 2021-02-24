// @flow

const util = require('./util');

const IMPORT_PATH_REGEX = /\/src\/modules\/([^/]+?)$/i;
const IMPORT_NAME_SUFFIXES = ['', 'Module'];

const meta = {
  docs: {
    description: 'imported module must be a wildcard import with the correct name',
  },
};

const create = (context) => ({
  ImportDeclaration: (node) => {
    if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) {
      return;
    }
    const expectedNames = util.getExpectedImportName(node, IMPORT_NAME_SUFFIXES);
    if (!util.isWildcardImport(node, expectedNames)) {
      const statement = util.getImportStatement(node, context);
      context.report(
        node,
        `'${statement}' must be a wildcard import named ${expectedNames.join(' or ')}`,
      );
    }
  },
});

module.exports = { create, meta };
