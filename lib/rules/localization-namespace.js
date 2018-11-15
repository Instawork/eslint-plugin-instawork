'use strict';

var path = require('path');

var meta = {
  docs: {
    description: 'localization namespace must match file location; project name must be set as as the first option for it to work (otherwise it will not do anything)'
  },
  fixable: 'code',
  schema: [{ type: 'string' }]
};

var create = function create(context) {
  var projectName = context.options[0];
  if (!projectName) return {};

  var filename = context.getFilename();
  if (path.basename(filename) !== 'strings.js') return {};

  return {
    CallExpression: function CallExpression(node) {
      var callee = node.callee;

      var args = node.arguments;
      var filenameComponents = filename.match(/src\/(.+?)\/(.+)\/strings.js/);

      // Ensure that the node is a Localization.scopedTranslator call
      if (!callee) return;
      if (!callee.object || callee.object.name !== 'Localization') return;
      if (!callee.property || callee.property.name !== 'scopedTranslator') return;
      if (!args || !args.length) return;
      if (!filenameComponents) return;

      // Figure out what the localization namespace should be
      var category = filenameComponents[1];
      var name = filenameComponents[2].replace(/\//g, ':');
      var expectedNamespace = projectName + ':' + category + ':' + name;

      if (args[0].type === 'Literal' && args[0].value === expectedNamespace) return;

      var fix = function fix(fixer) {
        var callSource = context.getSourceCode().getText(node);
        var fixedCallSource = callSource.replace(/\(.*\)/, '(\'' + expectedNamespace + '\')');
        return fixer.replaceText(node, fixedCallSource);
      };

      context.report({
        node: args[0],
        message: 'Localization namespace should be set to \'' + expectedNamespace + '\'',
        fix: fix
      });
    }
  };
};

module.exports = { create: create, meta: meta };