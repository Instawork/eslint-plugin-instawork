// @flow

const DEPRECATED_COMPONENT_REGEX = /^(downlayout|rightlayout|uplayout|leftlayout|label)$/i;

const meta = {
  docs: {
    description: 'must not use deprecated components',
  },
};

const create = context => ({
  JSXOpeningElement: node => {
    const componentName = node.name.name;

    if (DEPRECATED_COMPONENT_REGEX.test(componentName)) {
      context.report(node, `'${componentName}' has been deprecated`);
    }
  },
});

module.exports = { create, meta };
