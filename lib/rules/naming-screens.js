'use strict';

var util = require('./util');

var PATH_REGEX = /\/src\/screens\/([^/]+?)\/presentation.js$/i;
var SUFFIX = 'Screen';

var meta = {
  docs: {
    description: 'screen class names must correspond with their directory'
  }
};

var create = function create(context) {
  var matches = context.getFilename().match(PATH_REGEX);
  if (!matches) return {};

  var expectedClassName = util.getExpectedClassName(matches[1], SUFFIX);

  return {
    ClassDeclaration: function ClassDeclaration(node) {
      var className = node.id.name;
      if (className !== expectedClassName) {
        context.report(node.id, '\'' + className + '\' must be named ' + expectedClassName);
      }
    }
  };
};

module.exports = { create: create, meta: meta };