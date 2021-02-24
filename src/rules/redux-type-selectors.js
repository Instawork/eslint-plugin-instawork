// @flow

const SELECTOR_TYPE_REGEX = /^Selector$/i;

const meta = {
  docs: {
    description:
      'redux selectors must be parameterized and define a return type (e.g. Selector<boolean>)',
  },
};

const create = (context) => ({
  TypeAnnotation: (node) => {
    const typeName = node.typeAnnotation.id ? node.typeAnnotation.id.name : null;
    const hasParams = !!node.typeAnnotation.typeParameters;

    if (!typeName) {
      return;
    }

    if (SELECTOR_TYPE_REGEX.test(typeName) && !hasParams) {
      context.report(
        node.typeAnnotation.id,
        `'${typeName}' must be parameterized and define a return type (e.g. '${typeName}<boolean>')`,
      );
    }
  },
});

module.exports = { create, meta };
