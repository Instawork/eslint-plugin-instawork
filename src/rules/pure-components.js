// @flow

const util = require('./util');

const NAME_REGEX = /^Component$/i;

const meta = {
  docs: {
    description: 'components should be pure for better overall performance',
  },
};

const create = context => ({
  ClassDeclaration: node => {
    const superclassName = util.getSuperclassName(node);

    if (superclassName && NAME_REGEX.test(superclassName)) {
      const className = node.id.name;
      context.report(
        node.superClass,
        `'${className}' should extend PureComponent instead of Component`,
      );
    }
  },
});

module.exports = { create, meta };
