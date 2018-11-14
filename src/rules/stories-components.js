const fs = require('fs');
const path = require('path');

const PATH_REGEX = /\/src\/components\/([^/]+?)\/(presentation|index).js$/i;
const EXPECTED_FILENAMES = ['stories.js', 'stories/index.js'];

const meta = {
  docs: {
    description: 'components must have accompanying stories',
  },
};

const create = (context) => {
  const filepath = context.getFilename();
  if (!PATH_REGEX.test(filepath)) return {};

  let found = false;

  const dirname = path.dirname(filepath);
  EXPECTED_FILENAMES.forEach(filename => {
    const storyPath = path.join(dirname, filename);
    if (fs.existsSync(storyPath)) {
      found = true;
    }
  });

  if (!found) {
    context.report({
      message: `'${filepath}' must have an accompanying '${EXPECTED_FILENAMES.join(' or ')}' file`,
      loc: {
        start: { line: 1, col: 0 },
        end: { line: 1, col: 0 },
      },
    });
  }

  return {};
};

module.exports = { create, meta };
