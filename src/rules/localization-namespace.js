// @flow

const path = require('path');

const meta = {
  docs: {
    description:
      'localization namespace must match file location; project name must be set as as the first option for it to work (otherwise it will not do anything)',
  },
  fixable: 'code',
  schema: [{ type: 'string' }],
};

const create = context => {
  const [projectName] = context.options;
  if (!projectName) {
    return {};
  }

  const filename = context.getFilename();
  if (path.basename(filename) !== 'strings.js') {
    return {};
  }

  return {
    CallExpression: node => {
      const { callee } = node;
      const args = node.arguments;
      const filenameComponents = filename.match(/src\/(.+?)\/(.+)\/strings.js/);

      // Ensure that the node is a Localization.scopedTranslator call
      if (!callee) {
        return;
      }
      if (!callee.object || callee.object.name !== 'Localization') {
        return;
      }
      if (!callee.property || callee.property.name !== 'scopedTranslator') {
        return;
      }
      if (!args || !args.length) {
        return;
      }
      if (!filenameComponents) {
        return;
      }

      // Figure out what the localization namespace should be
      const [, category] = filenameComponents;
      const name = filenameComponents[2].replace(/\//g, ':');
      const expectedNamespace = `${projectName}:${category}:${name}`;

      if (args[0].type === 'Literal' && args[0].value === expectedNamespace) {
        return;
      }

      const fix = fixer => {
        const callSource = context.getSourceCode().getText(node);
        const fixedCallSource = callSource.replace(/\(.*\)/, `('${expectedNamespace}')`);
        return fixer.replaceText(node, fixedCallSource);
      };

      context.report({
        fix,
        message: `Localization namespace should be set to '${expectedNamespace}'`,
        node: args[0],
      });
    },
  };
};

module.exports = { create, meta };
