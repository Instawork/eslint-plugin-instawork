'use strict';

var meta = {
  docs: {
    description: 'all files under src/ or test/ must have flow enabled'
  },
  fixable: 'code'
};

var create = function create(context) {
  var filepath = context.getFilename();
  if (!filepath.match(/(src|test)\//)) return {};

  return {
    Program: function Program(node) {
      var source = context.getSourceCode().getText();

      // Ensure that a '// @flow' exists
      if (source.match(/\/\/ @flow\n/)) return;

      var addFlowAnnotation = function addFlowAnnotation(fixer) {
        return fixer.replaceText(node, '// @flow\n\n' + source);
      };

      context.report({
        node: node,
        message: 'File must start with a \'// @flow\' annotation',
        fix: addFlowAnnotation
      });
    }
  };
};

module.exports = { create: create, meta: meta };