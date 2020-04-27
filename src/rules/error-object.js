// @flow

const util = require('./util');

const description = 'Should only use errors extending IWBaseError class';

const meta = {
  docs: {
    description,
  },
};

const create = context => ({
  ClassDeclaration: node => {
    const className = node.id.name;
    const superclassName = util.getSuperclassName(node);
    if (superclassName && /^Error$/.test(superclassName)) {
      context.report(node, `'${className}' should extend IWBaseError instead of Error`);
    }
    if (superclassName && /^IWBaseError$/.test(superclassName)) {
      const [, prefix, baseName, suffix] = className.match(/^(IW)?(.+?)(Error)?$/);
      if (!prefix || !suffix) {
        context.report(node, `'${className}' should be named 'IW${baseName}Error'`);
      }
    }
  },
  'NewExpression > Identifier': node => {
    if (node.name === 'Error') {
      context.report({
        loc: node.loc,
        message: `Should not directly instanciate object from 'Error' class, instead instanciate object from class extending 'IWBaseError'`,
      });
    }
  },
});

module.exports = { create, meta };
