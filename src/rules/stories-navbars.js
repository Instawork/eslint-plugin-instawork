// @flow

const fs = require('fs');
const path = require('path');

const PATH_REGEX = /\/src\/navbars\/([^/]+?)\/presentation.(js|ts)$/i;
const EXPECTED_FILENAMES = ['stories.js', 'stories.ts'];

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

  let found = false;

  const dirname = path.dirname(filepath);
  EXPECTED_FILENAMES.forEach((filename) => {
    const storyPath = path.join(dirname, filename);
    if (fs.existsSync(storyPath)) {
      found = true;
    }
  });

  if (!found) {
    context.report({
      loc: {
        end: { col: 0, line: 1 },
        start: { col: 0, line: 1 },
      },
      message: `'${filepath}' must have an accompanying '${EXPECTED_FILENAMES.join(' or ')}' file`,
    });
  }

  return {};
};

module.exports = { create, meta };
