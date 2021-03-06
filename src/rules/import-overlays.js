// @flow

const util = require('./util');

const IMPORT_PATH_REGEX = /\/src\/overlays\/([^/]+?)$/i;
const IMPORT_NAME_SUFFIX = 'Overlay';

const meta = {
  docs: {
    description: 'imported overlay must be a default import with the correct name',
  },
};

const create = (context) => ({
  ImportDeclaration: (node) => {
    if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) {
      return;
    }
    const expectedName = util.getExpectedImportName(node, IMPORT_NAME_SUFFIX);
    if (!util.isDefaultImport(node, expectedName)) {
      const statement = util.getImportStatement(node, context);
      context.report(node, `'${statement}' must be a default import named ${expectedName}`);
    }
  },
});

module.exports = { create, meta };
