'use strict';

var util = require('./util');

var meta = {
  docs: {
    description: 'story names must correspond to the directory in which they are located'
  }
};

var create = function create(context) {
  var filepath = context.getFilename();

  if (!util.isStoryPath(filepath)) {
    return {};
  }

  return {
    CallExpression: function CallExpression(node) {
      if (util.isStoryDeclarationNode(node)) {
        var actualStoryName = util.getStoryNameForStoryDeclarationNode(node);
        var expectedStoryName = util.getExpectedStoryNameForPath(filepath);

        if (actualStoryName !== expectedStoryName) {
          context.report(node, 'story name should be \'' + expectedStoryName + '\'');
        }
      }
    }
  };
};

module.exports = { create: create, meta: meta };