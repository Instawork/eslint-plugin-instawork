'use strict';

var fs = require('fs');
var path = require('path');

var PATH_REGEX = /\/src\/components\/([^/]+?)\/(presentation|index).js$/i;
var EXPECTED_FILENAMES = ['stories.js', 'stories/index.js'];

var meta = {
  docs: {
    description: 'components must have accompanying stories'
  }
};

var create = function create(context) {
  var filepath = context.getFilename();
  if (!PATH_REGEX.test(filepath)) return {};

  var found = false;

  var dirname = path.dirname(filepath);
  EXPECTED_FILENAMES.forEach(function (filename) {
    var storyPath = path.join(dirname, filename);
    if (fs.existsSync(storyPath)) {
      found = true;
    }
  });

  if (!found) {
    context.report({
      message: '\'' + filepath + '\' must have an accompanying \'' + EXPECTED_FILENAMES.join(' or ') + '\' file',
      loc: {
        start: { line: 1, col: 0 },
        end: { line: 1, col: 0 }
      }
    });
  }

  return {};
};

module.exports = { create: create, meta: meta };