// @flow

const meta = {
  docs: {
    description: 'all files under src/ or test/ must have flow enabled',
  },
  fixable: 'code',
};

const create = context => {
  const filepath = context.getFilename();
  if (!filepath.match(/(src|test)\//)) {
    return {};
  }

  return {
    Program: node => {
      const source = context.getSourceCode().getText();

      // Ensure that a '// @flow' exists
      if (source.match(/\/\/ @flow\n/)) {
        return;
      }

      const addFlowAnnotation = fixer => fixer.replaceText(node, `// @flow\n\n${source}`);

      context.report({
        fix: addFlowAnnotation,
        message: "File must start with a '// @flow' annotation",
        node,
      });
    },
  };
};

module.exports = { create, meta };
