const COMPONENT_SUPERCLASS_REGEX = /^(Pure)?Component$/i;
const DEPRECATED_CLASS_NAME_REGEX = /(Managed)|(Stateless)/i;
const DEPRECATED_TYPE_NAME_REGEX = /(ManagedProp)|(StatelessProp)/i;
const ERROR_MESSAGE = 'The \'managed + stateless\' component pattern has been superseded by the \'presentation + hoc\' pattern';

const meta = {
  docs: {
    description: 'the managed/stateless component pattern has been superseded by presentation + hoc',
  },
};

const getSuperclassName = (classDeclarationNode) => {
  const { superClass } = classDeclarationNode;
  if (!superClass) return null;

  if (superClass.type === 'MemberExpression') {
    return superClass.property.name;
  } else if (superClass.type === 'Identifier') {
    return superClass.name;
  }

  throw new Error(`Unexpected superClass type: ${superClass.type}`);
};

const isComponentClass = (classDeclarationNode) => {
  const superclassName = getSuperclassName(classDeclarationNode);
  return COMPONENT_SUPERCLASS_REGEX.test(superclassName);
};

const create = context => ({
  ClassDeclaration: (node) => {
    const className = node.id.name;
    if (!isComponentClass(node)) return;

    if (DEPRECATED_CLASS_NAME_REGEX.test(className)) {
      context.report(node.id, ERROR_MESSAGE);
    }
  },
  TypeAlias: (node) => {
    const typeName = node.id.name;

    if (DEPRECATED_TYPE_NAME_REGEX.test(typeName)) {
      context.report(node.id, ERROR_MESSAGE);
    }
  },
});

module.exports = { create, meta };
