// @flow

const util = require('./util');

const IMPORT_PATH_REGEX = /\/src\/screens\/([^/]+?)$/i;
const IMPORT_NAME_SUFFIX = '';

const meta = {
  docs: {
    description: 'imported screen must be a wildcard import with the correct name',
  },
};

const create = (context) => ({
  ImportDeclaration: (node) => {
    if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) {
      return;
    }
    const expectedName = util.getExpectedImportName(node, IMPORT_NAME_SUFFIX);
    if (!util.isWildcardImport(node, expectedName)) {
      const statement = util.getImportStatement(node, context);
      context.report(node, `'${statement}' must be a wildcard import named ${expectedName}`);
    }
  },
});

module.exports = { create, meta };
