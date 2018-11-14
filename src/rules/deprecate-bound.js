const NAME_REGEX = /^_?bound$/i;

const meta = {
  docs: {
    description: 'using \'this.bound \' as a pattern has been deprecated',
  },
};

const create = context => ({
  ClassProperty: (node) => {
    const propertyName = node.key.name;

    if (NAME_REGEX.test(propertyName)) {
      context.report(node, 'do not use \'this.bound\' to bind methods; use arrow functions instead');
    }
  },
});

module.exports = { create, meta };
