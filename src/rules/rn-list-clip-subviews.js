// @flow

const ruleAttributeName = 'removeClippedSubviews';

const meta = {
  docs: {
    description: `Enforce '${ruleAttributeName}' parameter on React Native lists`,
  },
  fixable: true,
};

const message = `'${ruleAttributeName}' should be 'false' to prevent a buggy behavior (https://facebook.github.io/react-native/docs/flatlist#removeclippedsubviews)`;
const expectedValue = false;

const isList = node => {
  return node.name === 'FlatList' || node.name === 'SectionList';
};

const getAttributes = node => {
  return node.parent.attributes.filter(attr => attr.type === 'JSXAttribute');
};

const findPreviousAttribute = attributes => {
  const attributeNames = [
    ...attributes.map(attr => attr.name.name.toLowerCase()),
    ruleAttributeName.toLowerCase(),
  ].sort();
  const index = attributeNames.indexOf(ruleAttributeName.toLowerCase());
  return attributes[index - 1];
};

const create = context => {
  return {
    JSXIdentifier: function JSXIdentifier(node) {
      if (!isList(node)) {
        return null;
      }

      let hasAttribute = false;

      getAttributes(node).forEach(attr => {
        if (attr.name.name !== ruleAttributeName) {
          return null;
        }
        hasAttribute = true;
        if (attr.value === null || (attr.value && attr.value.expression.value !== expectedValue)) {
          return context.report({
            fix: fixer => {
              return fixer.replaceText(attr, `${ruleAttributeName}={${String(expectedValue)}}`);
            },
            loc: attr,
            message,
            node: attr,
          });
        }
        return null;
      });

      if (!hasAttribute) {
        return context.report({
          fix: fixer => {
            const attr = findPreviousAttribute(getAttributes(node));
            return fixer.insertTextAfter(attr, `${ruleAttributeName}={${String(expectedValue)}}`);
          },
          loc: node,
          message,
          node,
        });
      }
    },
  };
};

module.exports = { create, meta };
