const util = require('./util');

const IMPORT_PATH_REGEX = /\/src\/components\/([^/]+?)$/i;

const meta = {
  docs: {
    description: 'imported component must be a default import with the correct name',
  },
};

const create = context => ({
  ImportDeclaration: (node) => {
    if (!util.isImportingPath(node, IMPORT_PATH_REGEX)) return;
    const expectedName = util.getExpectedImportName(node);
    if (!util.isDefaultImport(node, expectedName)) {
      const statement = util.getImportStatement(node, context);
      context.report(node, `'${statement}' must be a default import named ${expectedName}`);
    }
  },
});

module.exports = { create, meta };
