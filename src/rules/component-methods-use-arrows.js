// @flow

const COMPONENT_CLASSNAME_REGEX = /^(Pure)?Component$/;

// Sync against https://facebook.github.io/react/docs/react-component.html
const REACT_LIFECYCLE_METHOD_NAME_REGEX = /^(constructor|render|componentDidMount|componentWillReceiveProps|shouldComponentUpdate|componentWillUpdate|render|componentDidUpdate|componentWillUnmount|setNativeProps)$/;

const meta = {
  docs: {
    description: 'component methods that are not React lifecycle methods must be arrow functions',
  },
  fixable: 'code',
};

const isComponentClassDeclaration = (node) => {
  if (node.type !== 'ClassDeclaration') {
    return false;
  }

  const { superClass } = node;
  if (!superClass) {
    return false;
  }

  return (
    (superClass.name && !!superClass.name.match(COMPONENT_CLASSNAME_REGEX)) ||
    (superClass.property && !!superClass.property.name.match(COMPONENT_CLASSNAME_REGEX))
  );
};

const create = (context) => ({
  MethodDefinition: (node) => {
    if (!isComponentClassDeclaration(node.parent.parent)) {
      return;
    }
    if (node.key.name.match(REACT_LIFECYCLE_METHOD_NAME_REGEX)) {
      return;
    }
    if (node.kind !== 'method') {
      return;
    }
    if (node.static) {
      return;
    }

    // A crude way to convert regular functions into arrow functions, using regex. Only works for
    // functions where the signature is defined within a single line.
    const fix = (fixer) => {
      const methodSource = context.getSourceCode().getText(node);
      const fixedMethodSource = methodSource.replace(
        /^(.+?)\s*\((.*?)\)\s*(:.+?)?\s*?{/,
        '$1 = ($2)$3 => {',
      );
      return fixer.replaceText(node, fixedMethodSource);
    };

    context.report({
      fix,
      message: `${node.key.name} must be an arrow function`,
      node,
    });
  },
});

module.exports = { create, meta };
