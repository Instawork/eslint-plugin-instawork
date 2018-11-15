const meta = {
  docs: {
    description: 'By design, selector maps define functions',
  },
};

const isSelectorMap = node => (node.id.name === 'Selectors' || node.id.name === 'SelectorsMap' || node.id.name === 'SelectorMap')
    && node.right.type === 'ObjectTypeAnnotation';

const getProperties = node => node.right.properties;

const isPropertyFunction = node => node.type === 'ObjectTypeProperty'
    && node.value.type === 'FunctionTypeAnnotation';

const create = context => ({
  TypeAlias: (node) => {
    if (!isSelectorMap(node)) {
      return;
    }

    getProperties(node).forEach((prop) => {
      if (!isPropertyFunction(prop)) {
        context.report(prop, 'must be a function');
      }
    });
  },
});

module.exports = { create, meta };
