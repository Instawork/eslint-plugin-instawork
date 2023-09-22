// @flow

const fs = require('fs');
const path = require('path');

const PATH_REGEX = /\/services\/([^/]+?)\/(index).(js|ts)$/i;
const EXPECTED_SUFFIX_REGEX = /.*\.(test|spec)\.(js|jsx|ts|tsx)$/i;

const meta = {
  docs: {
    description: 'services must have accompanying tests',
  },
};

const create = (context) => {
  const filepath = context.getFilename();
  if (!PATH_REGEX.test(filepath)) {
    return {};
  }

  let found = false;

  const dirname = path.dirname(filepath);
  const matchedTestFiles = fs
    .readdirSync(dirname)
    .filter((fpath) => fpath.match(EXPECTED_SUFFIX_REGEX) !== null);
  if (matchedTestFiles.length > 0) {
    found = true;
  }

  if (!found) {
    context.report({
      loc: {
        end: { col: 0, line: 1 },
        start: { col: 0, line: 1 },
      },
      message: `'${filepath}' must have an accompanying test file matching: *.test.(ts|tsx|js|jsx) or *.spec.(ts|tsx|js|jsx)`,
    });
  }

  return {};
};

module.exports = { create, meta };
