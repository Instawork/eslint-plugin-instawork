const meta = {
  docs: {
    description: 'prop types must be more specific than Function (e.g. \'() => void\')',
  },
};

const PROP_NAME_REGEX = /Props$/i;
const FUNCTION_TYPE_REGEX = /^Function$/i;

const create = context => ({
  TypeAlias: (node) => {
    const typeName = node.id.name;
    if (!PROP_NAME_REGEX.test(typeName)
      || !node.right
      || node.right.type !== 'ObjectTypeAnnotation'
    ) return;

    const { properties } = node.right;

    properties.forEach((property) => {
      if (property.type !== 'ObjectTypeProperty'
        || property.value.type !== 'GenericTypeAnnotation'
        || !FUNCTION_TYPE_REGEX.test(property.value.id.name)
      ) return;

      context.report(property.value.id, 'function prop types must be more specific than \'Function\'');
    });
  },
});

module.exports = { create, meta };
