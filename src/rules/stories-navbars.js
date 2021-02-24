// @flow

const fs = require('fs');
const path = require('path');

const PATH_REGEX = /\/src\/navbars\/([^/]+?)\/presentation.js$/i;
const EXPECTED_FILENAME = 'stories.js';

const meta = {
  docs: {
    description: 'navbars must have accompanying stories',
  },
};

const create = (context) => {
  const filepath = context.getFilename();
  if (!PATH_REGEX.test(filepath)) {
    return {};
  }

  const dirname = path.dirname(filepath);
  const storyPath = path.join(dirname, EXPECTED_FILENAME);

  if (!fs.existsSync(storyPath)) {
    context.report({
      loc: {
        end: { col: 0, line: 1 },
        start: { col: 0, line: 1 },
      },
      message: `'${filepath}' must have an accompanying '${EXPECTED_FILENAME}' file`,
    });
  }

  return {};
};

module.exports = { create, meta };
