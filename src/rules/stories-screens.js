const fs = require('fs');
const path = require('path');

const PATH_REGEX = /\/src\/screens\/([^/]+?)\/presentation.js$/i;
const EXPECTED_FILENAME = 'stories.js';

const meta = {
  docs: {
    description: 'screens must have accompanying stories',
  },
};

const create = (context) => {
  const filepath = context.getFilename();
  if (!PATH_REGEX.test(filepath)) return {};

  const dirname = path.dirname(filepath);
  const storyPath = path.join(dirname, EXPECTED_FILENAME);

  if (!fs.existsSync(storyPath)) {
    context.report({
      message: `'${filepath}' must have an accompanying '${EXPECTED_FILENAME}' file`,
      loc: {
        start: { line: 1, col: 0 },
        end: { line: 1, col: 0 },
      },
    });
  }

  return {};
};

module.exports = { create, meta };
