// @flow

const NAME_REGEX = /^Component$/i;

const meta = {
  docs: {
    description: 'components should be pure for better overall performance',
  },
};

const getSuperclassName = classExpressionNode => {
  const { superClass } = classExpressionNode;
  if (!superClass) {
    return null;
  }

  if (superClass.type === 'MemberExpression') {
    return superClass.property.name;
  }
  if (superClass.type === 'Identifier') {
    return superClass.name;
  }

  throw new Error(`Unexpected superClass type: ${superClass.type}`);
};

const create = context => ({
  ClassDeclaration: node => {
    const superclassName = getSuperclassName(node);

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
