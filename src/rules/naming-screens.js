const util = require('./util');

const PATH_REGEX = /\/src\/screens\/([^/]+?)\/presentation.js$/i;
const SUFFIX = 'Screen';

const meta = {
  docs: {
    description: 'screen class names must correspond with their directory',
  },
};

const create = (context) => {
  const matches = context.getFilename().match(PATH_REGEX);
  if (!matches) return {};

  const expectedClassName = util.getExpectedClassName(matches[1], SUFFIX);

  return {
    ClassDeclaration: (node) => {
      const className = node.id.name;
      if (className !== expectedClassName) {
        context.report(node.id, `'${className}' must be named ${expectedClassName}`);
      }
    },
  };
};

module.exports = { create, meta };
